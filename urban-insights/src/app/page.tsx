import Image from 'next/image'


export default function Home() {
  return (
      <div className='bg-transparent flex flex-row items-center justify-center' >
        <a href='#' className='explore flex flex-row items-center gap-x-3'><div>Explore</div> 
        <Image
      src="/right-arrow.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block animate__animated'
    />
        </a>      </div>
  )
}