import React, {useEffect, useState} from 'react'
import "./static/bottom.css"
import Card from './Card';

function Bottom(props) {
    const employees = props.employees;
  return (
    <div className="bottom_div">
        <p>Current Employees</p>
        {employees && employees.map((employee)=>{
            return <Card key={employee._id} employee={employee} getEmployees={props.getEmployees}/>
        })}
    </div>
  )
}

export default Bottom