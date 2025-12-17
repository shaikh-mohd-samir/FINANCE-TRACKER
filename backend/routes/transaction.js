const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

/**
 * ADD TRANSACTION
 */
router.post("/", auth, async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Add failed" });
  }
});

/**
 * GET TRANSACTIONS (WITH PAGINATION)
 * Query params:
 * page, limit, type, sort
 */
router.get("/", auth, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const { type, sort } = req.query;

    const query = { user: req.user.id };

    // filter by type
    if (type && type !== "all") {
      query.type = type;
    }

    // sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === "date_asc") sortOption = { createdAt: 1 };
    if (sort === "amount_desc") sortOption = { amount: -1 };
    if (sort === "amount_asc") sortOption = { amount: 1 };

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch failed" });
  }
});

/**
 * DELETE TRANSACTION
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;