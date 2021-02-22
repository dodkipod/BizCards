const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, validateCards } = require('../models/user');
const { Card } = require('../models/card');
const auth = require('../middleware/auth');
const { Mongoose } = require('mongoose');
const router = express.Router();

const getCards = async (cardsArray) => {
  const cards = await Card.find({ "bizNumber": { $in: cardsArray } });
  return cards;
};

router.delete('/favorites',auth,async (req,res)=>{
  const user = await User.findOne({ _id: req.user._id });
  const card_id = req.body.cardID;
  const arr = user.favorites;
  user.favorites = user.favorites.filter((card)=>card!=card_id);
  await user.save();
  res.send("Card removed from favorites");
})

router.get('/favorites',auth, async(req,res)=>{
  
  const user = await User
  .findOne({_id:req.user._id})
  .populate('favorites')
  
  res.send(user.favorites);
})

router.patch('/favorites', auth, async (req,res)=>{
  
  const card_id = req.body.cardID;
  const card = await Card.findById(card_id);

  const user = await User.findOne({ _id: req.user._id });

  user.favorites.push(card); 
  await user.save();
  res.send('Card added to your favorites');

})

router.get('/cards', auth, async (req, res) => {

  if (!req.query.numbers) res.status(400).send('Missing numbers data');

  let data = {};
  data.cards = req.query.numbers.split(",");

  const cards = await getCards(data.cards);
  res.send(cards);

});

router.patch('/cards', auth, async (req, res) => {

  const { error } = validateCards(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length) res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);

});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'biz', 'cards']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router; 