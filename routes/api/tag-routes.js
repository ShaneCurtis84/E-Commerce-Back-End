const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single product by its `id`
    const tags = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Category and Tag data
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tags) {
      res.status(404).json({ message: "Tag not found!" });
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    await Tag.create(req.body);
    res
      .status(200)
      .json({ message: `The tag '${req.body.tag_name}' has been created` });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tags = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tags[0]) {
      res.status(404).json({ message: "Tag not found!" });
      return;
    }

    res.status(200).json({ message: `Updated Tag id #${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tags) {
      res.status(404).json({ message: "Tag not found!" });
      return;
    }

    res
      .status(200)
      .json({ message: `Tag id #${req.params.id} has been deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
