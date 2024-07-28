import React from "react"

export function Inputbox({label, placeholder, onChangeHandler}){ 

    return <div>
        <div className="font-bold text-left py-2 font-medium">
            {label}
        </div>
        <div>
            <input onChange={onChangeHandler} className="rounded border border-gray-400 px-2 py-1 w-full" type="text" placeholder={placeholder}/>
        </div>
    </div>

}