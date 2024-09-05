const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.status(200).json({ msg: 'Message received' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
