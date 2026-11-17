import { useState, useEffect } from "react";


export default function Customers(){

const [customers, setCustomers] = useState([])

useEffect(()=>{
    fetch("http://localhost:4000/customers").then((response)=>response.json())
    .then((data)=> setCustomers(data))
},[])
    return(

        <div className="crm fg-black">
            <h1>Customers</h1>
            <div className="customers-card">
                <p>Total Customers</p>
                <h3>{customers.length}</h3>
            </div>

            <div className="customer-table">
                <table>
                    <thead>
                        <tr>
                            <th>Customer_Id</th>
                            <th>Customer_Name</th>
                            <th>Customer_Number</th>
                            <th>Customer_Email</th>
                            <th>Created_at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer)=>{
                            return(
                                <tr key={customer.customerId}>
                                    <td>{customer.customerId}</td>
                                    <td>{customer.customerName}</td>
                                    <td>{customer.customerNumber}</td>
                                    <td>{customer.customerEmail}</td>
                                    <td>{customer.createdAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}