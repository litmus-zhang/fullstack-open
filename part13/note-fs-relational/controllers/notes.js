const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const { Note, User } = require('../models');
const { Op } = require('sequelize');

const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(Number(req.params.id));
    next();
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
        } catch {
            return res.status(401).json({ error: 'invalid token' });
        }
    } else {
        return res.status(401).json({ error: 'token missing' });
    }
}

router.get('/', async (req, res) => {
    try {
        const where = {};
        if (req.query.important) {
            where.important = req.query.important === 'true';
        }
        if (req.query.search) {
            where.content = {
                [Op.substring]: req.query.search
            }
        }
        const notes = await Note.findAll({
            attributes: { exclude: ['userId'] },
            include: {
                model: User,
                attributes: ['name']
            },
            where
        });
        res.json(notes);
    } catch (error) {
        return res.status(400).json({ error })
    }
});

router.post("/", tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const note = await Note.create({ ...req.body, userId: user.id, date: new Date() });
        res.json(note);
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get("/:id", noteFinder, async (req, res) => {
    try {
        if (req.note) {
            return res.json(req.note);
        }
        return res.status(404).end();
    } catch (error) {
        return res.status(400).json({ error })
    }
});

router.put("/:id", noteFinder, async (req, res) => {
    try {
        if (req.note) {
            req.note.important = req.body.important;
            await req.note.save();
            return res.json(req.note);
        }
        return res.status(404).end();
    } catch (error) {
        res.status(400).json({ error })
    }
});

router.delete("/:id", noteFinder, async (req, res) => {
    try {
        if (req.note) {
            await req.note.destroy();
            return res.status(204).end();
        }
        return res.status(404).end();
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router;