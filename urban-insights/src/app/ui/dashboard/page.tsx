import Image from 'next/image'
import HardCoded from './hardcoded/page'
import RealTime from './realtime/page'


export default function Home() {
  return (
    <div className='flex justify-between w-full h-full '>
      <div className='w-[46%] my-3 bg-yellow-200'>
        <HardCoded/>
      </div>
      <div className='w-[46%] my-3 bg-yellow-200'>
        <RealTime/>
      </div>
    </div>
  )
}
