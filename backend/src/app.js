import express from "express";
import path  from "path";
import cors from 'cors';
import data from './itemdata.js';
let dataItem=[...data]
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.get('/itemlist',async(req,res)=>{
    try{
res.status(200).json({data:dataItem});
    }catch(err){
        console.log(err);
        res.status(500).json({err:err.message});
    }
});
//add new item in list api:
app.post('/additem',async(req,res)=>{
    try{
        let {newItem}=req.body;
        // console.log(req.body);
        // console.log(newItem)
        dataItem=[...dataItem,newItem];
        res.status(201).json({'msg':'data added successfully.'});
    }catch(err){
        console.log(err);
        res.status(500).json({'error':'something went wrong.'})
    }
})

app.patch('/changecheck/:id',async(req,res)=>{
    try{
      let id=parseInt(req.params.id);
      dataItem=dataItem.map((x)=>(x.id===id?{...x,checked:!x.checked}:x));
      console.log(dataItem)
res.status(200).json({'msg':'data updated successfully.'});
    }catch(err){
        res.status(500).json({'msg':'something went wrong'})
        console.log(err);
    }
})

//delete item:
app.delete('/delete/:id',async(req,res)=>{
    try{
        let id=parseInt(req.params.id);
        dataItem=dataItem.filter((x)=>(x.id!==id));
        res.status(204).json({'msg':'item deleted successfully.'})
    }catch(err){
        console.log(err);
        res.status(400).json({'msg':'bad request.'});
    }
})
//error handler middleware:
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({err:err.message});
})
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('runnign on port 3000.');
    }
})