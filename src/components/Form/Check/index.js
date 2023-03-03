import React from "react";

const MyCheck = (props) => {
  return(
    <span style={{"marginRight": "0.8em"}}>
      <input 
        type="checkbox" 
        className="form-check-input" 
        id={ props.data.id } 
        value={ props.data.value }
        onChange={ () => {} }
        style={{"marginRight": "0.3em"}}
      />
      <label className="form-check-label">{ props.data.labelText }</label>
    </span>
  );
}

export default MyCheck;