"use client";


import Image from 'next/image'
import { useState } from 'react'



export default function NewLocation(){
    const [name,setName] = useState("")
    const [state,setState] = useState("")
    const [neighbor,setNeighbor] = useState("")
    const [area,setArea] = useState("")
    const [length,setLength] = useState("")

    const updateInput = (event)=>{
        let data = send[event.target.name] + event.target.value;
        send[event.target.name] = data;
        console.log(send)
        changeSend(send)
    }

    return(
        <div>
            <div className="flex flex-col nform animate__animated animate__zoomIn">
                <div className="nform-header">Add Location</div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' name='name' value={name} onChange={(event)=>{setName(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='state' className='block'>State</label>
                    <input id='state' name='state' value={state} onChange={(event)=>{setState(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='neighbor' className='block'>Neighbor</label>
                    <input id='neighbor' name='neighbor' value={neighbor} onChange={(event)=>{setNeighbor(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='area' className='block'>Area</label>
                    <input id='area' name='area' value={area} onChange={(event)=>{setArea(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='borderLength'>Length</label>
                    <input id='borderLength' name='borderLenght' value={length} onChange={(event)=>{setLength(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <button className='nform-send justify-center items-center flex flex-row mx-auto gap-x-2'>
                    <Image
      src="/add.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block animate__animated'
    />
                    <div>Add</div>

                </button>
            </div>
        </div>
    )
}