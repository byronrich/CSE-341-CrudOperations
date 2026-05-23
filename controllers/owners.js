const Owner = require('../models/owners');

const ownersController = {
  // GET all owners
  async getAll(req, res) {
    try {
      const owners = await Owner.find();
      res.status(200).json(owners);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch owners' });
    }
  },

  // GET one owner by ID
  async getOne(req, res) {
    try {
      const id = req.params.id;

      const owner = await Owner.findById(id);
      if (!owner) return res.status(404).json({ error: 'Owner not found' });

      res.status(200).json(owner);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch owner' });
    }
  },

  // CREATE owner
  async create(req, res) {
    try {
      const owner = await Owner.create(req.body);
      res.status(201).json(owner);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create owner' });
    }
  },

  // UPDATE owner
  async update(req, res) {
    try {
      const id = req.params.id;

      const updatedOwner = await Owner.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedOwner) return res.status(404).json({ error: 'Owner not found' });

      res.status(200).json({ message: 'Owner updated', owner: updatedOwner });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update owner' });
    }
  },

  // DELETE owner
  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedOwner = await Owner.findByIdAndDelete(id);
      if (!deletedOwner) return res.status(404).json({ error: 'Owner not found' });

      res.status(200).json({ message: 'Owner deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete owner' });
    }
  }
};

module.exports = ownersController;
