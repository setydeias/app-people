import React from "react";

const ModalConfirm = ({ modalConfirmData, action }) => {
  return(
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{modalConfirmData.title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            { modalConfirmData.text }<b>{ modalConfirmData.emphasis }</b> ?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
            <button type="button" className="btn btn-primary" onClick={ action }>Sim</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;