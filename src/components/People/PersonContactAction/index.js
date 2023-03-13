import React from "react";
import MyCheck from "../../Form/Check";
import InputContact from "../../Form/Input/Contact";
import SelectTypeContact from "../../Form/Select/TypeContact";

const PersonContactAction = (props) => { 

  return(
    <div className='row' id={ props.id }>
      <div className="col-md-4">
        <label></label>
        <SelectTypeContact 
          actionType={ props.actionType }
          action={ props.action }
          contactTypeList={ props.contactTypeList }
          contactPerson={ props.contactPerson }
          handleChangeContactType={ props.handleChangeContactType }          
        />
      </div>
      <div className="col-md-8">      
        <MyCheck 
				  data={
            { 
              id: 'cbxContactIsPrincipal',
              name: 'main',
              labelText: 'Principal',
              action: props.handleChangeContactMain,
              checked: props.contactPerson.main 
				    }
				  }
			  />
        { 
          props.contactPerson.id_contact_type == 1 ? 
            <>
              <MyCheck 
                data={
                  { 
                    id: 'cbxContactIsWhatsApp',
                    name: 'whatsapp',
                    labelText: 'WhatsApp',
                    action: props.handleChangeContactWhatsApp,
                    checked: props.contactPerson.whatsapp
                  }
                }
                action={ ()=>{} }
              /><span><i className="fab fa-whatsapp" style={{"color":"green", "marginLeft": "-0.6em"}}></i></span>
            </> : ''         
        }
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