const express=require('express');
const app=express();
const path=require('path');

app.use(express.static(path.join(__dirname,'client')));

const client =require('./index.js');
app.use('/',client);


app.listen(4600,()=>{
  console.log(`listening on port 4600`);
});
