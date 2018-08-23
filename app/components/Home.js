'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    Clipboard,
    Alert,
    CheckBox
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import Toast, {DURATION} from 'react-native-easy-toast'

import SimpleFab from './SimpleFab';

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
        backgroundColor: '#eb4d4b',
        borderColor: '#eb4d4b',
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

@connectActionSheet
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }

    componentDidMount() {
        this.props.getCollections();
    }

    showOptions(collection) {
        let options = ['Copy', 'Edit', 'Delete', 'Cancel'];
        let destructiveButtonIndex = 2;
        let cancelButtonIndex = 3;
        
        this.props.showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
        },
        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.copyTags(collection);
            } 
            
            else if (buttonIndex === 1) {
                Actions.new_collection({collection, edit: true, title:"Edit Collection"});
            }

            else if (buttonIndex == 2) {
                // Delete
                Alert.alert(
                    'Delete Collection',
                    'Are you sure? This cannot be undone.',
                    [
                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                    {text: 'OK', onPress: () => { this.deleteCollection(collection.id) }},
                    ],
                    { cancelable: true }
                )
            }
        });
    }

    deleteCollection = (id) => {
        console.log('Delete Triggered');
        this.props.deleteCollection(id);
        this.refs.toast.show(`Collection deleted`);
    }

    extractTags = (collectionIds) => {
        let tags = [];
        let collection;
        collectionIds.forEach(id => {
            collection = this.props.data.find(col => { return (col.id && col.id === id) }) 
            if (collection) {
                tags = tags.concat(collection.tags.filter(function (tag) {
                    return tags.indexOf(tag) < 0;
                }));
            }
        });
        return tags;
    }

    extractIncludes = (collectionId) => {
        const collection = this.props.data.find(col => { return (col.id && col.id === collectionId) })
        return (collection && collection.includes) ? collection.includes : [];
    }

    getIndex = (data, id) => {
        return [...data].findIndex((obj) => parseInt(obj.id) === parseInt(id));
    };

    /**
     * This method needs to be provided an id, and recursively get all required tags or includes
     */
    recursiveExtraction = (id) => {
        let includeIds = [id, ...this.extractIncludes(id)];
        for(let i = 0; i < includeIds.length; i++) {
            const newIncludes = this.extractIncludes(includeIds[i]);
            includeIds = includeIds.concat(newIncludes.filter(function (item) {
                return includeIds.indexOf(item) < 0;
            }));
        }

        // should have unique array of include ids now, log it
        return this.extractTags(includeIds);
    }

    copyTags = (collection) => {
        // Need to get the tags for the includes groups as well, flattened to avoid duplicates
        // remove duplicate groups and duplicate tags
        let tags = this.recursiveExtraction(collection.id);

        Clipboard.setString(tags.map(tag => {
            return `#${tag}`;
        }).join(' '));

        this.refs.toast.show(`Copied ${tags.length} tags to clipboard!`);
    }

    _handleRefresh = async () => {
        this.setState({ refreshing: true });
        await this.props.getCollections();
        this.setState({ refreshing: false }); 
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
                    { 
                        (this.props.data && this.props.data.length > 0) 
                        ? <FlatList
                            ref='listRef'
                            data={this.props.data}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => {return `${index}`;}}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                        /> 
                        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#ccc', fontSize: 18 }}>
                                To get started, tap the + button 
                            </Text>
                        </View>
                    }
                    <SimpleFab 
                        color='#27ae60'
                        text='+'
                        onPress={() => Actions.new_collection()}
                    />
                    <Toast 
                        ref="toast"
                        position='bottom'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                    />
                </View>
            );
        }
    }

    renderItem = ({item, index}) => {
        // if (item.name && item.tags) {
            return (
                <TouchableHighlight 
                    onLongPress={() => this.showOptions(item)} underlayColor='rgba(0,0,0,.2)'
                    onPress={() => this.copyTags(item)}
                >
                   {(item.name && item.tags) ?
                   <View style={styles.row}>
                        <Text style={styles.title}>
                            {item.name}
                        </Text>
                        <Text style={styles.description}>
                            {item.tags.join(', ')}
                        </Text>
                    </View> : <Text>INVALID DATA</Text>} 
                </TouchableHighlight>
            );
        // }
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