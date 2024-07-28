import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import {useState} from "react"
import {Users} from "../components/users"
import { Appbar } from "../components/Appbar"


var timeoutID;
export const Dashboard = () => {

    const [filter, setfilter] = useState("");
    const [users, setusers] = useState([]);
    const [balance, setbalance] = useState(0);

    const [queryParams] = useSearchParams();
    
    const id = queryParams.get("id"); 
    const name = queryParams.get("name");
    const token = localStorage.getItem("access_token");


    useEffect(()=> {

        try {
            axios({
                url: "http://localhost:3000/api/v1/account/balance",
                method: "GET",
                headers: {
                    Authorization: token
                }
            })
            .then((res)=> {
                console.log("here");
                setbalance(res.data.balance);
            })
        }
        catch(err) {
            console.log("error12: " + err);
            alert("Error");
        }
        

    },[])

 
    function callbackend() {
        
        try {

            axios({
                url: `http://localhost:3000/api/v1/user/filterusers?filter=${filter}`,
                method: "GET",
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setusers(res.data.filteredusers);
            })

        }
        catch(err) {
            alert(err.response.data.msg);
        }

    }


    useEffect(function(){

        clearTimeout(timeoutID);
        timeoutID = setTimeout(()=> { 
            callbackend();
        },200)
        
    },[filter])



    return <div className="bg-orange-100">    
        
        <Appbar name={name} id={id}></Appbar>
        
        <div className="h-full">
            <div className="p-6 text-lg font-medium bg-orange-300">Your balance Rs {balance}</div>
            
            <div className="p-6">
                
                <div className="font-medium text-lg">Users</div>
                <div className="pl-3 p-3">
                    <input onChange={e => {   
                        setfilter(e.target.value)
                    }} type="text" placeholder="Search Users..." className="rounded p-1 w-full border border-slate-300 border-2"/>
                </div>


                {
                    (users).map((user) => <Users curruser={user}/>)
                }

                
    
            </div>
        </div>
    </div>    

}

