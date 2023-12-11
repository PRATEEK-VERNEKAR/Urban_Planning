import Image from "next/image"

export default function TwoOptions(){
    return(
        <div className="flex flex-row w-full gap-x-12 justify-center">
            <a href="/twoOptions/newLocation" className="block btn-nav flex flex-row justify-between items-center gap-x-3 animate__animated animate__fadeInRight">
            <Image
      src="/add.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block animate__animated'
    />
                <div>New Locations</div></a>
            <a className="block btn-nav flex flex-row justify-between items-center gap-x-3 animate__animated animate__fadeInLeft">
            <Image
      src="/observe.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block animate__animated'
    />
                <div>Existing Locations</div></a>
        </div>
    )
}