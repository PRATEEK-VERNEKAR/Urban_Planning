import Image from 'next/image'
import 'animate.css'

export default function Footer() {
  return (
    <footer>
      <div className="r-btn bg-[#01060D] mx-auto animate__animated animate__fadeInUp">
        <div className='link-share p-2 box-border'>
          <a href="#"><Image src="/github.svg" alt="me" width="24" height="24" /></a>
        </div>
        <div className='link-share p-2 box-border'>
          <a href="#"><Image src="/linkedin.svg" alt="me" width="24" height="24" /></a>
        </div>
        <div className='link-share p-2 box-border'>
          <a href="#"><Image src="/instagram.svg" alt="me" width="24" height="24" /></a>
        </div>
      </div>
    </footer>
  )
}
