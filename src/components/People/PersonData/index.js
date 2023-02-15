import React, { useEffect, useContext }from 'react';
import { 
    formatDate,
    testAge,
    isValibCnae,
    isValidCPF,
    isValidCNPJ

} from '../../../utilities/Utilities';
import { 
    noMask,
    maskCPF, 
    maskCNPJ,
    maskCnae,
    setMaskCnae,
    setMaskCPF,
    setMaskCNPJ
} from '../../../utilities/Masks';
import {getTreatmentMasculine, getTreatmentFemale  } from '../../../data/treatment';
import { getRegionCpf } from '../../../data/cpf_fiscal_region';
import { PersonContext } from '../../../Contexts/Person/PersonContext';

const PersonData = (props) => { 
    
  const { formStatus, setFormStatus } = useContext(PersonContext);
    
    var references = {
        document_type: document.getElementById('document_type'),   
        description: document.getElementById('description'),  
    }

    const masculine_list = getTreatmentMasculine();
    const female_list = getTreatmentFemale();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        props.setPerson({ ...props.person, [name]: value });
    };

    const handleChangeDocumentType = (e) => {        
        e.preventDefault();
        props.setPerson({...props.person, [e.target.name]: parseInt(e.target.value) });
    };

    const handleChangeMaskCPF = (e) => { 
        e.preventDefault();
        maskCPF(e);
        props.setPerson({ ...props.person, [e.target.name]: noMask(e.target.value) });
    }
    
    const handleChangeMaskCNPJ = (e) => { 
      e.preventDefault();
      
      maskCNPJ(e);
      props.setPerson({ ...props.person, [e.target.name]: noMask(e.target.value) });
    }

    const handleChangeCnae = (e) => {    
    
        e.preventDefault();
        maskCnae(e);
        props.setPerson({ ...props.person, [e.target.name]: noMask(e.target.value) });
    };

    useEffect(() => {

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);    
        props.person.date_registration = formatDate(today, 'aaaa-mm-dd');
               
    }, []);

   
    const testDate = () => {

        if (!props.person.date) {
          setFormStatus({...formStatus, 
            date: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
     
        if (props.person.document_type === 1) {
          
          if (!testAge(1, props.person.date)) {
            setFormStatus({...formStatus, 
              date: {
                erro: 'Não é permitido o cadastro de menores de idade.',
                validate: 'form-control is-invalid'
              }
            });
            return false;
          }
    
          if (testAge(2, props.person.date)) {
            setFormStatus({...formStatus, 
              date: {
                erro: 'Idade inválida. Maior de 120 anos.',
                validate: 'form-control is-invalid'
              }
            });
            return false;
          }
        }      
        
        setFormStatus({...formStatus, 
          date: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testDocument = () => {

      if (testDocumentIsValid()) {
        
        if(props.action === 'change') {
          if(props.person.document === props.document) {            
            return;
          }else{
            props.testDcumentExists();
            return;
          }
        }
        props.testDcumentExists();        
      }
    }

    const testDocumentIsValid = () => {      
      if(props.person.document) {
        if (!isValidCPF(noMask(props.person.document))) {
            setFormStatus({...formStatus, 
              document: {
                erro: 'CPF inválido!',
                validate: 'form-control is-invalid'
              }
            });
            return false;
          }
          setFormStatus({...formStatus, 
            document: {
              erro: '',
              validate: 'form-control is-valid'
            }
          });
          return true;
      }    
    }

    const testSexo = () => {
        if (!props.person.sexo) {
          setFormStatus({...formStatus, 
            sexo: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          sexo: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testTreatment = () => {
        if (!props.person.treatment) {
          setFormStatus({...formStatus, 
            treatment: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          treatment: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testUsualName = () => {
      if (!props.person.usual_name) {
        setFormStatus({...formStatus, 
          usual_name: {
            erro: 'Campo obrigatório!',
            validate: 'form-control is-invalid'
          }
        });
        return false;
      }
      setFormStatus({...formStatus, 
        usual_name: {
          erro: '',
          validate: 'form-control is-valid'
        }
      });
      return true;
  }


    const testDescription = () => {    
    
        if (!props.person.description) {      
          setFormStatus({...formStatus, 
            description: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
    
        if(parseInt(references.description.value.length) < 3) {
    
          setFormStatus({...formStatus, 
            description: {
              erro: 'O Mínimo permitido: Três caracteres.',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }   
    
        setFormStatus({...formStatus, 
          description: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }    

    return(
        <>
            <div className='row'>     
                <div className="col-md-2">
                    <label>CPF<span className='required_field'> *</span></label>
                    <input 
                      type="text" 
                      className={formStatus.document.validate} 
                      name="document" 
                      id="document"
                      onChange={handleChangeMaskCPF }
                      value={ setMaskCPF(props.person.document) }
                      onBlur={testDocument}                
                      required 
                    />
                    { formStatus.document.validate === 'form-control is-valid' ? <span style={{'color' : 'darkgray'}}>{getRegionCpf(noMask(props.person.document))}</span> : ''}
                    <div className="invalid-feedback">
                      { formStatus.document.erro } 
                    </div>
                </div>
                <div className="col-md-2">
                  <label>Data nascimento<span className='required_field'> *</span></label>
                  <input 
                    type="date" 
                    className={ formStatus.date.validate }
                    name="date"
                    value={ props.person.birth_date }
                    onChange={handleChange}
                    onBlur={testDate}
                    required  
                    maxLength={10}
                    //disabled
                  />
                  <div className="invalid-feedback">
                    {formStatus.date.erro}
                  </div>
                </div>    
                <div className="col-md-1 mb-3">
                  <label>Sexo<span className='required_field'> *</span></label>
                  <select 
                    className={formStatus.sexo.validate}
                      name="sexo"
                      value={ parseInt(props.person.sexo) }
                      onChange={handleChange}
                      onBlur={testSexo}
                      required
                    >
                      <option value={1}>M</option>
                      <option value={2}>F</option>
                  </select>
                  <div className="invalid-feedback">
                    { formStatus.sexo.erro }
                  </div>                  
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <label>Tratamento<span className='required_field'> *</span></label>
                    <select 
                      className={ formStatus.treatment.validate }
                      name="treatment"
                      value={ props.person.treatment }
                      onChange={handleChange}
                      onBlur={testTreatment}
                      required
                      >
                      { 
                        props.person.sexo === '2' ?
                        female_list.map((treatment_f, index) => 
                        <option key={index = index+1} value={ treatment_f }>
                              { treatment_f }
                            </option>)
                        : masculine_list.map((treatment_m, index) => 
                        <option key={index = index+1} value={ treatment_m }>
                              { treatment_m }
                            </option>)             
                      }
                    </select>
                    <div className="invalid-feedback">
                      { formStatus.treatment.erro }
                    </div>
                </div>  
                <div className="col-md-3">
                   <label >Nome usual
                      <span className='required_field'> *</span> 
                      <span className='total_characters_label'>
                        { ` ${props.person.usual_name.length} /20`}
                      </span>
                   </label>
                   <input 
                     type="text" 
                     className={formStatus.usual_name.validate} 
                     name="usual_name" 
                     id='usual_name'
                     value={ props.person.usual_name }
                     onChange={handleChange} 
                     onBlur={testUsualName}
                     maxLength={20}
                     required
                   />
                   <div className="invalid-feedback">
                      { formStatus.usual_name.erro }
                   </div>
                </div> 
            </div>
            <div className='row'>
                <div className="col-md-5">
                    <label > Nome
                        <span className='required_field'> *</span> 
                        <span className='total_characters_label'>
                            { ` ${props.person.description.length} /60` }
                        </span>
                    </label>
                    <input 
                      type="text" 
                      className={formStatus.description.validate} 
                      name="description" 
                      id='description'
                      value={ props.person.name }
                      onChange={handleChange}
                      onBlur={testDescription}
                      required  
                      placeholder='Nome do Cliente'
                      maxLength={60}
                    />
                    <div className="invalid-feedback">
                        { formStatus.description.erro }
                    </div>
                </div>      
            </div>
        </>
    )
}

export default PersonData;