import React from "react";

const ModalConfirm = (props) => {
  return(
    <div className="modal fade"  id={ props.id } data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.modalConfirmData.title}</h1>
            <button type="button" className="btn-close" onClick={ props.action } data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            { props.children ? props.children : ` ${props.modalConfirmData.text} ${ props.modalConfirmData.emphasis } ? ` }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={ props.action } data-bs-dismiss="modal">{ props.modalConfirmData.textAction1 }</button>
            <button type="button" className="btn btn-primary"  onClick={ props.action1 } data-bs-dismiss="modal">{ props.modalConfirmData.textAction2 }</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;