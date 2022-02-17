import mongoose from 'mongoose'

// Creating a schema
const CardSchema = new mongoose.Schema({
  frontImage: String,
  frontText: String,
  backImage: String,
  backText: String
})

const DeckSchema = new mongoose.Schema({
  name: String,
  cards: [CardSchema], // Allows us to create an array of card objects
  size: Number,
  userId: mongoose.Types.ObjectId
})

export const Deck = mongoose.model('Deck', DeckSchema)