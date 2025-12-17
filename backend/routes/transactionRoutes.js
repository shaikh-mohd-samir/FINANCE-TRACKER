const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");
const protect = require("../middleware/auth");

/**
 * @route   GET /api/transactions
 * @desc    Get all transactions for logged-in user
 * @access  Private
 */
// GET transactions (with pagination, filter, sort)
router.get("/", protect, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const type = req.query.type || "all";
    const sort = req.query.sort || "date_desc";

    const query = { user: req.user.id };

    if (type !== "all") {
      query.type = type;
    }

    let sortOption = { createdAt: -1 };

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
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/transactions
 * @desc    Add a new transaction
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { type, description, amount, date } = req.body;

    if (!type || !description || !amount || !date) {
      return res.status(400).json({ message: "All fields required" });
    }

    const transaction = new Transaction({
      user: req.user.id,
      type,
      description,
      amount: Number(amount),
      date: new Date(date), // ✅ important
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   DELETE /api/transactions/:id
 * @desc    Delete a transaction
 * @access  Private
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id, // 🔒 user ownership check
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;