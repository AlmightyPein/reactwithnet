import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CovidCounter } from './components/Services/CovidCounter';
import { CovidMap } from './components/Services/CovidMap';
import { Registration } from './components/Auth/Registration';
import { Login } from './components/Auth/Login';
import './custom.css'
import { ConfirmEmail } from './components/Auth/ConfirmEmail';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/services/covcounter' component={CovidCounter} />
            <Route exact path='/services/covmap' component={CovidMap} />

            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/Register' component={Registration} />
            <Route path='/ConfirmEmail' component={ConfirmEmail} />
            <Route path='/Login' component={Login} />
      </Layout>
    );
  }
}
