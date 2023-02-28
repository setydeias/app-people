import React from "react";

const InfoToast = ({ data }) => {

  return(
    <div id='liveToast' className="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <i className={ data.icon } aria-hidden="true" style={{ "marginRight": ".3em" }}></i>
        <strong className="me-auto">{ data.title }</strong>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div className="toast-body">
        { data.text }
      </div>
    </div>
  );
}

export default InfoToast;