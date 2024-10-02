import express from "express";
import path  from "path";
import cors from 'cors';
import data from './itemdata.js';
const app=express();
let itemData=data;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));
app.get('/itemlist',async(req,res)=>{
    try{
res.status(200).json({data:itemData});
    }catch(err){
        console.log(err);
        res.status(500).json({err:err.message});
    }
});
//add new item in list api:
app.post('/additem',async(req,res)=>{
    try{
        let {newItem}=req.body;
        itemData=[...itemData,newItem];
        res.status(201).json({'msg':'added successfully.'});
    }catch(err){
        console.log(err);
        res.status(500).json({'error':'something went wrong.'})
    }
})
//error handler middlware:
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({err:err.message});
})
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('runnign on port 3000.')
    }
})