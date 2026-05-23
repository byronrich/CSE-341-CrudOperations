const Fruit = require('../models/fruits');

const fruitsController = {
  // GET all fruits
  async getAll(req, res) {
    try {
      const fruits = await Fruit.find();
      res.status(200).json(fruits);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch fruits' });
    }
  },

  // GET one fruit by ID
  async getOne(req, res) {
    try {
      const id = req.params.id;

      const fruit = await Fruit.findById(id);
      if (!fruit) return res.status(404).json({ error: 'Fruit not found' });

      res.status(200).json(fruit);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch fruit' });
    }
  },

  // CREATE fruit
  async create(req, res) {
    try {
      const fruit = await Fruit.create(req.body);
      res.status(201).json(fruit);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create fruit' });
    }
  },

  // UPDATE fruit
  async update(req, res) {
    try {
      const id = req.params.id;

      const updatedFruit = await Fruit.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedFruit) return res.status(404).json({ error: 'Fruit not found' });

      res.status(200).json({ message: 'Fruit updated', fruit: updatedFruit });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update fruit' });
    }
  },

  // DELETE fruit
  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedFruit = await Fruit.findByIdAndDelete(id);
      if (!deletedFruit) return res.status(404).json({ error: 'Fruit not found' });

      res.status(200).json({ message: 'Fruit deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete fruit' });
    }
  }
};

module.exports = fruitsController;
