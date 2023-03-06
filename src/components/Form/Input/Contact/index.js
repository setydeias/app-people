import React from "react";

const InputContact = (props) => {
  return(
    <div className="form-floating">
      <input 
        type="text" 
        className="form-control"
        id="floatingTexContact" 
        name="contact"
        value={ props.contactPerson.contact }
        onChange={ props.handleChange }
      />
      <label for="floatingTextarea">Contato</label>
    </div>
  );
} 

export default InputContact;