import React, { useState } from "react"
import axios from "axios"
import {Heading} from "../components/heading"
import { Subheading } from "../components/subheading"
import { Inputbox } from "../components/inputbox"
import {Button} from "../components/button"
import {Bottomwarning} from "../components/bottomwarning"


export const Signup = (props: any) => {

    const [username, setusername] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [password, setpassword] = useState("");


    async function sendtobackend() {

        try {

            const res = await axios({
                url: "http://localhost:3000/api/v1/user/signup",
                method: "POST",
                data: {
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                }
            })
        
            alert(res.data.msg);
            console.log(res.data.msg);  
             
            localStorage.setItem('access_token', "Bearer " + res.data.token);

        }
        catch(err){
            alert(err.response.data.msg);
        }
        
    }


    return <div className="bg-orange-100 pt-16 h-screen justify-center">    
        
        <div className="flex justify-center">
            
            <div className="rounded-lg shadow-2xl bg-white p-2 text-center h-max px-4">
                <Heading label={"Sign-up"}/>
                <Subheading text={"Enter your information to create an account "}/>
                
                <Inputbox onChangeHandler={(e) => {
                    setusername(e.target.value);
                }} label={"Username"} placeholder={"mananx07"}></Inputbox>


                <Inputbox onChangeHandler={(e) => {
                    setfirstname(e.target.value);
                }} label={"First Name"} placeholder={"John"}></Inputbox>


                <Inputbox onChangeHandler={(e) => {
                    setlastname(e.target.value);
                }}  label={"Last Name"} placeholder={"Doe"}></Inputbox>


                <Inputbox onChangeHandler={(e) => {
                    setpassword(e.target.value);
                }} label={"Password"} placeholder={"123456"}></Inputbox>



                <div className="pt-4">
                    <Button onClickHandler={sendtobackend} label={"Sign up"}></Button>
                </div>
                <Bottomwarning warning={"Already have an account?"} buttontext={"Sign-in"} to={"/signin"}/>
            </div>

        </div>
       
    </div>    


}