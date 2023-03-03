import React from "react";

const SelectTypeContact = (props) => {
  return(    
    <div className="form-floating">
      <select 
        className="form-select" 
        id="select-type-contact"
        name="select-type-contact"
        aria-label="Default select example"
      >
        <option value=""></option>
        <option value="1">Telefone</option>
        <option value="2">E-mail</option>
        <option value="3">Facebook</option>
        <option value="4">Instagran</option>
        <option value="5">Página</option>
      </select>
      <label for="floatingSelect">Tipo</label>
    </div>      
  );
}

export default SelectTypeContact;