const router = require("express").Router();


const { Blog } = require("../models");

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post("/", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Blog.destroy({ where: { id } });
    res.status(204).end();
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    bloq.likes = req.body.likes;
    await blog.save();
    res.json(blog);
});


module.exports = router;
