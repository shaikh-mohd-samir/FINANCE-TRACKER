const Transaction = require("../models/Transaction");

/**
 * GET transactions
 */
exports.getTransactions = async (req, res) => {
  try {
    const { type, sort, page = 1, limit = 5 } = req.query;

    const skip = (page - 1) * limit;

    let query = { user: req.user.id };

    if (type && type !== "all") {
      query.type = type;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "date_asc") sortOption = { createdAt: 1 };
    if (sort === "amount_desc") sortOption = { amount: -1 };
    if (sort === "amount_asc") sortOption = { amount: 1 };

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort(sortOption)
      .skip(Number(skip))
      .limit(Number(limit));

    res.json({
      transactions,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST add transaction
 */
exports.addTransaction = async (req, res) => {
  try {
    const { type, description, amount, date } = req.body;

    if (!type || !description || amount === undefined || !date) {
      return res.status(400).json({ message: "All fields required" });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      description,
      amount: Number(amount),
      date,
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error("Add transaction error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE transaction
 */
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};