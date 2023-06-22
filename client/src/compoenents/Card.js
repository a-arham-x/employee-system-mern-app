import React from 'react'
import "./static/card.css"

function Card(props) {
    const host = "http://localhost:5000"
    const deleteEmployee = async (e) => {
        const url = `${host}/employees/delete`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({id: props.employee._id})
        })
        const json = await response.json();
        console.log(json);
        if (json.success){
            e.preventDefault();
            props.getEmployees();
        }else{
            window.alert("Database Error")
        }
    }
  return (
    <div className="card">
        <div>
            <p className="card_name">{props.employee.first_name} {props.employee.last_name}</p>
            <p className="card_text">{props.employee.email}</p>
            <p className="card_text">{props.employee.phone}</p>
        </div>
        <button className="x" onClick={deleteEmployee}>X</button>
    </div>
  )
}

export default Card