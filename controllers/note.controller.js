const CardModel = require('../models/card.model');
const { Request: ExpressRequest, Response: ExpressResponse } = require('express');

exports.createCard = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const newCard = new CardModel(req.body);
        await newCard.save();
        res.status(201).json({ message: 'Card created successfully', card: newCard });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create card', error: error.message });
    }
};

exports.deleteCard = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const { id } = req.params;
        await CardModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete card', error: error.message });
    }
};

exports.getAllCards = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const cards = await CardModel.find();
        res.status(200).json({ cards });
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch cards', error: error.message });
    }
};

exports.getSingleCard = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const { id } = req.params;
        const card = await CardModel.findById(id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({ card });
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch card', error: error.message });
    }
};

exports.updateCard = async (req = ExpressRequest, res = ExpressResponse,io) => {
    try {
        const { id } = req.params;
        const updatedCard = await CardModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'Card updated successfully', card: updatedCard });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update card', error: error.message });
    }
};