import React,{useState,useRef} from "react";

export const Additem=({addNewItem})=>{
const [inputtext,setInputtext]=useState('');
const inputref=useRef(null);

const onInputChange=(evt)=>{
setInputtext(evt.target.value);
}
const onSubmitForm=(evt)=>{
evt.preventDefault();
addNewItem(inputtext);
setInputtext('')
}

return(
<div className="addnewitem">
    <form onSubmit={onSubmitForm}>
    <input type="text" value={inputtext} onChange={onInputChange} placeholder="Add item here" autoFocus ref={inputref}/>
    <button type="submit" role="submit" onClick={()=>inputref.current.focus()}>Add</button>
    </form>
</div>
)

}