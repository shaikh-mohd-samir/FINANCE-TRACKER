import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT: Add Transaction */}
        <div className="bg-white p-5 rounded shadow">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Finance Tracker
          </h1>

          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Transaction
          </h2>

          <TransactionForm onAdded={() => setRefresh(!refresh)} />
        </div>

        {/* RIGHT: Recent Transactions */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recent Transactions
          </h2>

          <TransactionList refresh={refresh} />
        </div>

      </div>
    </div>
  );
}