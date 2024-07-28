import React from 'react'
import { Popover } from './popover'

export function Appbar(props:any) {

    return(
        <div className="grid grid-cols-12 shadow border text-black">
           
            <div className="col-span-10 p-4 font-bold text-xl">Paytm App</div>          
            <div className="col-span-1 text-base">
                <div className="bg-purple-300 px-3 py-3 rounded-lg text-purple-800 h-12 mt-2">{props.name}</div>
            </div>

            
            <div className='col-span-1 flex justify-center rounded-full bg-purple-300 mx-5 hover:bg-purple-500'>
                <Popover id={props.id} name={props.name}/>
            </div>
        
        </div>
    )


} 

