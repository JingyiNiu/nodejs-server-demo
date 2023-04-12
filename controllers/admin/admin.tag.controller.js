const Joi = require('joi');
const Tag = require('../../models/Tag.model');

const adminTagController = {
    getAllTags: async (req, res) => {
        const tags = await Tag.findAll();
        res.json(tags);
    },

    getOneTag: async (req, res) => {
        const { id } = req.params;
        const tag = await Tag.findOne({ where: { id } });
        res.json(tag);
    },

    createTag: async (req, res) => {
        const { error, value } = validateTagForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { name, slug, description } = req.body;
        const tag = await Tag.create({ name, slug, description });
        res.json(tag);
    },

    updateTag: async (req, res) => {
        const { error, value } = validateTagForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { id } = req.params;
        const { name, slug, description } = req.body;
        await Tag.update({ name, slug, description }, { where: { id } });

        const updatedTag = await Tag.findOne({ where: { id } });
        res.json(updatedTag);
    },

    deleteTag: async (req, res) => {
        const { id } = req.params;
        await Tag.destroy({ where: { id } });
        res.json({ message: 'Record deleted successfully' });
    },
};

module.exports = adminTagController;

const validateTagForm = (articleForm) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        slug: Joi.string().min(2).max(100).required(),
        description: Joi.string().required(),
    });
    return schema.validate(articleForm);
};
