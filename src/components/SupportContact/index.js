import React from "react"

const SupporContatc = ({ text, supportContact }) => {
  return(
    <div className="alert alert-danger" role="alert" style={{"marginTop": "0.5em"}}>
      { text }{ supportContact ? <a href="https://setydeias.com.br/#rodape" className="alert-link">SetYdeias</a>: '' }
    </div>
  )
}

export default SupporContatc;