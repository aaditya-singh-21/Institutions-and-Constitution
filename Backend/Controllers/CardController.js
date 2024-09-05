const Card = require('../models/Card');

exports.createCard = async (req, res) => {
    const { part, title, content } = req.body;

    try {
        const card = new Card({ part, title, content });
        await card.save();
        res.status(201).json({ msg: 'Card created' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getCardsByPart = async (req, res) => {
    try {
        const cards = await Card.find({ part: req.params.part });
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
