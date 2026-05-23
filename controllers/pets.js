const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const petsController = {
  async getAll(req, res) {
    try {
      const db = getDb();
      const pets = await db.collection('pets').find().toArray();
      res.status(200).json(pets);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch pets' });
    }
  },

  async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const pet = await db.collection('pets').findOne({ _id: new ObjectId(id) });

      if (!pet) return res.status(404).json({ error: 'Pet not found' });

      res.status(200).json(pet);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch pet' });
    }
  },

  async create(req, res) {
    try {
      const db = getDb();
      const result = await db.collection('pets').insertOne(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create pet' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const result = await db.collection('pets').replaceOne(
        { _id: new ObjectId(id) },
        req.body
      );

      if (result.matchedCount === 0)
        return res.status(404).json({ error: 'Pet not found' });

      res.status(200).json({ message: 'Pet updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update pet' });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const result = await db.collection('pets').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: 'Pet not found' });

      res.status(200).json({ message: 'Pet deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete pet' });
    }
  }
};

module.exports = petsController;
