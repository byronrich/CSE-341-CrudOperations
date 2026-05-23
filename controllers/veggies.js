const Veggie = require('../models/veggies');

const veggiesController = {
  // GET all veggies
  async getAll(req, res) {
    try {
      const veggies = await Veggie.find();
      res.status(200).json(veggies);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch veggies' });
    }
  },

  // GET one veggie by ID
  async getOne(req, res) {
    try {
      const id = req.params.id;

      const veggie = await Veggie.findById(id);
      if (!veggie) return res.status(404).json({ error: 'Veggie not found' });

      res.status(200).json(veggie);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch veggie' });
    }
  },

  // CREATE veggie
  async create(req, res) {
    try {
      const veggie = await Veggie.create(req.body);
      res.status(201).json(veggie);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create veggie' });
    }
  },

  // UPDATE veggie
  async update(req, res) {
    try {
      const id = req.params.id;

      const updatedVeggie = await Veggie.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedVeggie) return res.status(404).json({ error: 'Veggie not found' });

      res.status(200).json({ message: 'Veggie updated', veggie: updatedVeggie });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update veggie' });
    }
  },

  // DELETE veggie
  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedVeggie = await Veggie.findByIdAndDelete(id);
      if (!deletedVeggie) return res.status(404).json({ error: 'Veggie not found' });

      res.status(200).json({ message: 'Veggie deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete veggie' });
    }
  }
};

module.exports = veggiesController;
