"use client"

import Image from 'next/image'

export default function Place(){
    const data = {param1:"param1",param2:"param2",param3:"param3",param4:"param4"};
    const arr = [{src:'/1.png',value:'Andhra Pradesh',width:'256',height:'256'},{src:'/2.png',value:'Arunachal Pradesh',width:'256',height:'256'},{src:'/3.png',value:'Assam',width:'256',height:'256'},{src:'/4.png',value:'Bihar',width:'256',height:'256'}]
    
    return (
        <div className='place flex flex-col mx-auto sm:w-[256px] md:w-[486px] lg:w-[786px] h-[386px]'>
            <div className='flex flex-row place-container'>
                {arr.map((element,key)=>{
                    return <Image key={key} {...element} />
                })}
            </div>
            <div>

            </div>
        </div>
    )
}