const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const fruitsController = {
  async getAll(req, res) {
    try {
      const db = getDb();
      const fruits = await db.collection('fruits').find().toArray();
      res.status(200).json(fruits);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch fruits' });
    }
  },

  async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const fruit = await db.collection('fruits').findOne({ _id: new ObjectId(id) });

      if (!fruit) return res.status(404).json({ error: 'Fruit not found' });

      res.status(200).json(fruit);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch fruit' });
    }
  },

  async create(req, res) {
    try {
      const db = getDb();
      const result = await db.collection('fruits').insertOne(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create fruit' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const result = await db.collection('fruits').replaceOne(
        { _id: new ObjectId(id) },
        req.body
      );

      if (result.matchedCount === 0)
        return res.status(404).json({ error: 'Fruit not found' });

      res.status(200).json({ message: 'Fruit updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update fruit' });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const result = await db.collection('fruits').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: 'Fruit not found' });

      res.status(200).json({ message: 'Fruit deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete fruit' });
    }
  }
};

module.exports = fruitsController;
