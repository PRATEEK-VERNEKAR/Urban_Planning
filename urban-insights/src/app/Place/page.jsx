"use client"

import Image from 'next/image'
import Slide from './Slide';

export default function Place(){
    const data = {param1:"param1",param2:"param2",param3:"param3",param4:"param4"};
    const arr = [{src:'/1.png',value:'Andhra Pradesh',width:'256',height:'256'},{src:'/2.png',value:'Arunachal Pradesh',width:'256',height:'256'},{src:'/3.png',value:'Assam',width:'256',height:'256'},{src:'/4.png',value:'Bihar',width:'256',height:'256'}]
    
    return (
        <div className='place flex flex-col mx-auto w-[346px] h-[386px]'>
            <Slide data={arr} />
            <div>

            </div>
        </div>
    )
}