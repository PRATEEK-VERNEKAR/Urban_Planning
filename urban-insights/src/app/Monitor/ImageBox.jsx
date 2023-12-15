import Image from "next/image";

export default function ImageBox(props){
    return (
        <div className="imagebox">
            <Image
            src={props.src}
            width={props.width}
            height={props.height}
            alt="Picture of the author"
            className='block'
            />
            <div>
                {props.value}
            </div>
        </div>
    )
}