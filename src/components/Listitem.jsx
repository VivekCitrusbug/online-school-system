import React,{useState} from "react";
export const Listitem=({item,onCheckChange ,onDelete})=>{
    return(
        <li key={item.id}>
            <input type="checkbox" checked={item.checked} onChange={()=>onCheckChange(item.id)} />
            <label style={{ 
  textDecoration: item.checked ? 'line-through' : 'none', 
  textAlign: 'center' 
}}>{item.item}</label>
            <button  role="delete" onClick={()=>onDelete(item.id)}>Delete</button>
        </li>
    )
}