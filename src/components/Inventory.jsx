import { useEffect, useState } from "react";


export default function Inventory(){

  const [inventory, setInventory] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/inventory")
    .then((response)=> response.json())
    .then((data)=> setInventory(data))
  },[])

    return(
        <section className="inventory fg-black">
            <h1>Inventory</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Item_Id</th>
                            <th>Item_Name</th>
                            <th>Category</th>
                            <th>Item_Quantity</th>
                            <th>Item_Price(Ksh)</th>
                        </tr>
                    </thead>
                    <tbody>
                            {inventory.map((item)=>{
                          
                                return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.category}</td>
                                    <td>{item.itemQuantity}</td>
                                    <td>Ksh {item.itemPrice.toLocaleString()}</td>
                                </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
            
        </section>
    )
}