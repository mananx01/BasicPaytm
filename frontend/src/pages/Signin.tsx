import React, { Suspense } from "react"
import axios from "axios"

import {useState} from "react"
import {Heading} from "../components/heading"
import { Subheading } from "../components/subheading"
import { Inputbox } from "../components/inputbox"
import {Button} from "../components/button"
import {Bottomwarning} from "../components/bottomwarning"
import { useNavigate } from "react-router-dom"


export const Signin = (props: any) => {

    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    
    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    async function backendcall() {

        try {
            
            const res = await axios({
                url: "http://localhost:3000/api/v1/user/signin",
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('access_token')
                },
                data: {
                    username,
                    password,
                }
            })

           
            alert(res.data.msg);

            if(res.data) {
                if(res.data.name && res.data.id) {
                    navigate("/dashboard?name="+ res.data.name + "&id=" + res.data.id);
                }
            }
            
        }
        catch(err) {
            alert(err.response.data.msg);
        }

    }


    return <div className="bg-orange-100 pt-16 h-screen justify-center">       
    <div className="flex justify-center">
        
        <div className="rounded-lg shadow-2xl bg-white p-2 text-center h-max px-4">
            <Heading label={"Sign-in"}/>
            <Subheading text={"Enter your credentials to sign in"}/>
            
            <Inputbox onChangeHandler={(e) => {
                setUsername(e.target.value)
            }} label={"Username"} placeholder={"mananx07"}></Inputbox>
            
            <Inputbox onChangeHandler={(e) => {
                setpassword(e.target.value);
            }} label={"Password"} placeholder={"123456"}></Inputbox>
            
            <div className="pt-4">
                <Button onClickHandler={backendcall} label={"Sign in"}></Button>
            </div>
            <Bottomwarning warning={"Dont have an account?"} buttontext={"Sign-up"} to={"/signup"}/>
        </div>
    </div>
   
</div>    


}