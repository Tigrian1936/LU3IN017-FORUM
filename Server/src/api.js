const { ObjectId } = require('mongodb');
async function GetAllThreads(db)
{
    const query = {};
    const options = {projection: {_id : 0, original_poster_id : 1,  creation_date : 1, title : 1, is_admin : 1}};
    const result = await db.collection('Threads').find(query, options);
    return await result.toArray();
}

async function GetThreadMessages(db, thread_id){
    return new Promise((resolve, reject) => {
        const query = { thread_id: ObjectId(thread_id) };
        const options = { projection: { _id: 1, text: 1, user_id: 1, publish_date: 1 } };
        const messages = db.collection('Messages').find(query, options).toArray();
        if(messages != null){
            resolve(messages);
        }
        else {
            reject("No messages found");
        }
    });
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
    return new Promise((resolve, reject) => {
        const query ={};
        const options = {projection: {_id : 1, original_poster_id : 1,  creation_date : 1, title : 1, is_admin : 1}, sort : {creation_date : 1}, limit : n};
        const result = db.collection('Threads').find(query, options).toArray();
        if(result != null){
            resolve(result);
        }
        else {
            reject("No threads found");
        }   
    });
}

async function CreateServerMessage(db, thread_id, user_id, title, is_admin){
    return new Promise((resolve, reject) => {
        const query = {_id  : user_id};
        const options = {projection: {_id : 0, username : 1}};
        const user = db.collection('Users').findOne(query, options);
        const text = `Thread ${title} created by ${user.username} (${Date.now()})`;
        const message = {thread_id : thread_id, user_id : 0, text : text, publish_date : Date.now(), is_admin : is_admin};
        db.collection('Messages').insertOne(message).then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });

}

async function CreateThread(db, original_poster_id, title, is_admin){
    const query = {original_poster_id : original_poster_id, title : title, is_admin : is_admin}
    const options = {projection: {_id : 1}};
    const data = await db.collection('Threads').findOne(query, options);
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

async function GetThreadRecommendation(db, queryType, count){
    switch(queryType){
        case "By-most-recent":
            return await GetFirstNThreadsByDate(db, count);
    }
    console.log('Unknown query type');
    return null;
}

module.exports = {GetAllThreads, GetThreadMessages, GetThreadsNewerThan, GetFirstNThreadsByDate, GetThreadRecommendation, CreateThread, GetThreadByTitle, GetThreadById, CreateServerMessage, GetAllThreadsOfUser};