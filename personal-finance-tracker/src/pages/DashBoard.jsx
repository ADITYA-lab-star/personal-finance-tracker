import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addTransaction, deleteTransaction } from "../slices/financeSlice";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";



export default function Dashboard() {
  const { balance, income, expenses, transactions } = useSelector(
    (state) => state.finance
  );
  const dispatch = useDispatch();

  // Local state for new transaction form
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  // Enhanced Add Handler
  const handleAdd = () => {
    if (!title || !amount) return;

    dispatch(
      addTransaction({
        id: Date.now(), // unique id
        title,
        amount: Number(amount),
        type,
        date: new Date().toLocaleDateString(),
      })
    );

    // reset form
    setTitle("");
    setAmount("");
    setType("income");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white flex justify-between items-center px-6 py-3 shadow">
        <h1 className="text-xl font-bold">Financly.</h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-white text-blue-600 px-4 py-1 rounded-md shadow hover:bg-gray-100">
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Top Row - Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-gray-700 font-semibold">Balance</h2>
            <p className="text-2xl font-bold mt-2">${balance}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-gray-700 font-semibold">Income</h2>
            <p className="text-2xl font-bold mt-2 text-green-600">${income}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-gray-700 font-semibold">Expenses</h2>
            <p className="text-2xl font-bold mt-2 text-red-600">${expenses}</p>
          </div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Financial Statistics */}
          <div className="bg-white shadow rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-gray-700 font-semibold mb-4">
              Financial Statistics
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart goes here
            </div>
          </div>

          {/* All Expenses (from transactions) */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-gray-700 font-semibold mb-4">All Expenses</h2>
            <ul className="space-y-2 text-sm">
              {transactions
                .filter((t) => t.type === "expense")
                .map((t) => (
                  <li key={t.id} className="flex justify-between">
                    <span>{t.title}</span>
                    <span className="font-semibold text-red-500">
                      -${t.amount}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Search + Filter Row */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600">
            Filter 1
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600">
            Filter 2
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600">
            Filter 3
          </button>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-gray-700 font-semibold mb-4">Add Transaction</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg px-4 py-2 flex-1 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded-lg px-4 py-2 flex-1 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-gray-700 font-semibold mb-4">
            Recent Transactions
          </h2>
          <ul className="space-y-2 text-sm">
            {transactions.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{t.title}</span>
                <span
                  className={`font-semibold ${
                    t.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </span>
                <button
                  className="text-gray-400 hover:text-red-600 ml-4"
                  onClick={() => dispatch(deleteTransaction(t.id))}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
