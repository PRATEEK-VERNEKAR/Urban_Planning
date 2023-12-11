import Image from 'next/image'


export default function Home() {
  return (

      <div className='bg-transparent' >
        <a 
        href='/ui/dashboard'
        className='sh-btn overpass txt-16 font-bold text-[#D8D8D8] w-24 h-24 flex justify-center items-center rounded-full bg-[#44C1E2] bg-opacity-75 animate__animated animate__zoomIn'>
          Explore
        </a>        
      </div>
  )
}