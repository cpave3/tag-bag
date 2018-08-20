import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/Home';
import NewQuote from './components/AddQuote';

import Data from './initial.json';

import { connect } from 'react-redux';
import { getData } from './actions/';

class Main extends Component {
    componentDidMount() {
        AsyncStorage.getItem('data', (err, data) => {
            if (data === null) {
                AsyncStorage.setItem('data', JSON.stringify(Data.quotes));
                this.props.getData();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='home' component={Home} title='Collections' initial />
                    <Scene key='new_quote' component={NewQuote} title='New Collection' />
                </Scene>
            </Router>
        );
    }
}

export default connect(null, { getData })(Main);