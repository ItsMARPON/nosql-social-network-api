const connection = require('../config/connection');
const User = require('../models/User');
const {users, thoughts, reactions} = require('./data');


// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await User.deleteMany({});

  // Wait for the users to be inserted into the database
  await User.collection.insertMany(users);

  console.table(users);
  process.exit(0);
});

