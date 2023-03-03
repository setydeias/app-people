import React from "react";

const SelectTypeContact = (props) => {

  console.log(props.conatct)

  return(    
    <div className="form-floating">
      <select 
        className="form-select" 
        id="select-type-contact"
        name="select-type-contact"
        value={ props.action === 'edit' ? props.conatct.id_contact_type : '' }
        aria-label="Default select example"
      >        
        {
          props.contactTypeList.map((contactType) => 
            <option value={ contactType.id_contact_type }>
              { contactType.description }
            </option>
          )
        }       
      </select>
      <label for="floatingSelect">Tipo</label>
    </div>      
  );
}

export default SelectTypeContact;