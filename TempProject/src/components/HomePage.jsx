import React from "react";
import { useNavigate } from 'react-router-dom';
import AllAccounts from "./AllAccounts";
 function HomePage() {   
    const navigate = useNavigate(); 
    return (            
        <div>
            <h1>Home Page</h1>
            <div style={{display:'flex',justifyContent:'space-around',}}>
            <button style={{ marginLeft: "10px",backgroundColor:"#007bff",color:"white" }}onClick={() => navigate('/register')}>Register</button>
            <button style={{ marginLeft: "10px",backgroundColor:"#007bff",color:"white" }} onClick={() => navigate('/login')}>Login</button></div>
            <AllAccounts/>
        </div>
    )
}
export default HomePage