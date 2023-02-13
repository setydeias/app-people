import React from "react";

const Dashboard = () => {

  return(
    <div className='container-sm'>
      <h4 className='title-page'>Cadastro único</h4>
      <nav>
        <div className="nav nav-tabs d-flex justify-content-start" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fas fa-user"></i> Dados Pessoal</button>
          <button className="nav-link" id="nav-api-tab" data-bs-toggle="tab" data-bs-target="#nav-api" type="button" role="tab" aria-controls="nav-api" aria-selected="false"><i class="fas fa-id-card"></i> Nível da conta</button>
        </div>
     </nav>
     <form className='row' onSubmit={ ()=>{} }> 

     </form>
    </div>
  );

}

export default Dashboard;