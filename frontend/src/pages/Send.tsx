import React, {useState} from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import {Heading} from "../components/heading"


export const SendMoney = () => {

    const [queryParams] = useSearchParams();
    const [amount, setAmount] = useState(0);
    const [loading, setloading] = useState(true);
    
    const name = queryParams.get("name");
    const id = queryParams.get("id");


    async function backendtransfer() {

        setloading(false);
        try {

            const res = await axios({
                url: "http://localhost:3000/api/v1/account/transfer",
                method: "POST",
                data: {
                    to: id, 
                    amount: amount 
                },
                headers: {
                    Authorization: localStorage.getItem("access_token")
                }
            })
            
        
            alert(res.data.msg);

        }   
        catch(err) {
            alert(err.response.data.msg);
        }

        setloading(true);

    }


    return <div className="bg-orange-100 pt-16 h-screen">    
        
        <div className="flex justify-center">
            <div className="rounded-lg shadow-2xl bg-white p-4 text-center h-max px-12 size-96">
                <Heading label={"Send Money"}></Heading>

                <div className="grid grid-cols-12 mt-10">
                    <div className="col-span-3">
                        <div className='rounded-full size-12 bg-gray-500 text-center text-3xl p-1 '>
                            {name==null? "USER" : name[0].toUpperCase()}
                        </div>
                   
                    </div>
                    <div className="col-span-9 text-left text-2xl font-medium p-1 ">{name}</div>
                </div> 

                <div className="mt-5">
                    <div>
                        <div className="font-bold text-left py-2 font-medium">
                            Amount (in Rs)
                        </div>
                        <div>
                            <input onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setAmount(val);
                            }} className="rounded border border-gray-400 px-2 py-1 w-full" type="number" placeholder="Amount"/>
                        </div>
                    </div>
                </div>


                <button onClick={backendtransfer} className="bg-green-500 rounded w-full mt-5 h-10 mb-5 hover:bg-green-600">
                    {loading == false ? <div className="flex justify-center">
                        <div className=" w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div> 
                        <div>Loading...</div>
                    </div>
                    
                    : "Initiate Transfer"}
                </button>
                
            </div>
        </div>
   
    </div>    


}