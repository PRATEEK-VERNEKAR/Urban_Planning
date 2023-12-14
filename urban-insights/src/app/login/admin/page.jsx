"use client"
import Image from 'next/image'
import 'animate.css'

export default function Admin(){
    return (<div className="flex flex-row w-full gap-x-12 justify-center">
        <button className="block btn-nav flex flex-row justify-between items-center gap-x-2 animate__animated animate__fadeInRight">
        <Image
      src="/add.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block'
    /><div>User</div>
        </button>
        <button className="block btn-nav flex flex-row justify-between items-center gap-x-2 animate__animated animate__fadeInLeft">
            <Image
        src="/add.svg"
        width={24}
        height={24}
        alt="Picture of the author"
        className='block'
        />
            New place
        </button>
    </div>)
}