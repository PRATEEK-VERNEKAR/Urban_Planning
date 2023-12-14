
import Image from 'next/image'

export default function Header() {
  return (
    <header className="fixed px-32 w-full h-80 bg-[#323643] text-white animate__animated animate__fadeInDown">
      <div className="flex flex-col">
        <h1 className="roboto h-property">Urban Insights</h1>
        <p className="sans-serif">Explore the universe with our amazing satellite-themed website!</p>
      </div>
    </header>
  )
}
