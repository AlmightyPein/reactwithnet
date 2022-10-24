import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Col, Row, Button, FormFeedback } from 'reactstrap';
import { PersonFill, EnvelopeFill, ArrowRepeat, KeyFill, FilePersonFill, PencilSquare } from 'react-bootstrap-icons';
import '../Auth/Registration.css'

const Profile = (props) => {

    //const usr , email , pwd , c_pwd;
    const usr = useRef(null);
    const email = useRef(null);
    const pwd = useRef(null);
    const c_pwd = useRef(null);
    const fName = useRef(null);
    const lName = useRef(null);
    

    const [ProfileData, setProfileData] = useState(
        {
            data:{
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmpassword: '',
    }
        }
    );
    const [disableInput, setDisableInput] = useState(true);
    
        useEffect(() => {
            axios.get('api/auth/getprofiledata').then((res) => {

                if (res.data != null) {
                    console.log(res.data);
                    const cdata = res.data;
                    setProfileData({ ...ProfileData, data:cdata});
                    console.log(ProfileData);
                }
                
                
            })
                .catch(err => console.log(err.response));
        }, []);


    function updateData(e) {
        e.preventDefault();
        const UserData = {

            Username: usr.current.value,
            Email: email.current.value,
            FirstName: fName.current.value,
            LastName:lName.current.value,
            Password: pwd.current.value,
            ConfirmPassword: c_pwd.current.value,
            

        }

        //http POST: To Register User
        axios.put('/api/auth/updatedata',
            UserData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            console.log(response.data);
            
        })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    function validatePassword(e)
    {
        if (pwd.current.value != e.target.value) {
            e.target.setCustomValidity("Password didn't match");
        }
        else
        {
            e.target.setCustomValidity("");
           
        }

    }

    return <Container className='d-flex align-items-start'>
        <Form onSubmit={updateData}>
            
            <FormGroup>
                <Container className="test">
                    <PersonFill class="icon" />

                    <Input disabled={disableInput} required innerRef={usr} placeholder="Username" id="username" type="text" defaultValue={ ProfileData.data.username} contentEditable/>

                </Container>

            </FormGroup>
            <br />
            <FormGroup className='d-flex inline'>
                <Container className="test">
                    <FilePersonFill class="icon" />

                    <Input disabled={ disableInput} innerRef={fName} placeholder="First Name" id="fname" type="text" def defaultValue={ProfileData.data.firstName}/>

                </Container>
                <Container className="test">
                    <FilePersonFill class="icon" />

                    <Input disabled={disableInput} innerRef={lName} placeholder="Last Name" id="lname" type="text" defaultValue={ProfileData.data.lastName} />

                </Container>

            </FormGroup>
            <br />
            <FormGroup>
                <Container className="test">
                    <EnvelopeFill class="icon" />

                    <Input disabled={disableInput} required innerRef={email} placeholder="E-mail" id="email" type="text" defaultValue={ProfileData.data.email} >
                       
                    </Input>

                </Container>

            </FormGroup>
            <br />
            <FormGroup>
                <Container className="test">
                    <KeyFill class="icon" />

                    <Input disabled={disableInput} required innerRef={pwd} placeholder="Password" id="pwd" type="password" defaultValue="********">

                    </Input>

                </Container>

            </FormGroup>
            <br />
            <FormGroup>
                <Container className="test">
                    <ArrowRepeat class="icon" />

                    <Input disabled={disableInput} required onChange={validatePassword}

                        onInvalid={(e) => {
                            //sets the custom error message
                            if (e.target.defaultValue == "") e.target.setCustomValidity("Password can not be empty ")
                        }}
                        innerRef={c_pwd} placeholder="Repeat Password" id="rep-pwd" type="password" defaultValue='********' />

                </Container>
            </FormGroup>
            <br />
           

            

            {disableInput ? <div className=" flex justify-center bg-transparent" onClick={() => setDisableInput(!disableInput)} ><PencilSquare width="7%" height="150%" id="icon" /></div> : <Button className=" relative left-[45%]" type="submit" id="submit" color="primary" >Update</Button>}
            
        </Form>
        
                </Container>
}
export default Profile;