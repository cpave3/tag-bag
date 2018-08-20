import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/Home';
import NewCollection from './components/NewCollection';

import Data from './initial.json';

import { connect } from 'react-redux';
import { getCollections } from './actions/';

class Main extends Component {
    componentDidMount() {
        AsyncStorage.getItem('data', (err, data) => {
            if (data === null) {
                AsyncStorage.setItem('data', JSON.stringify(Data.tags));
                this.props.getCollections();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='home' component={Home} title='Collections' initial />
                    <Scene key='new_collection' component={NewCollection} title='New Collection' />
                </Scene>
            </Router>
        );
    }
}

export default connect(null, { getCollections })(Main);