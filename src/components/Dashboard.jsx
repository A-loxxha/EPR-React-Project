import { useFinance } from "../contexts/FinanceContexts";

const revenue = [
  { id: 1, day: "Monday", amount: 85000 },
  { id: 2, day: "Tuesday", amount: 40000 },
  { id: 3, day: "Wednesday", amount: 25000 },
  { id: 4, day: "Thursday", amount: 185000 },
  { id: 5, day: "Friday", amount: 150000 },
  { id: 6, day: "Saturday", amount: 35000 },
  { id: 7, day: "Sunday", amount: 10000 },
];

export default function Dashboard() {
  const { totalIncome, netProfit } = useFinance();

  return (
    <div className="overview">
      <h1>Dashboard</h1>
      <h3>Business Overview</h3>
      <div className="overview-wrapper">
        <div className="overview-card">
          <h4>Total Revenue</h4>
          <h3>Ksh {totalIncome.toLocaleString()}</h3>
          <p><span><i className="bi bi-arrow-up"></i>12.5%</span> vs last month</p>
        </div>
        <div className="overview-card">
          <h4>Net Profit</h4>
          <h3>Ksh {netProfit.toLocaleString()}</h3>
          <p><span><i className="bi bi-arrow-up"></i>8.2% </span>vs last month</p>
        </div>
        <div className="overview-card">
          <h4>Total Orders</h4>
          <h3>204</h3>
          <p><span><i className="bi bi-arrow-up"></i>6.4%</span> vs last month</p>
        </div>
        <div className="overview-card">
          <h4>Average Order Value</h4>
          <h3>Ksh 2605</h3>
          <p><span><i className="bi bi-arrow-up"></i>3.1% </span> vs last month</p>
        </div>
        <div className="overview-card">
          <h4>Average weekly Revenue</h4>
          <div>
            <ol>
              {revenue.map((day) => (
                <li key={day.id}>
                  {day.day}
                  <span>Ksh {day.amount.toLocaleString()}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}