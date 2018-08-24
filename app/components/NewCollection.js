import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';
import uuid4 from 'uuid/v4';

import { connect } from 'react-redux';
import { addCollection, updateCollection, getCollections } from '../actions';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TagInput from 'react-native-tag-input';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import TagInput2 from './TagInput';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

class NewCollection extends Component {
    state = {
        tags: (this.props.edit) ? this.props.collection.tags : [],
        name: (this.props.edit) ? this.props.collection.name : '',
        text: '',
        includes: (this.props.edit && this.props.collection.includes) ? this.props.collection.includes : [],
        includeOptions: []
    };

    getCollectionsToInclude = async () => {
        await this.props.getCollections();
        const output = this.props.data.map(collection => {
            const { id, name } = collection;
            return { id, name };
        });

        this.setState({ includeOptions: [
            {  
              name: "Uncategorised",
              id: 0,
              children: output
            }] });
        // return ;

        // return output;
    }

    componentDidMount = () => {
        this.getCollectionsToInclude();
    };

    generateID = () => {
        return uuid4();
    };

    addCollection = () => {
        if (this.props.edit) {
            let collection = this.props.collection;
            collection['name'] = this.state.name;
            collection['tags'] = this.state.tags;
            collection['includes'] = this.state.includes;
            this.props.updateCollection(collection);
        } else {
            const id = this.generateID();
            const collection = {
                id,
                name: this.state.name,
                tags: this.state.tags,
                includes: this.state.includes
            };
            this.props.addCollection(collection);
        }
        Actions.pop();
    };

    hasData = () => {
        return (this.state.name.length > 0 && this.state.tags.length > 0);
    }

    handleTextChange = (text) => {
        this.setState({ text });

        const lastTyped = text.charAt(text.length - 1);
        const parseWhen = [',', ' ', ';', '\n'];

        if (parseWhen.indexOf(lastTyped) > -1) {
            this.setState({
                tags: [...this.state.tags, this.state.text],
                text: '',
            });
        }
    }

    handleTagChange = (tags) => {
        this.setState({ tags });
    }

    handleIncludeChange = (includes) => {
        this.setState({ includes });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                    <TextInput 
                        onChangeText={(text) => {this.setState({ name: text })}}
                        placeholder={'Collection Name'}
                        autoFocus={true}
                        style={[ styles.title ]}
                        value={this.state.name}
                    />
                
                    <View style={[styles.tags]}>
                        <TagInput2 />
                        <TagInput
                            value={this.state.tags}
                            onChange={this.handleTagChange}
                            labelExtractor={(tag) => tag}
                            text={this.state.text}
                            onChangeText={this.handleTextChange}
                            // maxHeight={75}
                            inputProps={{
                                style: {
                                    lineHeight: 16,
                                    fontSize: 16,
                                },
                                placeholder: 'Enter tags...'
                            }}
                            tagContainerStyle={{
                                borderColor: '#b2b2b2',
                                backgroundColor: 'white',
                                padding: 15,
                                borderWidth: 1,
                                borderRadius: 25
                        
                            }}
                            tagTextStyle={{
                                fontSize: 16
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                    <SectionedMultiSelect
                        items={this.state.includeOptions} 
                        uniqueKey='id'
                        subKey='children'
                        selectText='Include collections...'
                        showDropDowns={true}
                        readOnlyHeadings={true}
                        onSelectedItemsChange={this.handleIncludeChange}
                        selectedItems={this.state.includes}
                        selectChildren={true}
                    />
                    </View>
                </View>
                <TouchableOpacity 
                    style={[styles.saveBtn]}
                    disabled={this.hasData() ? false : true}
                    onPress={this.addCollection}
                >
                    <Text style={[styles.buttonText, { color: this.hasData() ? '#FFF' : 'rgba(255,255,255,.5)' }]}>
                        Save
                    </Text>
                </TouchableOpacity>
                <KeyboardSpacer />
            </View>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        data: state.dataReducer.data,
    };
};

export default connect(mapStateToProps, { addCollection, updateCollection, getCollections })(NewCollection);

const styles = StyleSheet.create({
    saveBtn:{
        // margin: 'auto',
        // marginBottom: 15,
        // width: windowWidth - 15,
        height: Platform.OS === 'ios' ? 74 : 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#27ae60",
        // borderRadius: Platform.OS === 'ios' ? 10 : 0
    },

    buttonText:{
        fontWeight: "500",
    },

    tags: {
        padding: 16,
        paddingLeft:0,
        flex:1,
        height: 200,
        marginBottom:50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    },

    title: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        // fontFamily: 'sans-serif',
        height:25+32,
        padding: 16,
        paddingLeft:0
    },
})