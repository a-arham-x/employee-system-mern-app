import Navbar from "./compoenents/Navbar";
import Form from "./compoenents/Form";
import Bottom from "./compoenents/Bottom";
import "./index.css"
import {useState, useEffect} from "react"

function App() {
  const host = process.env.REACT_APP_HOST;
    const [employees, setEmployees] = useState();
    const getEmployees = async ()=>{
        const url = `${host}/employees/`;
        const response = await fetch(url)
        const json = await response.json();
        setEmployees(json);
    }
    useEffect(() => {
        getEmployees();
    }, []);

  return (
    <div className="App">
      <Navbar/>
      <Form getEmployees={getEmployees}/>
      <Bottom employees={employees} getEmployees={getEmployees}/>  
    </div>
  );
}

export default App;
