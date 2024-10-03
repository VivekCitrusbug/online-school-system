import React,{useState} from "react";

export const Footer=({item})=>{
    return (
        <footer className='footer'>
Number Of Item : {item.length}
        </footer>
    )
}