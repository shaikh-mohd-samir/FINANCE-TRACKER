const Transaction = require("../models/Transaction");

/**
 * GET transactions
 * Supports:
 * - user-based data (JWT)
 * - filter by type
 * - sorting
 */
exports.getTransactions = async (req, res) => {
  try {
    const { type, sort } = req.query;

    // ONLY logged-in user's transactions
    let query = { user: req.user.id };

    // Filter
    if (type && type !== "all") {
      query.type = type;
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // newest first

    if (sort === "date_asc") sortOption = { createdAt: 1 };
    if (sort === "amount_desc") sortOption = { amount: -1 };
    if (sort === "amount_asc") sortOption = { amount: 1 };

    const transactions = await Transaction.find(query).sort(sortOption);

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

/**
 * POST new transaction
 * Saves transaction for logged-in user
 */
exports.addTransaction = async (req, res) => {
  try {
    const { type, description, amount } = req.body;

    if (!type || !description || !amount) {
      return res.status(400).json({ message: "All fields required" });
    }

    const transaction = new Transaction({
      type,
      description,
      amount,
      user: req.user.id,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
};