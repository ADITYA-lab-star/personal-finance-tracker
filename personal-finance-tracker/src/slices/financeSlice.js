import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  income: 0,
  expenses: 0,
  transactions: [], // { id, title, amount, type }
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { title, amount, type } = action.payload;
      state.transactions.push({ id: Date.now(), title, amount, type });

      if (type === "income") {
        state.income += amount;
        state.balance += amount;
      } else {
        state.expenses += amount;
        state.balance -= amount;
      }
    },
    deleteTransaction: (state, action) => {
      const id = action.payload;
      const tx = state.transactions.find((t) => t.id === id);
      if (!tx) return;

      if (tx.type === "income") {
        state.income -= tx.amount;
        state.balance -= tx.amount;
      } else {
        state.expenses -= tx.amount;
        state.balance += tx.amount;
      }

      state.transactions = state.transactions.filter((t) => t.id !== id);
    },
  },
});

export const { addTransaction, deleteTransaction } = financeSlice.actions;
export default financeSlice.reducer;
