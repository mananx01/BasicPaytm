import React from "react"

export function Button({label, onClickHandler}){ 

    return <div className="p-1">
        <button onClick={onClickHandler} className="rounded-md bg-gray-900 hover:bg-green-700 text-white p-2 w-full"> 
            {label}
        </button>
    </div>

}