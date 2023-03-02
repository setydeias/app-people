import React from "react";

const MyCheck = (props) => {
  return(
    <div className="mb-3 form-check">
      <input 
        type="checkbox" 
        className="form-check-input" 
        id={ props.id } 
        value={ props.value }
        onChange={ () => {} }
      />
      <label className="form-check-label">{ props.labelText }</label>
  </div>
  );
}