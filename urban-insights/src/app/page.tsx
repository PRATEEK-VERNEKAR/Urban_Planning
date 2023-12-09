import Image from 'next/image'
import Header from './ui/header/page'
import Footer from './ui/footer/page'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4">
      <Header />

      {/* Rest of your content goes here */}
      <div className='flex-grow mt-[100px] flex justify-center items-center'>
        <button className='w-36 h-36 flex justify-center items-center rounded-full bg-orange-800'>
          Explore Earth
        </button>        
      </div>
      
      <Footer/>
    </div>
  )
}
