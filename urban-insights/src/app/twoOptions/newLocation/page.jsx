"use client";


import Image from 'next/image'
import { useState,useCallback } from 'react'
import Btn from './btn'


export default function NewLocation(){
    const states = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar"]
    const [name,setName] = useState("")
    const [state,setState] = useState("")
    let [stateArray,setStateArray] = useState([])
    const [onSInput,setSInput] = useState(false)
    const [stateSuggestion,setSuggestion] = useState(states)
    const [neighbor,setNeighbor] = useState("")
    const [area,setArea] = useState("")
    const [length,setLength] = useState("")
    const changeStateArray = useCallback((e)=>{
        let value = e.target.alt;  
        stateArray.pop(value)                                                                      
        setStateArray(stateArray)
    },[stateArray])

    return(
        <div>
            <div className="flex flex-col nform animate__animated animate__zoomIn">
                <div className="nform-header">Add Location</div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' name='name' value={name} autoComplete='off' onChange={(event)=>{setName(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='state' className='block'>State</label>
                    <div className='state py-2 w-full'>
                        <div className='state-items flex flex-row flex-wrap'>
                            {stateArray.map((value)=>{
                                return (<Btn value={value} stateArray={stateArray} changeStateArray={changeStateArray} />);
                            })}
                        </div>
                        <div className='w-full'>
                            <input id='state' name='state' value={state} autoComplete='off' onChange={(event)=>{
                                setState(event.target.value) 
                                let reg = new RegExp(event.target.value)
                                
                                setSInput(true)
                                // stateSuggestion.forEach(e=>{
                                //     console.log(reg.test(e),e)
                                //     if (!reg.test(e)){
                                //         stateSuggestion.pop(e)
                                //     }
                                //     })
                                console.log(stateSuggestion)
                                
                                setSuggestion(stateSuggestion);
                                if(state === ""){
                                    setSuggestion(states);
                                }
                                }} className='block bg-transparent outline-none w-full' />
                            {onSInput && <div className='flex flex-col absolute nform-sugg'>
                                {stateSuggestion.map((value)=>{
                                    return (<div key={value} onClick={(event)=>{
                                        let val = event.target.childNodes[0].data;
                                    
                                            stateArray.push(value)
                                            setStateArray(stateArray)                                        
                                        setSInput(false)
                                        setState("")
                                    }}>{value}</div>);
                                })}
                            </div>}
                        </div>
                    </div> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='neighbor' className='block'>Neighbor</label>
                    <input id='neighbor' name='neighbor' value={neighbor} autoComplete='off' onChange={(event)=>{setNeighbor(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='area' className='block'>Area</label>
                    <input id='area' name='area' value={area} autoComplete='off' onChange={(event)=>{setArea(event.target.value)}} className='block bg-transparent outline-none w-full' /> 
                </div>
                <div className='flex flex-row nform-input gap-x-2'>
                    <label htmlFor='borderLength'>Length</label>
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