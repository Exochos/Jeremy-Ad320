import mongoose from 'mongoose';
import Users from './Users.js';
//import { Deck } from './Deck.js';

// Connect to MongoDB
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bgjij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
try {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000});

  console.log("Connected to the database!");
} 
catch (err) {
  console.log("Cannot connect to the database!", err);
  process.exit();
}

const dbModelSchema = new mongoose.Schema({
    Users : mongoose.model('Users', Users),
  })
export const dbModel = mongoose.model('dbModels', dbModelSchema);