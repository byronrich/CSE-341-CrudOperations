const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const veggiesController = {
  async getAll(req, res) {
    try {
      const db = getDb();
      const veggies = await db.collection('veggies').find().toArray();
      res.status(200).json(veggies);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch veggies' });
    }
  },

  async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const veggie = await db.collection('veggies').findOne({ _id: new ObjectId(id) });

      if (!veggie) return res.status(404).json({ error: 'Veggie not found' });

      res.status(200).json(veggie);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch veggie' });
    }
  },

  async create(req, res) {
    try {
      const db = getDb();
      const result = await db.collection('veggies').insertOne(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create veggie' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const result = await db.collection('veggies').replaceOne(
        { _id: new ObjectId(id) },
        req.body
      );

      if (result.matchedCount === 0)
        return res.status(404).json({ error: 'Veggie not found' });

      res.status(200).json({ message: 'Veggie updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update veggie' });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const result = await db.collection('veggies').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: 'Veggie not found' });

      res.status(200).json({ message: 'Veggie deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete veggie' });
    }
  }
};

module.exports = veggiesController;
