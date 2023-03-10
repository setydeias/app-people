import React, { useContext } from "react";
import { setMaskTelefone } from "../../../../utilities/Masks";
import { PersonContext } from "../../../../Contexts/Person/PersonContext";

const InputContact = (props) => {

  const { formStatus } = useContext(PersonContext);

  return(
    <div className="form-floating">
      <input 
        type="text" 
        className={ formStatus.contact.validate }
        id="floatingTexContact" 
        name="contact"
        value={ props.contactPerson.id_contact_type == 1 ? setMaskTelefone(props.contactPerson.contact) :  props.contactPerson.contact }
        onChange={ props.handleChange }
        maxLength={ props.contactPerson.id_contact_type == 1 ? 15 : 80 }
      />
      <div className="invalid-feedback">
        { formStatus.contact.erro  } 
      </div>
      <label htmlFor="floatingTextarea">Contato</label>
    </div>
  );
} 

export default InputContact;