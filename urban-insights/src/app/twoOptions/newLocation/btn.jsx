import React,{Component} from "react";
import Image from 'next/image'


export default function Btn(props){
    return (
        <div className="nform-btn flex flex-row items-center gap-x-2" >
            <div className={"font-small "}>{props.value}</div>
            <button className="block" onClick={props.changeArray}>
            <Image
      src="/close.svg"
      width={8}
      height={8}
      alt={props.value}
      className='block'
    />
            </button>
        </div>
    );

}