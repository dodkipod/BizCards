const express = require('express');
const _ = require('lodash');
const { User} = require('../models/user');
const { Card, validateCard, generateBizNumber } = require('../models/card');
const auth = require('../middleware/auth');
const router = express.Router();



router.get("/",async (req,res)=>{

  const cards = await Card.find({})
  res.send(cards)
  res.end();
})

router.get('/my-cards',auth,async (req,res)=>{

  if(!req.user.biz)return res.status(401).send("Access denied");
  const cards = await Card.find({user_id:req.user._id});
  res.send(cards);
  res.end();
});

router.delete('/:id', auth, async (req, res) => {

  const card = await Card.findOneAndRemove({ _id: req.params.id, user_id: req.user._id });
  if (!card) return res.status(404).send('The card with the given ID was not found.');
  const user = await User.findOne({ _id: req.user._id });
  user.cards = user.cards.filter((card)=>card!=req.params.id);
  await user.save();
  res.send(card);
  res.end();
});

router.put('/:id', auth, async (req, res) => {

  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, req.body);
  if (!card) return res.status(404).send('The card with the given ID was not found.');

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
  res.end();
});

router.get('/:id', auth, async (req, res) => {

  const card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  if (!card) return res.status(404).send('The card with the given ID was not found.');

  res.send(card);
  res.end();
});

router.post('/', auth, async (req, res) => {

  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card(
    {
      bizName: req.body.bizName,
      bizDescription: req.body.bizDescription,
      bizAddress: req.body.bizAddress,
      bizPhone: req.body.bizPhone,
      bizImage: req.body.bizImage ? req.body.bizImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      bizNumber: await generateBizNumber(Card),
      user_id: req.user._id
    }
  );

  let post = await card.save();
  const user = await User.findOne({ _id: req.user._id });
  user.cards.push(post._id);
  await user.save()
  res.send(post);
    res.end();
});

module.exports = router; 