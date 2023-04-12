const Joi = require('joi');

const Intro = require('../../models/Intro.model');

const introController = {
    getIntros: async (req, res) => {
        const intros = await Intro.findAll();
        res.json(intros);
    },

    updateIntro: async (req, res) => {
        const { error, value } = validateIntroForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { id } = req.params;
        const { title, content } = req.body;
        await Intro.update({ title, content }, { where: { id } });

        const updatedIntro = await Intro.findOne({ where: { id } });
        res.json(updatedIntro);
    },
};

module.exports = introController;

const validateIntroForm = (homeForm) => {
    const schema = Joi.object({
        title: Joi.string().min(2).required(),
        content: Joi.string().min(2).required(),
    });
    return schema.validate(homeForm);
};
