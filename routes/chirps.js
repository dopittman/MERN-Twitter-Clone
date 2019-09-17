const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Chirp = require('../models/Chirps');
const validateChirpInput = require('../validation/chirps');


router.get('/', (req, res) =>{
  Chirp.find()
  .sort({date: -1})
  .then(chirps => {
   res.json(chirps)})
  .catch(err => res.status(404).json({msg: 'No chirps found :('}));
});

router.get('/users/:user_id', (req, res)=>{
  Chirp.find({user: req.params.user_id})
  .then(chirps => res.json(chirps))
  .catch(err => res.status(404).json({msg: 'No chirps found from that user'}))
});

//Find Individual Chirp
router.get('/:id', (req, res)=>{
  Chirp.findById(req.params.id)
  .then(chirp => res.json(chirp))
  .catch(err => res.status(404).json({msg: 'No chirps found by that ID'}))
});

//Create Route
router.post('/',
    (req, res) => {
      console.log(req);
      const { errors, isValid } = validateChirpInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newChirp = new Chirp({
        text: req.body.text,
        user: req.user.id
      });

      newChirp.save().then(chirp => res.json(chirp));
    }
  );

module.exports = router;