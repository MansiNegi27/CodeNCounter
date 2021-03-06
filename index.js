const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
  res.render('/client/index');
});
router.post('/',(req,res)=>{
  text = req.headers.data;
  const spawn = require("child_process").spawn;
  const process = spawn('python',["./mood_predictor.py",text] );
  process.stdout.on('data', function(data) {
    const mood = data.toString();
     res.json({"data" : mood});
  });
});

module.exports=router;
