const express = require('express')
const app = express();
const cors = require('cors');
const {MongoClient, Collection, MongoAzureError} = require('mongodb');
const api = require('./api.js');
const Threads = require('./entities/threads.js');
app.use(express.json())
app.use(cors());

app.use('/threads', async (req, res)=>{
  const dburl = "mongodb+srv://victorlocherer:blQqG6A9ZpIX4p3Q@clusterprojet.etclz03.mongodb.net/"

  const client = new MongoClient(dburl);
  try {
      //test
    await client.connect();

    const db = client.db("DatabaseProjet");
    const thread = new Threads.default(db);
    console.log(req.body.original_poster_id, req.body.title, req.body.is_admin)
    thread.createThread(req.body.original_poster_id, req.body.title, req.body.is_admin).then((thread_id) => {
      res.status(200).json(thread_id);
    })
    .catch(() => {
      res.status(400).json({message: "Thread déjà existant"});
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Erreur interne"});
  }
  finally{
    client.close();
  }
});

app.post('/Authentification', async (req, res)=>{
  const dburl = "mongodb+srv://victorlocherer:blQqG6A9ZpIX4p3Q@clusterprojet.etclz03.mongodb.net/"

  const client = new MongoClient(dburl);
  
  try {

    await client.connect();

    const db = client.db("DatabaseProjet");
    var collection = db.collection('Users');
    const query = {username: req.body.login, password: req.body.password};
    const options = {projection: {_id: 0, username: 1, password: 1, logo : 1}};
    const result = await collection.findOne(query, options);
    if(result != null){
      res.status(200).json(result);
    } else {
        res.status(401).json({message: "Utilisateur inconnu"});
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Erreur interne"});
  }
  finally{
    client.close();
  }
  next();
});


// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});

