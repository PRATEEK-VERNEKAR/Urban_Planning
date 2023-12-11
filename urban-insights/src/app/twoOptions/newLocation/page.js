import Image from 'next/image'

export default function NewLocation(){
    return(
        <div>
            <div className="flex flex-col nform animate__animated animate__zoomIn">
                <div className="nform-header">write something</div>
                <div className='flex flex-row'>
                    <label htmlFor='name'>
                    <Image
      src="/location.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block animate__animated'
    />
                    </label>
                    <input id='name' name='name' className='block bg-transparent outline-none' ></input>
                </div>
                <div className='flex flex-row '>
                    <label htmlFor='state' className='block'><Image
      src="/location.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block animate__animated'
    /></label>
                    <input id='state' name='state' className='block bg-transparent outline-none' ></input>
                </div>
                <div className='flex flex-row'>
                    <label htmlFor='neighbor' className='block'>Neighbor</label>
                    <input id='neighbor' name='neighbor' className='block bg-transparent outline-none' ></input>
                </div>
                <div className='flex flex-row'>
                    <label htmlFor='area' className='block'>Area</label>
                    <input id='area' name='area' className='block bg-transparent outline-none' ></input>
                </div>
                <div className='flex flex-row'>
                    <label htmlFor='borderLength'>Border Length</label>
                    <input id='borderLength' name='borderLenght' className='block bg-transparent outline-none'></input>
                </div>
                <button className='nform-send justify-center flex flex-row mx-auto'>
                    <Image
      src="/add.svg"
      width={24}
      height={24}
      alt="Picture of the author"
      className='block animate__animated'
    />
                    <div>Add</div>

                </button>
            </div>
        </div>
    )
}