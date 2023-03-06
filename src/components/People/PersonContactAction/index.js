import React, { useEffect, useState, useContext } from "react";
import { PersonContext } from "../../../Contexts/Person/PersonContext";
import MyCheck from "../../Form/Check";
import InputContact from "../../Form/Input/Contact";
import SelectTypeContact from "../../Form/Select/TypeContact";

const PersonContactAction = (props) => { 

  return(
    <div className='row'>
      <div className="col-md-4">
        <label></label>
        <SelectTypeContact 
          actionType={ props.actionType }
          action={ props.action }
          contactTypeList={ props.contactTypeList }
          contact={ props.contact } 
        />
      </div>
      <div className="col-md-8">      
        <MyCheck 
				data={
          { 
            id: 'contactIsPrincipal',
            value: 1,
            labelText: 'Principal'
				  }
				}
			  />
        <MyCheck 
				data={
          { 
            id: 'contactIsWhatsApp',
            value: 0,
            labelText: 'WhatsApp'
				  }
				}
			  /><span><i className="fab fa-whatsapp" style={{"color":"green", "marginLeft": "-0.6em"}}></i></span>
        <InputContact
          actionType={ props.actionType }
          handleChange={props.handleChange }
          contactPerson={ props.contactPerson }
        />
      </div>      
    </div>
  );
} 

export default PersonContactAction;