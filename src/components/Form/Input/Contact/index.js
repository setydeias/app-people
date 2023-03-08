import React from "react";

const InputContact = (props) => {
  return(
    <div className="form-floating">
      <input 
        type="text" 
        className="form-control"
        id="floatingTexContact" 
        name="contact"
        defaultValue={ props.contactPerson.contact }
        onChange={ props.handleChange }
      />
      <label htmlFor="floatingTextarea">Contato</label>
    </div>
  );
} 

export default InputContact;