'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    ActionSheetIOS
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions';

import { Actions } from 'react-native-router-flux';

const BUTTONS = [
    'Edit',
    'Delete',
    'Cancel'
];

const CANCEL_INDEX = 2;

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    row: {
        borderBottomWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 10,
    },

    title: {
        fontSize: 15,
        fontWeight: '600',
    },

    description: {
        marginTop: 5,
        fontSize: 14,
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getQuotes();
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20 }}>
                    <ActivityIndicator animating={true} />
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 0 }}>
                    <FlatList
                        ref='listRef'
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => {return `${index}`;}} 
                    />
                </View>
            );
        }
    }

    renderItem = ({item, index}) => {
        return (
            <View style={styles.row}>
                <Text style={styles.title}>
                    { `${item.author}` }
                </Text>
                <Text style={styles.description}>
                    { item.quote }
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ReduxActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);