const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
const PORT=process.env.PORT||3000;
const DATA=path.join(__dirname,'data','news.json');
app.use(express.json({limit:'2mb'}));
app.use(express.static(path.join(__dirname,'public')));
function read(){return JSON.parse(fs.readFileSync(DATA,'utf8'))}
function write(d){fs.writeFileSync(DATA,JSON.stringify(d,null,2),'utf8')}
app.get('/api/news',(req,res)=>res.json(read().sort((a,b)=>new Date(b.created_at||0)-new Date(a.created_at||0))));
app.post('/api/news',(req,res)=>{const d=read();const n={id:Date.now(),status:'Published',created_at:new Date().toISOString(),...req.body};d.unshift(n);write(d);res.status(201).json(n)});
app.put('/api/news/:id',(req,res)=>{const d=read();const i=d.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({error:'Not found'});d[i]={...d[i],...req.body,id:d[i].id};write(d);res.json(d[i])});
app.delete('/api/news/:id',(req,res)=>{const d=read().filter(x=>String(x.id)!==String(req.params.id));write(d);res.json({ok:true})});
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,()=>console.log(`VYRO NEWS running on ${PORT}`));
