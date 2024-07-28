import React from "react"
import {Link} from 'react-router-dom'

export function Bottomwarning({warning, buttontext, to}){ 

    return <div className="flex justify-center p-3">
        <div>{warning}</div>
        <Link className="pointer underline pl-4 cursor-pointer " to={to}>
            {buttontext}
        </Link>
    </div>
}