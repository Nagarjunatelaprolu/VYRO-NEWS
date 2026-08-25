const express=require("express");
const cors=require("cors");
const path=require("path");
const fs=require("fs");
const multer=require("multer");
const Database=require("better-sqlite3");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const app=express();
const PORT=process.env.PORT||4000;
const JWT_SECRET=process.env.JWT_SECRET||"CHANGE_THIS_IN_PRODUCTION";

const db=new Database(path.join(__dirname,"vyro-news.db"));
db.pragma("journal_mode = WAL");
db.exec(`
CREATE TABLE IF NOT EXISTS admins(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 email TEXT UNIQUE NOT NULL,
 password_hash TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS news(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 category TEXT NOT NULL,
 content TEXT NOT NULL,
 image_url TEXT,
 breaking INTEGER NOT NULL DEFAULT 0,
 featured INTEGER NOT NULL DEFAULT 0,
 status TEXT NOT NULL DEFAULT 'Draft',
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);`);

const adminEmail=process.env.ADMIN_EMAIL||"admin@vyro.news";
const adminPassword=process.env.ADMIN_PASSWORD||"vyro123";
if(!db.prepare("SELECT id FROM admins WHERE email=?").get(adminEmail)){
 const hash=bcrypt.hashSync(adminPassword,10);
 db.prepare("INSERT INTO admins(email,password_hash,created_at) VALUES(?,?,?)").run(adminEmail,hash,new Date().toISOString());
}

app.use(cors());
app.use(express.json({limit:"3mb"}));

const uploadDir=path.join(__dirname,"uploads");
fs.mkdirSync(uploadDir,{recursive:true});
app.use("/uploads",express.static(uploadDir));
app.use(express.static(path.join(__dirname,"../public")));

const upload=multer({dest:uploadDir});

function auth(req,res,next){
 const h=req.headers.authorization||"";
 const token=h.startsWith("Bearer ")?h.slice(7):null;
 if(!token)return res.status(401).json({error:"Login required"});
 try{req.user=jwt.verify(token,JWT_SECRET);next();}
 catch{return res.status(401).json({error:"Invalid or expired token"});}
}

app.get("/",(_,res)=>res.sendFile(path.join(__dirname,"../public/index.html")));

app.post("/api/auth/login",(req,res)=>{
 const {email,password}=req.body||{};
 const admin=db.prepare("SELECT * FROM admins WHERE email=?").get(email);
 if(!admin||!bcrypt.compareSync(password||"",admin.password_hash))return res.status(401).json({error:"Invalid credentials"});
 const token=jwt.sign({id:admin.id,email:admin.email},JWT_SECRET,{expiresIn:"8h"});
 res.json({token,admin:{id:admin.id,email:admin.email}});
});

app.get("/api/news",(req,res)=>{
 let sql="SELECT * FROM news WHERE status='Published'";
 const params=[];
 if(req.query.category){sql+=" AND category=?";params.push(req.query.category)}
 if(req.query.breaking==="true")sql+=" AND breaking=1";
 sql+=" ORDER BY created_at DESC";
 res.json(db.prepare(sql).all(...params));
});

app.get("/api/admin/news",auth,(req,res)=>res.json(db.prepare("SELECT * FROM news ORDER BY created_at DESC").all()));

app.post("/api/upload",auth,upload.single("image"),(req,res)=>{
 if(!req.file)return res.status(400).json({error:"Image required"});
 res.json({url:`/uploads/${req.file.filename}`});
});

app.post("/api/news",auth,(req,res)=>{
 const n=req.body||{};
 if(!n.title||!n.category||!n.content)return res.status(400).json({error:"Title, category and content are required"});
 const now=new Date().toISOString();
 const r=db.prepare(`INSERT INTO news(title,category,content,image_url,breaking,featured,status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?)`)
 .run(n.title,n.category,n.content,n.image_url||"",n.breaking?1:0,n.featured?1:0,n.status==="Published"?"Published":"Draft",now,now);
 res.status(201).json(db.prepare("SELECT * FROM news WHERE id=?").get(r.lastInsertRowid));
});

app.put("/api/news/:id",auth,(req,res)=>{
 const n=req.body||{},now=new Date().toISOString();
 db.prepare(`UPDATE news SET title=?,category=?,content=?,image_url=?,breaking=?,featured=?,status=?,updated_at=? WHERE id=?`)
 .run(n.title,n.category,n.content,n.image_url||"",n.breaking?1:0,n.featured?1:0,n.status==="Published"?"Published":"Draft",now,req.params.id);
 res.json(db.prepare("SELECT * FROM news WHERE id=?").get(req.params.id));
});

app.delete("/api/news/:id",auth,(req,res)=>{
 db.prepare("DELETE FROM news WHERE id=?").run(req.params.id);
 res.json({ok:true});
});

app.get("/api/health",(_,res)=>res.json({ok:true,service:"VYRO NEWS API"}));

app.listen(PORT,()=>console.log(`VYRO NEWS: http://localhost:${PORT}`));
