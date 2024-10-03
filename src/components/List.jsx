import React,{useState} from "react";
import { Listitem } from "./Listitem";
export const List=({item,onCheckChange,onDelete})=>{
    return (<ul className="listcontainer">
    {item.map((x)=>(
        <Listitem item={x} key={x.id} onCheckChange={onCheckChange} onDelete={onDelete}></Listitem>
    ))}
    </ul>)
}