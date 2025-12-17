import { useEffect, useState } from "react";
import api from "../api";

function TransactionList({refresh}) {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("date_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [type, sort, page, refresh]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions", {
        params: {
          page: page,
          limit: 5,
          type: type,
          sort: sort,
        },
      });

      if (Array.isArray(res.data)) {
        setTransactions(res.data);
        setTotalPages(1);
      } else {
        setTransactions(res.data.transactions || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete("/transactions/" + id);
      fetchTransactions();
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        {/* Recent Transactions */}
      </h2>

      <div className="flex gap-3 mb-4">
        <select
          className="border p-2 rounded w-1/2"
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="border p-2 rounded w-1/2"
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
        >
          <option value="date_desc">Newest</option>
          <option value="date_asc">Oldest</option>
          <option value="amount_desc">Amount High → Low</option>
          <option value="amount_asc">Amount Low → High</option>
        </select>
      </div>

      {transactions.length === 0 && (
        <p className="text-gray-500">
          No transactions found
        </p>
      )}

      {transactions.length > 0 && (
        <ul className="space-y-3">
          {transactions.map((t) => (
            <li
              key={t._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">
                  {t.description}
                </p>

                <p className="text-sm text-gray-500 capitalize">
                  {t.type}
                </p>

                <p className="text-xs text-gray-400">
                  {t.createdAt
                    ? new Date(t.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={
                    "font-semibold " +
                    (t.type === "income"
                      ? "text-green-600"
                      : "text-red-600")
                  }
                >
                  ₹{t.amount}
                </span>

                <button
                  onClick={() => deleteTransaction(t._id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionList;