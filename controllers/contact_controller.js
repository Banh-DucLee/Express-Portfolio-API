const Contact = require('../models/contact_model');

exports.getAll = (req, res) => {
    Contact.find()
        .then( contact => {
            res.status(200).json(contact);
        })
        .catch( error => {
            res.status(404).json({ error });
        })
}

exports.getContact = (req, res) => {
    Contact.findOne({ _id: req.params.id })
        .then( contact => {
            res.status(201).json({contact});
        })
        .catch( error => {
            res.status(404).json({error});
        })
}

exports.create = (req, res) => {
    const contactObject = req.body;
    delete contactObject._id;

    const contact = new Contact({
        ...contactObject
    });

    contact.save()
        .then( () => {
            res.status(201).json({
                message: 'Contact created successfully'
            });
        })
        .catch( error => {
            res.status(400).json({error});
        })
}

exports.delete = async (req, res) => {
    try {
        const contact = await Contact.findOne({ _id: req.params.id });
        if (!contact) {
            return res.status(404).json({
                error: 'Contact not found'
            });
        }

        await Contact.deleteOne({ _id: req.params.id });
    } catch (error) {
        res.status(404).json({error});
    }
}