import React from "react"
import { useNavigate } from "react-router-dom"

export function Users({curruser}) {

    const navigate = useNavigate();

    console.log(curruser.firstname);

    return (    
        <>
            <div className="grid grid-cols-12">

                <div className="col-span-1 p-2">
                    <div className="size-12 rounded-full bg-gray-500 text-center text-3xl pt-1">{(curruser.firstname)[0].toUpperCase()}</div>
                </div> 
                <div className="col-span-9 p-2">
                    <div className="mt-2">{curruser.firstname + " " + curruser.lastname}</div>
                </div>
                <div className="col-span-2 p-2">
                    <button onClick={()=>{
                        navigate("/send?id=" + curruser.userid + "&name=" + curruser.firstname + " " + curruser.lastname);
                    }} className="ml-10 bg-black rounded-lg text-white h-full p-3 text-sm font-medium hover:bg-rose-950">Send Money</button>
                </div>

            </div>
                
            <hr className="border-gray-300"/>
        
        </>
        
    )

}