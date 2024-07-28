import React, { useState,useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Heading } from "../components/heading";
import { Button } from "../components/button";
import axios from "axios"


export function Profile() {

    const [queryParams] = useSearchParams();
    const id = queryParams.get("id");
    const name = queryParams.get("name");

    const [userdata,setuserdata] = useState({
        bankaccountid: "",
        firstname: "",
        lastname: "",
        balance: 0,
    });
    
    useEffect(()=> {

        try{
            axios({
                url: "http://localhost:3000/api/v1/user/getuserdata",
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("access_token")
                }
            })
            .then(res => {
                
                if(res.data.firstname)
                    setuserdata(res.data);
            
            })
        }
        catch(err){ 
            alert(err.response.data);
        }
        

    },[])


    console.log(name);

    return  <div className="bg-orange-100 pt-16 h-screen">    
        
    <div className="flex justify-center">
        <div className="rounded-lg shadow-2xl bg-white p-4 text-center h-max px-12 size-96">
            <Heading label={"Profile"}></Heading>

            <div className="grid grid-cols-12 mt-10">
                <div className="col-span-3">
                    <div className='rounded-full size-12 bg-green-500 text-center text-3xl p-1 '>
                        {name==null? "USER" : name[0].toUpperCase()}
                    </div>
               
                </div>
                <div className="col-span-9 text-left text-2xl font-medium p-1 ">{name}</div>
            </div> 

            <div className="mt-5">
                
                <div className="font-bold text-left py-2 font-medium  grid grid-cols-12">
                    <div className="col-span-4 text-left">Balance (Rs): </div>
                    <div className="col-span-8 text-green-600 text-right">{userdata.balance}</div>
                </div>
                <hr className="mt-2 mb-2 border border-red-500"/>
                <div className="grid grid-cols-12 font-medium">
                    <div className="col-span-4 text-left">AC.  </div>
                    <div className="col-span-8 text-right">{userdata.bankaccountid}</div>
                </div>
                <hr className="mt-2 mb-2 border"/>
                <div className="grid grid-cols-12">
                    <div className="col-span-4 text-left">First Name  </div>
                    <div className="col-span-8 text-right">{userdata.firstname}</div>
                </div>
                <hr className="mt-2 mb-2 border "/>
                <div className="grid grid-cols-12">
                    <div className="col-span-4 text-left">Last Name  </div>
                    <div className="col-span-8 text-right">{userdata.lastname}</div>
                </div>
                <hr className="mt-2 mb-2 border"/>
            </div>

            <div>
                <Button label={"Update Profile"} onClickHandler={()=>{}}></Button>
            </div>
            
        </div>
    </div>

</div>    

}