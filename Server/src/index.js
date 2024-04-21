const express = require('express')
const app = express();
const cors = require('cors');
const {MongoClient, Collection, MongoAzureError} = require('mongodb');
const api = require('./api.js');
app.use(express.json())
app.use(cors());
const dburl = "mongodb+srv://victorlocherer:blQqG6A9ZpIX4p3Q@clusterprojet.etclz03.mongodb.net/"
const client = new MongoClient(dburl);

client.connect()
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });

app.use((req, res, next) => {
  req.db = client.db('DatabaseProjet'); // Attach the database to the request
  next();
});
app.post('/threads/createThread', async (req, res)=>{
    api.CreateThread(req.db, req.body.original_poster_id, req.body.title, req.body.is_admin).then((thread_id) => {
      res.status(200).json(thread_id);
    })
    .catch(reason => {
      res.status(400).json({message : reason.message});
    });
});

/*
app.post('/je sais pas quoi mettre', async (req, res)=>{
    api.postMessage(req.db, req.body.original_poster_id, req.body.message, req.body.thread_id).then((msg_id) => {
      res.status(200).json(thread_id);
    })
    .catch(reason => {
      res.status(400).json({message : reason.message});
    });
});

//=========================================================================================================
app.get('/je sais pas quoi mettre', async (req, res)=>{
    api.getProfile(req.db, req.body.user_id) => {
// je sais pas comment le faire la du coup 
    })
    .catch(reason => {
      res.status(400).json({message : reason.message});
    });
});
*/

app.post('/authentication/login', async (req, res)=>{
    const collection = req.db.collection('Users');
    const query = {username: req.body.login, password: req.body.password};
    const options = {projection: {_id: 0, username: 1, password: 1, logo : 1}};
    const result = await collection.findOne(query, options);
    if(result != null){
      res.status(200).json(result);
    } else {
        res.status(401).json({message: "Unknown user"});
    }
});


// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});

