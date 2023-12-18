"use client";


import Image from 'next/image'
import { useState,useCallback } from 'react'
import Recomdation from './Recomdation'

export default function NewLocation(){
    const states = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar"]
    const neighbors = ["Nepal","Bhutan","Bangladesh","Myanmar","Sri Lanka"];
    const [name,setName] = useState("")
    const [neighborArray,setNeighborArray] = useState([])
    const [area,setArea] = useState("")
    const [length,setLength] = useState("")
    const [stateArray,setStateArray] = useState([])
    const changeStateArray = useCallback((e)=>{
        let value = e.target.alt;  
        let index = stateArray.indexOf(value)
        stateArray.splice(index,1);
        setStateArray([...stateArray]);        
    },[stateArray])

    const changeNeighborArray = useCallback((e)=>{
        let value = e.target.alt;  
        let index = neighborArray.indexOf(value)
        neighborArray.splice(index,1);
        setNeighborArray([...neighborArray]);        
    },[neighborArray])

    return(
        <div>
            <div className="flex flex-col nform animate__animated animate__zoomIn">
                <div className="nform-header">Add Location</div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' name='name' value={name} autoComplete='off' onChange={(event)=>{setName(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <Recomdation name="State" suggestion={states} changeArray={changeStateArray} Array={stateArray} setArray={setStateArray} />
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <Recomdation name="Neighbor" suggestion={neighbors} changeArray={changeNeighborArray} Array={neighborArray} setArray={setNeighborArray} />
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='area' className='block'>Area</label>
                    <input id='area' name='area' value={area} autoComplete='off' onChange={(event)=>{setArea(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='borderLength'>Length(km)</label>
                    <input id='borderLength' name='borderLenght' value={length} autoComplete='off'  onChange={(event)=>{setLength(event.target.value)}} className='block bg-transparent outline-none w-full' />
                </div>
                <a href="/twoOptions"className='nform-send justify-center items-center flex flex-row mx-auto gap-x-2'>
                    <Image
      src="/add.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block animate__animated'
    />
                    <div>Add</div>

                </a>
            </div>
        </div>
    )
}