import { useState } from "react";

const revenue = [
    {id : 1, day:"Monday", amount:85000},
    {id : 2, day:"Tuesday", amount:40000},
    {id : 3, day:"Wednesday", amount:25000},
    {id : 4, day:"Thursday", amount:185000},
    {id : 5, day:"Friday", amount:150000},
    {id : 6, day:"Saturday", amount:35000},
    {id : 7, day:"Sunday", amount:10000},
];


const totalRevenue = Number(1000000).toLocaleString();
export default function Dashboard(){

    return(
            <div className="overview fg-black">
                <h1>Dashboard</h1>
                <h3>Business Overview</h3>
                <div className="overview-wrapper">
                    <div className="overview-card">
                        <p>Total Revenue</p>
                        <h3>Ksh {totalRevenue}</h3>
                        <p>↑ 12.5% vs last month</p>
                    </div>
                    <div className="overview-card">
                        <p>Net Profit</p>
                        <h3>Ksh 102K</h3>
                        <p>↑ 8.2% vs last month</p>
                    </div>
                    <div className="overview-card">
                        <p>Total Orders</p>
                        <h3>204</h3>
                        <p>↑ 6.4% vs last month</p>
                    </div>
                    <div className="overview-card">
                        <p>Average Order Value</p>
                        <h3>Ksh 2605</h3>
                        <p>↑ 3.1% vs last month</p>
                    </div>
                    <div className="overview-card">
                        <p>Average weekly Revenue</p>
                        <div>
                            {<ol>
                                {revenue.map((day)=>{
                                    return(
                                    <li key={day.id}>
                                        {day.day}<span>Ksh {day.amount.toLocaleString()}</span>
                                    </li>
                                )})
                                }
                            </ol>}
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}