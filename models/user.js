const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class User {
    constructor(name, email, cart, id){
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }
    save(){
        const db = getDb();
        let opDb;
        if(this._id){

        }
        else {
            opDb = db.collection('users').insertOne(this);
        }
        return opDb.then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
    addToCart(product){
        const updatedCart = { items: [{ productId : new mongodb.ObjectId(product._id), quantity: 1}] }
        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: this._id },
                {$set: { cart : updatedCart }}
            );

    }
    static findById(id){
        const db = getDb();
        return db.collection('users').findOne({_id : new mongodb.ObjectId(id)});
        
    }
}
module.exports = User;