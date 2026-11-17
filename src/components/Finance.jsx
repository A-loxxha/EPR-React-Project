import { useState, useEffect } from "react";
import Invoice from "./Invoice";
import Expenses from "./Expenses";
import Tax from "./Tax";

export default function Finance() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((res) => res.json())
      .then((data) => setIncome(data));

    fetch("http://localhost:4000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const totalIncome = income
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((total, order) => total + order.total, 0);

  const totalExpenses = expenses.reduce((total, e) => total + e.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="finance-content fg-black">
      <h1>Finance</h1>
      <div className="finance-wrapper">
        <div className="finance-card">
          <p>Total_Income</p>
          <h3>Ksh {totalIncome.toLocaleString()}</h3>
        </div>
        <div className="finance-card">
          <p>Total_Expenses</p>
          <h3>Ksh {totalExpenses.toLocaleString()}</h3>
        </div>
        <div className="finance-card">
          <p>Net_Profit</p>
          <h3>Ksh {netProfit.toLocaleString()}</h3>
        </div>
      </div>

      <Tax totalIncome={totalIncome} totalExpenses={totalExpenses} />
      <Invoice />
      <Expenses />
    </div>
  );
}