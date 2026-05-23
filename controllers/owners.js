const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const ownersController = {
  async getAll(req, res) {
    try {
      const db = getDb();
      const owners = await db.collection('owners').find().toArray();
      res.status(200).json(owners);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch owners' });
    }
  },

  async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const owner = await db.collection('owners').findOne({ _id: new ObjectId(id) });

      if (!owner) return res.status(404).json({ error: 'Owner not found' });

      res.status(200).json(owner);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch owner' });
    }
  },

  async create(req, res) {
    try {
      const db = getDb();
      const result = await db.collection('owners').insertOne(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create owner' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const result = await db.collection('owners').replaceOne(
        { _id: new ObjectId(id) },
        req.body
      );

      if (result.matchedCount === 0)
        return res.status(404).json({ error: 'Owner not found' });

      res.status(200).json({ message: 'Owner updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update owner' });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

      const db = getDb();
      const result = await db.collection('owners').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0)
        return res.status(404).json({ error: 'Owner not found' });

      res.status(200).json({ message: 'Owner deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete owner' });
    }
  }
};

module.exports = ownersController;
