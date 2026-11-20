import Invoice from "./Invoice";
import Expenses from "./Expenses";
import Tax from "./Tax";
import { useFinance } from "../contexts/FinanceContexts";

export default function Finance() {
  const { totalIncome, totalExpenses, netProfit } = useFinance();

  return (
    <div className="finance-content">
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
      <Tax />
      <Invoice />
      <Expenses />
    </div>
  );
}