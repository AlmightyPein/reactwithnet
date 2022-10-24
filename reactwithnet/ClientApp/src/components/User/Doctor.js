import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import doc from "../../Assets/doctor.gif";
import speech from "../../Assets/thought.png";
import './Doctor.css';
import * as info  from './disease_disc.js';
import { timeout } from 'workbox-core/_private';
import diseaseinfocsv from '../../Assets/symptom_Description.csv'
const Doctor = (props) =>
{
    let data = ["skin_rash", "nodal_skin_eruptions", "dischromic _patches", "" , "", "", "", "", "",""];
    useEffect(() => {
        setShowDisease(false);
        axios.post('api/doctor/getdisease', data , {
          headers:  {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res.data)).catch(err => console.log(err.response))
    }, []);
    


    const [count, setCount] = useState(4);
    const [showDisease, setShowDisease] = useState(false);
    const [input, setInput] = useState([]);
    const [disease, setDisease] = useState(['']);
    const [symptom, setSymptom] = useState();
    const inputRefs = useRef([]);
    
 
    
   
    
    return (<Container fluid>

        <h3 className="d-flex justify-content-center  ">Please Enter the Symptoms:</h3>
        <Container className="d-flex justify-content-inline  ">
            <Container xl={9}>
        <div >
            <Form>
                <Container>
                            <div><br /><Input required placeholder="Symptom 1" innerRef={ref=>inputRefs.current[0]=ref} /></div>
                            <div><br /><Input required innerRef={ref => inputRefs.current[1] = ref} placeholder="Symptom 2" /></div>
                    <br />
                    <div className="d-flex align-items-start">
                                <Input required innerRef={ref => inputRefs.current[2] = ref} placeholder="Symptom 3" className="d-flex align-items-center mr-0" />
                       
                        
                    </div>

                    {input}

                    <div title="Add More Symptom" id="btn" onClick={(e) => {
                        setCount(prev => prev + 1);
                                setInput(prev => [...prev, <div key={count} ><br /><Input innerRef={ref => inputRefs.current[count] = ref} key={ count } innerRef={ref => inputRefs.current.push(ref)} placeholder={'symptom ' + count} /></div>]);


                        
                    }}
                        className="d-block btn m-auto align-items-start" ><PlusSquare className="m-auto d-block " style={{ width: '20' }} /></div>
                    </Container>
            </Form>

                </div>
                <Container className="d-flex align-items-center justify-content-center" >
                    <Button color='primary' type="submit" onClick={() => {

                        setTimeout(() =>
                            setSymptom(<div className="symptom">{inputRefs.current[0].value}</div>), 0);
                        setTimeout(() =>
                            setSymptom(<div className="symptom fade-in">{inputRefs.current[1].value}</div>), 2000);
                        setTimeout(() =>
                            setSymptom(<div className="symptom fade-in">{inputRefs.current[2].value}</div>), 4000);
                        setTimeout(() => setShowDisease(true), 6000);

                        setShowDisease(false);
                        //POST: submit symptoms for ML model to process
                        let inputData = Array(10).fill("");
                        inputRefs.current.map((ref, index) => { inputData[index] = ref.value });

                        axios.post('api/doctor/getdisease', inputData, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => {
                            setDisease(res.data); info.DiseaseInfo();
                    }).catch(err => console.log(err.response))
                    }} disabled={false}>
                        Submit
                    </Button>
                </Container>
            </Container>
            { disease[0] !=='' && showDisease==false ?
                <Container className="d-flex align-items-center">

                    <img className="doc fade-in" src={doc} />
                    

                </Container> : showDisease ? <div className="d-flex flex-column py-3 gap-y-3">
                    <b>Disease Report with Confidence:</b>
                    <div className="d-flex flex-column gap-y-1 "><div className="font-bold ">Disease:</div><div>{disease[1]}<a href={"https://en.wikipedia.org/wiki/Special:Search?search=" + disease[1]} target="_blank" class="link-secondary" title='Click here to know more'> ℹ️</a></div>
                        <div className="font-bold ">Confidence:</div><div>{disease[0]}</div>
                        
                    </div>
                </div>
        : null
            }

                
</Container>
    </Container>);
}
export default Doctor;