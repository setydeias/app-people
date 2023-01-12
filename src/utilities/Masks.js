export function noMask(numero) {

  let padrao = '';
  
  for (let i = 0; i < numero.length; i++) {    
    if(
      numero.charAt(i) !== '.' && 
      numero.charAt(i) !== '-' && 
      numero.charAt(i) !== '/' &&
      numero.charAt(i) !== '(' &&
      numero.charAt(i) !== ')' &&
      numero.charAt(i) !== ' '
    ) {
      padrao = padrao + numero.charAt(i);
    }      
  }
  return padrao;   
}

export function maskCPF(e) {
    
  e.currentTarget.maxLength = 14;
  let value =  e.currentTarget.value;
  value = value.replace(/\D/g, "");

  value = value.replace(/^(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1-$2");
  value = value.replace(/(\d)(\d{2})/, "$1$2");

  e.currentTarget.value = value;
  return e;
}

export function setMaskCPF(cpf) {
    
  let value =  cpf;

  value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  return value;
}

export function maskTelephone(e) {
    
  e.currentTarget.maxLength = 16;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  
  value = value.replace(/^0/, "");
  if (value.length > 10) {
    value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (value.length > 5) {
    if (value.length === 6 && value.code === "Backspace") { 
      return; 
    } 
    value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    if (value.length !== 0) {
      value = value.replace(/^(\d*)/, "($1");
    }
  }
    
  e.currentTarget.value = value;
  return e;
}