import React, { useState, useEffect, useContext } from 'react';
import { setAddress } from '../../../data/address_type_variations'; 
import { 
    isValibCep, 
    totalCaracters,
  } from '../../../utilities/Utilities';
import { 
  noMask, 
  maskCep, 
  setMaskCep
} from '../../../utilities/Masks';
import { getCep } from '../../../api/Correios/Services';
import { getAdressType } from '../../../api/People';
import { PersonContext } from '../../../Contexts/Person/PersonContext';

const PersonAddress = (props) => { 

    const { formStatus, setFormStatus } = useContext(PersonContext);

    var references = {
        cep: document.getElementById('cep'),
        city: document.getElementById('city'),
        uf: document.getElementById('uf'),
        address_type: document.getElementById('address_type'),
        address: document.getElementById('address'),
        address_number: document.getElementById('address_number'),   
        total_characters: document.getElementById('total_characters'),
    }
    
    
    const [total_characters_adress, setTotalCaractersAdress] = useState(0)
    const [listAdressType, setListAdressType] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        props.setPerson({ ...props.person, [name]: value });
    };
    
    const handleChangeMaskCep = (e) => { 
        e.preventDefault();
        
        maskCep(e);
        props.setPerson({ ...props.person, [e.target.name]: e.target.value });
    }

    const handleChangeMaskUf = (e) => { 
        e.preventDefault();
    
        props.setPerson({ ...props.person, [e.target.name]: e.target.value });
    }

    useEffect(() => {

        setTotalCaractersAdress(
          parseInt(props.person.address_type.length) + 
          parseInt(props.person.address.length) +
          parseInt(props.person.address_number.length) +
          parseInt(props.person.address_complement.length) + 
          parseInt(props.person.district.length)
        ) 
    
      }, [
        props.person.address_type, 
        props.person.address, 
        props.person.address_number, 
        props.person.address_complement,
        props.person.district
    ])


    useEffect(() => {
      
      loadListAdressType();

      if (total_characters_adress > 0) {
        testAddressCaracters();
      }
    }, [total_characters_adress])
    

    const loadListAdressType = async () => {
      try {
        const result = await getAdressType();
        if (result.status === 200) {
          setListAdressType(result.data.addressTypelist);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const searchCep = async (e) => { 

        if(testCep()) {    
          
          const resp = await getCep(noMask(e.target.value)); 
          if(resp.status === 200 && !resp.data.erro) {

            const logradouro_split = resp.data.logradouro.split(' ', 1);  

            props.setPerson((prevState) => ({ ...prevState,
              ...{ 
                  city: resp.data.localidade, 
                  uf: resp.data.uf,
                  district: resp.data.bairro,
                  address: setAddress(resp.data.logradouro),
                  address_type: logradouro_split[0]
                 }
            }));         
            references.city.focus();
            validCep(resp);
          }
          
          if (resp.data.erro) {
            setFormStatus({...formStatus, 
              cep: {
                erro: 'Não encontrado!',
                validate: 'form-control is-invalid'
              }
            })
          }        
        }
    }

    const validCep = (resp) => {

      setFormStatus({...formStatus, 
        cep: {
          erro: '',
          validate: 'form-control is-valid',
        },
        city: {
          erro: '',
          validate: 'form-control is-valid',
        },
        uf: {
          erro: '',
          validate: 'form-control is-valid',
        },
        address_type: {
          erro: '',
          validate: 'form-control is-valid',
        },
        address: {
          erro: '',
          validate: 'form-control is-valid',
          complement: 'Complemento: { ' + resp.data.complemento + ' }',
          feedback: 'valid-feedback'
        },
        district: {
          erro: '',
          validate: 'form-control is-valid',
        }        
      });    

      var address_number_interval = setInterval(function() {
        references.address_number.focus();
        clearInterval(address_number_interval);
      }, 100);
    }

    const testCep = () => {

      if (props.person.cep) {   

        if (!isValibCep(props.person.cep)) {
          setFormStatus({...formStatus, 
            cep: {
              erro: 'CEP inválido!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          cep: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });      
        return true;
      } else {
        setFormStatus({...formStatus, 
          cep: {
            erro: 'Campo obrigatório!',
            validate: 'form-control is-invalid'
          }
        });
        return false;
      } 
    }

    const testAddressCaracters = () => {
            
        if (!totalCaracters(
          props.person.address_type.trim() +
          props.person.address.trim() +
          props.person.address_number.trim() +
          props.person.address_complement.trim() +
          props.person.district.trim(), 
          56      
        )) {
          setFormStatus({...formStatus, 
            address_caracters: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            address_type: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            address: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            address_number: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            address_complement: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            district: {
              erro: '',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          address_caracters: {
            erro: '',
            validate: 'form-control is-valid'
          },
          address_type: {
            erro: '',
            validate: 'form-control is-valid'
          },
          address: {
            erro: '',
            validate: 'form-control is-valid'
          },
          address_number  : {
            erro: '',
            validate: 'form-control is-valid'
          },
          address_complement: {
            erro: '',
            validate: 'form-control is-valid'
          },
          district: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testCity = () => {      

      if (props.person.city) {
        setFormStatus({...formStatus, 
          city: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
      setFormStatus({...formStatus, 
        city: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    
      const testUf = () => {
        if (!props.person.uf) {
          setFormStatus({...formStatus, 
            uf: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          uf: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testDistrict = () => {
        if (!props.person.district) {
          setFormStatus({...formStatus, 
            district: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          district: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testTypeAddress = () => {
        if (!props.person.address_type) {
          setFormStatus({...formStatus, 
            address_type: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          address_type: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testAddress = () => {
        
        if (!props.person.address) {
          setFormStatus({...formStatus, 
            address: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
    
        references.address.value = setAddress(references.address.value);
        props.setPerson({ ...props.person, address: references.address.value });
       
        setFormStatus({...formStatus, 
          address: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testNumberAddress = () => {
        if (!props.person.address_number) {
          setFormStatus({...formStatus, 
            address_number: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          address_number: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    

    return(
        <>
          <div className="row">
            <div className="col-md-2">
              <label>CEP<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.cep.validate} 
                id="cep"
                name="cep" 
                value={ setMaskCep(props.person.cep) }
                onChange={handleChangeMaskCep}
                onBlur={searchCep}
                required  
                placeholder='CEP'
              />
              <div className="invalid-feedback">
                { formStatus.cep.erro } 
              </div>
            </div> 
            <div className="col-md-2">
              <label>Cidade<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.city.validate} 
                name="city" 
                id='city'   
                value={ props.person.city  }            
                onChange={handleChange}
                onBlur={testCity}
                required  
                placeholder='Cidade'
              />
              <div className="invalid-feedback">
                { formStatus.city.erro  } 
              </div>
            </div>  
            <div className="col-md-1">
              <label>UF<span className='required_field'> *</span></label>
              <select 
                type="text" 
                className={formStatus.uf.validate}  
                name="uf" 
                id='uf'
                value={ props.person.uf }
                onChange={handleChangeMaskUf} 
                onBlur={testUf}
                required  
                placeholder='UF'
                maxLength={2}
              >
                <option value=''></option>
                <option value='AC'>AC</option>
                <option value='AL'>AL</option>
                <option value='AP'>AP</option>
                <option value='AM'>AM</option>
                <option value='BA'>BA</option>
                <option value='CE'>CE</option>
                <option value='DF'>DF</option>
                <option value='ES'>ES</option>
                <option value='GO'>GO</option>
                <option value='MA'>MA</option>
                <option value='MT'>MT</option>
                <option value='MS'>MS</option>
                <option value='MG'>MG</option>
                <option value='PA'>PA</option>
                <option value='PB'>PB</option>
                <option value='BR'>PR</option>
                <option value='PE'>PE</option>
                <option value='PI'>PI</option>
                <option value='RJ'>RJ</option>
                <option value='RN'>RN</option>
                <option value='RS'>RS</option>
                <option value='RO'>RO</option>
                <option value='RR'>RR</option>
                <option value='SC'>SC</option>
                <option value='SP'>SP</option>
                <option value='SE'>SE</option>
                <option value='TO'>TO</option>
              </select>
              <div className="invalid-feedback">
                { formStatus.uf.erro  }
              </div>
            </div>                                  
          </div>
          <div className='row'>            
            <div className="col-md-2 mb-3">
              <label>
                  Tipo
                  <span className='required_field'> * </span>
                  <span className='total_characters_label'></span>
                  <span className='total_characters_label'>
                    {props.person.address_type.length > 0 ? props.person.address_type.length : ''}
                  </span>
              </label>
              <select 
                type="text" 
                className={formStatus.address_type.validate} 
                name="address_type" 
                id='address_type'
                value={ props.person.id_address_type }
                onChange={handleChange}
                onBlur={testTypeAddress}
                required  
              >
                <optgroup label="Tipos de Logradouro">
                  {
                    listAdressType.map((addressType, index) => 
                      <option key={index = index+1} value={ addressType.id_address_type }> 
                        { addressType.description }
                      </option>
                    )
                  }                                   
                </optgroup>
              </select>

              <div className="invalid-feedback">
                { formStatus.address_type.erro  } 
              </div>
            </div>    
            <div className="col-md-3">
              <label>Logradouro
                  <span className='required_field'> * </span>
                  <span className='total_characters_label'> 
                    { props.person.address.length > 0 ?  props.person.address.length : ''}
                  </span> 
              </label>{formStatus.address.complement ? <a href='https://buscacepinter.correios.com.br/app/localidade_logradouro/index.php'  target="blank">: Buscar CEP</a> : ''}
              <input 
                type="text" 
                className={formStatus.address.validate}
                name="address"
                id='address'
                value={ props.person.address }
                onChange={handleChange}
                onBlur={testAddress}
                required  
                placeholder='Endereço'
              />
              <div className={formStatus.address.complement ? 'valid-feedback' : 'invalid-feedback'}>
                { formStatus.address.complement ? formStatus.address.complement : formStatus.address.erro }
              </div>
            </div>            
          </div>
          <div className="row">
            <div className="col-md-2 mb-3">
              <label>
                Nº<span className='required_field'> * </span>
                <span className='total_characters_label'>
                  {props.person.address_number.length > 0 ?  props.person.address_number.length : ''}
                </span>
              </label>
              <input 
                type="text" 
                className={formStatus.address_number.validate} 
                name="address_number" 
                id='address_number'
                value={ props.person.address_number }
                onChange={handleChange}
                onBlur={testNumberAddress}
                required  
                placeholder='Nº/Apto/Casa'/>
              <div className="invalid-feedback">
                { formStatus.address_number.erro  } 
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label>
                Bairro 
                <span className='required_field'> * </span>
                <span className='total_characters_label'>  
                  { props.person.district.length > 0 ? props.person.district.length : ''} 
                </span>
              </label>
              <input 
                type="text" 
                className={formStatus.district.validate} 
                name="district" 
                id='district'
                value={ props.person.district }
                onChange={handleChange}
                onBlur={testDistrict}
                required  
                placeholder='Bairro'/>
              <div className="invalid-feedback">
                { formStatus.district.erro  } 
              </div>
            </div>      
          </div>
          <div className='row'>
            <div className="col-md-3">
              <label>Complemento</label> 
              <span className='total_characters_label'>  
                { props.person.address_complement.length > 0 ? ' ' + props.person.address_complement.length : ''} 
              </span>
              <input  
                className= { formStatus.address_complement.validate } 
                name="address_complement"
                id="address_complement" 
                value={ props.person.address_complement }
                onChange={handleChange}
                placeholder='Bloco, Apto, Condomínio, Ponto de referência ...'
              />
              <div className="invalid-feedback">
                { formStatus.address_complement.erro }
              </div>
            </div>
            <div className="col-md-2">
              <label>Total Caracteres</label>
              <input 
                type="text" 
                className={formStatus.address_caracters.validate} 
                name="total_characters" 
                id='total_characters'
                value={
                  total_characters_adress + '/56'                  
                }
                disabled
              />
            </div>
          </div>  
        </>
    )
}

export default PersonAddress;