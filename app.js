const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const cors = require("cors");
const Data = require("./db/dbschema"); // Make sure to update the path to your data model

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://proboys777333:pritambhai@ac-rrmx7kp-shard-00-00.5kqktya.mongodb.net:27017,ac-rrmx7kp-shard-00-01.5kqktya.mongodb.net:27017,ac-rrmx7kp-shard-00-02.5kqktya.mongodb.net:27017/?ssl=true&replicaSet=atlas-67jp7r-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE"]
}));

app.use(express.json({ limit: '500mb' }));

app.post('/save', (req, res) => {
  // Create a new instance of the Data model
  const newData = new Data({
    date: new Date().toLocaleDateString("en-GB"),
    username: req.body.username,
    audioURL: req.body.audioDownloadURL,
    imageURL: req.body.imageDownloadURL,
  });
  // Save the data to the database
  newData.save()
    .then((savedData) => {
      console.log('Data saved:', savedData);
      res.status(200).json(savedData);
    })
    .catch((error) => {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Failed to save data' });
    });
});



// GET route to retrieve data from the database
app.get('/users', (req, res) => {
  // Retrieve the users data from the database using the find() method
  Data.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    });
});




app.delete('/delete', async (req, res) => {
  const { _id} = req.body;
  try {
    const result = await Data.findByIdAndRemove(_id);
    if (result) {
      res.status(200).json({ message: 'Song deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Song not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Song', error: error.message });
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
