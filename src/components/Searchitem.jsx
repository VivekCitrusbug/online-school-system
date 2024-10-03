import React,{useState} from "react";

export const Searchitem=({search,setSearch})=>{
    
    const onSearchChange=(evt)=>{
        setSearch(evt.target.value);
    }


    return(
<div className="searchbox">
    <input type="text" onChange={onSearchChange} value={search} placeholder="search item here"></input>
</div>
    )
}