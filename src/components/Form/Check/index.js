import React from "react";

const MyCheck = (props) => {
  return(
    <span style={{"marginRight": "0.8em"}}>
      <input 
        type="checkbox" 
        className="form-check-input" 
        id={ props.data.id }
        name={ props.data.name} 
        defaultChecked={ props.data.checked === 0 ? false : true }
        onChange={ props.data.action }
        style={{"marginRight": "0.3em"}}
      />
      <label className="form-check-label">{ props.data.labelText }</label>
    </span>
  );
}

export default MyCheck;