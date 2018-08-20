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
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
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
                    <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' onPress={() => Actions.new_quote()}>
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
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