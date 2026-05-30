const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

class User {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async createUser(email, password) {
    const hashed = await bcrypt.hash(password, 10);
    return this.collection.insertOne({ email, password: hashed });
  }

  async findByEmail(email) {
    return this.collection.findOne({ email });
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
