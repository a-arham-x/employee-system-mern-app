import React, { useState } from 'react'
import "./static/form.css"

function Form(props) {
    const [info, setInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    })
    const handleChange = (e)=>{
        setInfo({...info, [e.target.name]: e.target.value});
    }
    const clear_all = ()=>{
        setInfo({
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        })
    }
    const host = "http://localhost:5000"
    const add_employee = async (e)=>{
        const url = `${host}/employees/add`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        const json = await response.json();
        if (json.success){
            e.preventDefault();
            props.getEmployees();
        }else{
            window.alert(json.message);
        }
    }
  return (
    <div className="form_div">
        <div className="upper_div">
            <p>New Employee</p>
        </div>
        <form>
            <div className="labels_div">
                <label htmlFor="first_name">First Name <span style={{visibility: info.first_name.length>0?"hidden":"visible"}}>*</span></label>
                <label htmlFor="last_name">Last Name <span style={{visibility: info.last_name.length>0?"hidden":"visible"}}>*</span></label>
                <label htmlFor="email">Email <span style={{visibility: info.email.length>0?"hidden":"visible"}}>*</span></label>
                <label htmlFor="phone">Phone <span style={{visibility: info.phone.length>0?"hidden":"visible"}}>*</span></label>
            </div>
            <div className="inputs_div">
                <input type="text" name="first_name" value={info.first_name} onChange={handleChange}/>
                <input type="text" name="last_name" value={info.last_name} onChange={handleChange}/>
                <input type="text" name="email" value={info.email} onChange={handleChange}/>
                <input type="text" name="phone" value={info.phone}  onChange={handleChange}/>
            </div>
        </form>
        <div className="buttons_div">
            <button className="clear_all" onClick={clear_all}>CLEAR ALL</button>
            <button className="add" onClick={add_employee}>Add</button>
        </div>
    </div>
  )
}

export default Form