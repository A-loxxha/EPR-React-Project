import { createContext, useContext, useState, useEffect } from "react";

export const FinanceContext = createContext({});

export function FinanceProvider({children}) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("/EPR-React-Project/db.json/orders")
      .then((response) => response.json())
      .then((data) => setIncome(data));

    fetch("/EPR-React-Project/db.json/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data));
  }, []);

  const totalIncome = income
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((total, order) => total + order.total, 0);

  const totalExpenses = expenses
    .filter((expense) => expense.status === "Paid")
    .reduce((total, expense) => total + expense.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider value={{income, expenses, setExpenses, totalIncome, totalExpenses, netProfit}}>
        {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}