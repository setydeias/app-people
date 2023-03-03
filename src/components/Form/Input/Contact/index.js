import React from "react";

const InputContact = (props) => {
  return(
    <div className="form-floating">
      <input 
        type="text" 
        className="form-control"
        value={ props.contact.contact } 
        id="floatingTexContact">
      </input>
      <label for="floatingTextarea">Contato</label>
    </div>
  );
} 

export default InputContact;