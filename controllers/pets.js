const Pet = require('../models/pets');

const petsController = {
  // GET all pets
  async getAll(req, res) {
    try {
      const pets = await Pet.find();
      res.status(200).json(pets);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch pets' });
    }
  },

  // GET one pet by ID
  async getOne(req, res) {
    try {
      const id = req.params.id;

      const pet = await Pet.findById(id);
      if (!pet) return res.status(404).json({ error: 'Pet not found' });

      res.status(200).json(pet);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch pet' });
    }
  },

  // CREATE a new pet
  async create(req, res) {
    try {
      const pet = await Pet.create(req.body);
      res.status(201).json(pet);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create pet' });
    }
  },

  // UPDATE a pet
  async update(req, res) {
    try {
      const id = req.params.id;

      const updatedPet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedPet) return res.status(404).json({ error: 'Pet not found' });

      res.status(200).json({ message: 'Pet updated', pet: updatedPet });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update pet' });
    }
  },

  // DELETE a pet
  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedPet = await Pet.findByIdAndDelete(id);
      if (!deletedPet) return res.status(404).json({ error: 'Pet not found' });

      res.status(200).json({ message: 'Pet deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete pet' });
    }
  }
};

module.exports = petsController;
