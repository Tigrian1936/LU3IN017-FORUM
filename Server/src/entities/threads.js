class Threads {
    constructor(db) {
        this.db = db
        // suite plus tard avec la BD
    }
    
    async createThread(original_poster_id, title, is_admin) {
        const query = {original_poster_id : original_poster_id, title : title, is_admin : is_admin}
        const options = {projection: {_id : 1}};
        const data = await this.db.collection('Threads').findOne(query, options);
        console.log(data);
        return new Promise((resolve, reject) => {
            if(data != null){
                reject();
            }
            else {
                const thread = {original_poster_id : original_poster_id, title : title, is_admin : is_admin, creation_date : Date.now()};
                this.db.collection('Threads').insertOne(thread);
                resolve(thread_id);
            }
        });
    }
}
exports.default = Threads;