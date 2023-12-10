import Image from 'next/image'

export default function Header() {
  return (
    <header className="fixed px-32 w-full h-80 bg-[#01060D] text-white animate__animated animate__fadeInDown">
      <div className="flex flex-col">
        <h1 className="montserrat h-property text-[#F7F7F7]">Urban Insights</h1>
        <p className="overpass text-[#F5F5F5]">Explore the universe with our amazing satellite-themed website!</p>
      </div>
    </header>
  )
}
