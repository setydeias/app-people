import React from "react";

const SelectTypeContact = (props) => {
  return(    
    <div className="form-floating">
      <select 
        className="form-select" 
        id="select-type-contact"
        name="id_contact_type"
        aria-label="Default select example"
        value={ props.contactPerson.id_contact_type }
        onChange={ props.handleChangeContactType }
      >        
        {
          props.contactTypeList.map((contactType, index) => 
            <option value={ contactType.id_contact_type } key={ index++ }>
              { contactType.description }
            </option>
          )
        }       
      </select>
      <label htmlFor="floatingSelect">Tipo</label>
    </div>      
  );
}

export default SelectTypeContact;