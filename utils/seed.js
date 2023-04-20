const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
const {users, thoughts, reactions} = require('./data');

console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});


  // Wait for the users and Thoughts to be inserted into the database
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.timeEnd('Seeding data complete!');
  process.exit(0);
});

