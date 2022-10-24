import { Tab } from 'bootstrap';
import react, { useState } from 'react';
import { Container, Nav, NavLink, NavItem, TabContent, TabPane, Button } from 'reactstrap';
import classnames from 'classnames';
import Profile from './Profile.js';
import Doctor from "./Doctor.js";
import '../Auth/Registration.css';
import './dashboard.css';
import ImageDoctor from "./ImageDoctor" 
const Dashboard = (props) =>
{
    
    const [activeTab, setActive] = useState('1');
    function toggle(tab) {
        if (activeTab != tab) {
            setActive(tab);
        }
    }
    return <Container className="d-flex align-items-start">

        <Nav vertical pills className="dashboard-tab">
            <NavItem>
                <NavLink active={activeTab === '1' }  onClick={() => { toggle('1'); }} > Profile</NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => { toggle('2'); }} >Disease Detection (through text)</NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '3'} onClick={() => { toggle('3'); }} >Disease Detection (through image)</NavLink>
                
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane role="tabpanel" tabId='1'><Profile/></TabPane>
            <TabPane tabId='2'><Doctor/></TabPane>
            <TabPane tabId='3'><ImageDoctor/></TabPane>
        </TabContent>
       
           </Container>;
}
export default Dashboard;