import Image from 'next/image'
import ImageBox from './ImageBox'
import 'animate.css'

export default function Monitor(){
    const arr = [{src:'/1.png',value:'Andhra Pradesh',width:'256',height:'256'},{src:'/2.png',value:'Arunachal Pradesh',width:'256',height:'256'}]
    return (
        <div className='flex flex-col monitor mx-auto sm:w-[256px] md:w-[486px] lg:w-[786px] h-[386px]'>
            <h2 className='monitor-header'>
                Monitor
            </h2>
            <div className='flex flex-row gap-x-4 w-full h-full monitor-container flex-wrap'>
                {arr.map((element,key)=>{
                    return <ImageBox key={key} {...element} />
                })}          
            </div>
        </div>
    )
}