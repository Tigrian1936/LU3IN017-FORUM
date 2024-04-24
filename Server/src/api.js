async function GetAllThreads(db)
{
    const query = {};
    const options = {projection: {_id : 0, original_poster_id : 1,  creation_date : 1, title : 1, is_admin : 1}};
    const result = await db.collection('Threads').find(query, options);
    return await result.toArray();
}

async function GetThreadMessages(db, thread_id){
    const queryMessage = {thread_id :{$eq : thread_id}};
    const optionsMessage = {projection: {_id : 0, text:1, user_id : 1, publish_date : 1}};
    const messages = await db.collection('Messages').find(query, options);
    return await result.toArray();
}
async function GetThreadsNewerThan(db, date)
{
    const query = {creation_date : {$gt : date}};
    const options = {projection: {_id : 0, original_poster_id : 1,  creation_date : 1, title : 1, is_admin : 1}};
    const result = await db.collection('Threads').find(query, options);
    return await result.toArray();
}

async function GetFirstNThreadsByDate(db, n)
{
    const query = {};
    const options = {projection: {_id : 0, original_poster_id : 1,  creation_date : 1, title : 1, is_admin : 1}, sort : {creation_date : 1}, limit : n};
    const result = await db.collection('Threads').find(query, options);
    return await result.toArray();
}

async function CreateThread(db, original_poster_id, title, is_admin){
    const query = {original_poster_id : original_poster_id, title : title, is_admin : is_admin}
    const options = {projection: {_id : 1}};
    const data = await db.collection('Threads').findOne(query, options);
    console.log(data);
    return new Promise((resolve, reject) => {
        if(data != null){
            reject("Thread already exists");
        }
        else {
            const thread = {original_poster_id : original_poster_id, title : title, is_admin : is_admin, creation_date : Date.now()};
            const thread_id = db.collection('Threads').insertOne(thread);
            resolve(thread_id);
        }
    });
}

async function GetThreadByTitle(db, title){
    const query = {title: title};
    const options = {projection: {_id : 0, original_poster_id : 1,  creation_date : 1, title : 1, is_admin : 1}};
    const result = await db.collection('Threads').findOne(query, options);
    return await result.toArray();
}


async function GetThreadById(db, thread_id){
    const query = {_id: thread_id};
    const options = {projection: {_id : 0, original_poster_id : 1,  creation_date : 1, title : 1, is_admin : 1}};
    const result = await db.collection('Threads').findOne(query, options);
    return await result.toArray();
}

async function GetAllThreadsOfUser(db, user_id){
    const query = {original_poster_id : user_id};
    const options = {projection: {_id : 0, original_poster_id : 1,  creation_date : 1, title : 1, is_admin : 1}};
    const result = await db.collection('Threads').find(query, options);
    return await result.toArray();
}

module.exports = {GetAllThreads, GetThreadsNewerThan, GetFirstNThreadsByDate, CreateThread, GetThreadByTitle, GetThreadById, GetAllThreadsOfUser};
// const express = require("express");
// const Users = require("./entities/users.js");

// function init(db) {
//     const router = express.Router();
//     On utilise JSON
//     router.use(express.json());
//     simple logger for this router's requests
//     all requests to this router will first hit this middleware
//     router.use((req, res, next) => {
//         console.log('API: method %s, path %s', req.method, req.path);
//         console.log('Body', req.body);
//         next();
//     });
//     const users = new Users.default(db);
//     router.post("/user/login", async (req, res) => {
//         try {
//             const { login, password } = req.body;
//             Erreur sur la requête HTTP
//             if (!login || !password) {
//                 res.status(400).json({
//                     status: 400,
//                     "message": "Requête invalide : login et password nécessaires"
//                 });
//                 return;
//             }
//             if (! await users.exists(login)) {
//                 res.status(401).json({
//                     status: 401,
//                     message: "Utilisateur inconnu"
//                 });
//                 return;
//             }
//             let userid = await users.checkpassword(login, password);
//             if (userid) {
//                 Avec middleware express-session
//                 req.session.regenerate(function (err) {
//                     if (err) {
//                         res.status(500).json({
//                             status: 500,
//                             message: "Erreur interne"
//                         });
//                     }
//                     else {
//                         C'est bon, nouvelle session créée
//                         req.session.userid = userid;
//                         res.status(200).json({
//                             status: 200,
//                             message: "Login et mot de passe accepté"
//                         });
//                     }
//                 });
//                 return;
//             }
//             Faux login : destruction de la session et erreur
//             req.session.destroy((err) => { });
//             res.status(403).json({
//                 status: 403,
//                 message: "login et/ou le mot de passe invalide(s)"
//             });
//             return;
//         }
//         catch (e) {
//             Toute autre erreur
//             res.status(500).json({
//                 status: 500,
//                 message: "erreur interne",
//                 details: (e || "Erreur inconnue").toString()
//             });
//         }
//     });
//     router
//         .route("/user/:user_id(\\d+)")
//         .get(async (req, res) => {
//             try {
//                 const user = await users.get(req.params.user_id);
//                 if (!user)
//                     res.sendStatus(404);
//                 else
//                     res.send(user);
//             }
//             catch (e) {
//                 res.status(500).send(e);
//             }
//         })
//         .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));
//     router.put("/user", (req, res) => {
//         const { login, password, lastname, firstname } = req.body;
//         if (!login || !password || !lastname || !firstname) {
//             res.status(400).send("Missing fields");
//         } else {
//             users.create(login, password, lastname, firstname)
//                 .then((user_id) => res.status(201).send({ id: user_id }))
//                 .catch((err) => res.status(500).send(err));
//         }
//     });
//     return router;
// }
// module.exports = init;