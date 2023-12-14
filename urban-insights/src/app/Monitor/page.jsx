import Image from 'next/image'
import ImageBox from './ImageBox'
import 'animate.css'

export default function Monitor(){
    const arr = [{src:'/1.png',value:'Andhra Pradesh',width:'256',height:'256'},{src:'/2.png',value:'Arunachal Pradesh',width:'256',height:'256'}]
    return (
        <div className='flex flex-col  monitor justify-center mx-auto'>
            <div>
                Monitor
            </div>
            <div className='flex flex-row gap-x-3 flex-wrap justify-evenly' >
                {arr.map((element)=>{
                    return <ImageBox {...element} />
                })}          
            </div>
        </div>
    )
}