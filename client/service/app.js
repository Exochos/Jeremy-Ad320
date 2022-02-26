import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser';
import { Users } from './models/Users.js';
import { Deck } from './models/Deck.js';
import 'dotenv/config'

const app = express()
const port = 8000
// Connect to MongoDB
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bgjij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
try {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000})
  console.log("Connected to the database!");
} catch (err) {
  console.log("Cannot connect to the database!", err);
  process.exit();
}
/* // Middleware
const exampleMiddleware = (req, res, next) => {
  console.log('example middleware')
  next()
} */

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// --------------------------------------------------------------------------------
// ---------------- ROUTES --------------------------------------------------------
// --------------------------------------------------------------------------------

// ----------------------------------------
// ------------- USER ROUTES --------------
// ----------------------------------------

// ---------------- Get all users ----------------
app.get('/users', async (req, res) => { 
  const users = await Users.find();
  res.json(users);
});

// ---------------- Create a user ----------------
app.post('/createuser', async (req, res) => {
  const userData = new Users(req.body);
  if (userData.id === undefined) {
      userData.id = mongoose.Types.ObjectId();
  }   
  try {
      const user = await Users.create(userData);
      res.status(200);
      res.json(user);
  } 
  catch (error) {
      res.status(400);
      res.send(error);
  }   
});

// ---------------- Get A user ----------------
app.get('/get_user/:id', async (req, res) => {
  if (req.params.id === undefined) {
      res.sendStatus(400);
  } else {
      const id = req.params.id;
      const user = await Users.findById(id);
      if (user === null) {
          res.sendStatus(404);
      } else {
          res.status(200);
          res.json(user);
      }
  }
});

// ---------------- Update a user ----------------
app.post('/update_user/:id', async (req, res) => {
  if (req.params.id === undefined) {
      res.status(400);
      res.send('No id provided');
  }
  else {
    const user = await Users.findById(req.params.id);
    if (user === null) {
        res.status(404);
        res.send('User not found');
    } 
    else {
      for (const key in req.body) {
          user[key] = req.body[key];
      }
      try {
        await user.save();
        res.status(200);
        res.json(user);
      }
      catch (error) {
        res.status(400);
        res.send(error);
      }
  }
}
});

// ---------------- Delete a user ----------------
app.get('/delete_user/:id', async (req, res) => {
  const id = req.params.id;
  if (id === undefined) {
      res.status(400);
      res.send("No id provided");
  } 
  else {
      const user = await Users.findById(id);
      try {
          await user.remove();
          res.status(200);
          res.send("User deleted");
      }
      catch (error) {
          res.status(400);
          res.send(error);
      }
  }
});

// ---------------- Get a/many deck by user ----------------
app.get('/get_deck/:id', async (req, res) => {
  if (req.params.id === undefined) {
      res.sendStatus(400);
  } else {
      const id = req.params.id;
      const deck = await Deck.find({userId: id});
      if (deck === null) {
          res.sendStatus(404);
      } else {
          res.status(200);
          res.json(deck);
      }
  }
});

// ----------------------------------------
// ------------- DECK ROUTES --------------
// ----------------------------------------

// ---------------- Get By ID ----------------
app.get('/decks/:id/cards', async (req, res) => {
  const limit = req.query.limit
  const deck = await Deck.findById(req.params.id)
  if (deck) {
    res.send(deck.cards.slice(0, limit))
  } else {
    res.sendStatus(404)
  }
})

// ---------------- Delete a deck ----------------
app.get('/decks/:id/delete', async (req, res) => {
  const id = req.params.id;
  if (id === undefined) {
      res.sendStatus(400);
  }
  else {
      const deck = await Deck.findById(id);
      if (deck === null) {
          res.sendStatus(404);
      } 
      else {
        try {
            await deck.remove();
            res.status(200);
            res.send("Deck deleted");
        }
        catch (error) {
            res.status(400);
            res.send(error);
        }
    }
  }
});

// ---------------- Create a deck ----------------
app.post('/decks/create', async (req, res) => {
  const deckData = new Deck(req.body);
  if (deckData.id === undefined) {
      deckData.id = mongoose.Types.ObjectId();
  }
  try {
      const deck = await Deck.create(deckData);
      res.status(200);
      res.json(deck);
  }
  catch (error) {
      res.status(400);
      res.send(error);
  }
});

// ---------------- Update a deck ----------------
app.post('/decks/:id/update', async (req, res) => {
  if (req.params.id === undefined) {
      res.status(400);
      res.send('No id provided');
  }
  else {
    const deck = await Deck.findById(req.params.id);
    if (deck === null) {
        res.status(404);
        res.send('Deck not found');
    }
    else {
      for (const key in req.body) {
          deck[key] = req.body[key];
      }
      try {
        await deck.save();
        res.status(200);
        res.json(deck);
      }
      catch (error) {
        res.status(400);
        res.send(error);
      }
    }
  }
});

// ----------------------------------------
// ------------- CARD ROUTES --------------
// ----------------------------------------

// ---------------- Delete a card ----------------
app.delete('/delete_card/:id', async (req, res) => {
  if (req.params.id === undefined) {
      res.sendStatus(400);
  } else {
        var card = await Deck.findOne({
          'cards._id': req.params.id
        })
        if (card === null) {
            res.sendStatus(404);
        }
        else {
          const newCards = card.cards.filter(card => card._id !== req.params.id)
          card.cards = newCards
          try {
              await card.save();
              res.status(200);
              res.send("Card deleted");
          }
          catch (error) {
              res.status(400);
              res.send(error);
          }
      }
    }
});

// ---------------- Get a card by ID ----------------
app.get('/cards/:id', async (req, res) => {
  if (req.params.id === undefined) {
      res.sendStatus(400);
  } else {
      try {
        const card = await Deck.findOne({
          'cards._id': req.params.id
        })
        if (card === null) {
          res.sendStatus(404);
        } 
        else {
          const oneCard = card.cards.id(req.params.id)
          res.status(200);
          res.send(oneCard)
        }
      }
      catch (error) {
        res.status(400);
        res.send(error);
      }
    }
});

const isUrl = (value) => {
  // eslint-disable-next-line no-useless-escape
  const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  return re.test(value)
}

// ---------------- Get a card by ID ----------------
app.post('/cards', async (req, res) => {
  const cardreq = req.body
  
  if ((!cardreq.frontImage && !cardreq.frontText) || 
    (!cardreq.backImage && !cardreq.backText)) {
    res.status(400).send('Card data incomplete')
  }

  // eslint-disable-next-line no-undef
  if ((frontImage && !isUrl(frontImage)) || (backImage && !isUrl(backImage))) {
    res.status(400).send('Image fields must be valid URLs')
  }

  if (!cardreq.deckId) {
    res.status(400).send('Deck ID is required')
  }

  try {
    const deck = await Deck.findById(cardreq.deckId)
    if (deck) {
      deck.cards.push({
        frontImage: cardreq.frontImage,
        frontText: cardreq.frontText,
        backImage: cardreq.backImage,
        backText: cardreq.backText
      })
      await deck.save()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.log(`error in creating card ${err}`)
    res.sendStatus(502)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})