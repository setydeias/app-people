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