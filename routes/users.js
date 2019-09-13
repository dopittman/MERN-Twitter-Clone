const express = require('express')
const router = express.Router();

router.get('/test', (req, res)=>{
  res.json({msg: 'This is the users route'});
});

router.get('/test2', (req, res)=>{
  res.send('This is route two')
})

module.exports = router;