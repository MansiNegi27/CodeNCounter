const express=require('express');
const router=express.Router();

// function call(req, res,text) {
//     const spawn = require("child_process").spawn;
//     const process = spawn('python',["./mood_predictor.py",text] );
//     process.stdout.on('data', function(data) {
//         res.send(data.toString());
//     } )
// }
router.get('/',(req,res)=>{
  res.render('/client/index');
});
router.post('/',(req,res)=>{
  text = req.body.textbox;
  const spawn = require("child_process").spawn;
  const process = spawn('python',["./mood_predictor.py",text] );
  process.stdout.on('data', function(data) {
      mood = data.toString();
  });
  res.render('/client/mood',{user:mood});
});
module.exports=router;
