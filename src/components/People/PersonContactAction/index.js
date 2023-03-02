import React, { useState } from "react";
import InputContact from "../../Form/Input/Contact";
import SelectTypeContact from "../../Form/Select/TypeContact";

const PersonContactAction = (props) => {

  return(
    <div className='row'>
      <SelectTypeContact contact={ props.contact } />
      <InputContact contact={ props.contact } />
    </div>
  );
} 

export default PersonContactAction;