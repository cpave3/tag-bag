import React, { Component } from 'react';
import {
    TextInput,
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class TagInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                'words', 'get', 'tagged'
            ],
            text: ''
        };
    }

    _removeTag = (index) => {
        const items = [...this.state.items];
        items.splice(index, 1);
        this.setState({
            items
        });
    }

    _renderItem = (item, index) => {
        return (
            <View style={this.styles.tagWrapper}>
                <Text style={this.styles.tagText}>{item}</Text>
                <Text 
                    style={this.styles.tagCancelButton}
                    onPress={index => this._removeTag(index)}
                >x</Text>
            </View>
        );
    }

    _parseTags = (text) => {
        console.log(text);
        this.setState({ text });

        // Check all text for a delimiter
        const parseWhen = [',', ' ', ';', '\n'];
        const ignoreWhen = [];

        const lastTyped = text.charAt(text.length - 1);

        const textParts = text.split('');
        let storedParts = [];
        let pendingTags = [];

        textParts.forEach((char, index) => {
            if (parseWhen.indexOf(char > -1)) {
                // This is a breaking character
                pendingTags.push(storedParts.join(''));
                storedParts = [];
                console.log('pushed', char, index, textParts);

            } else if (ignoreWhen.indexOf(char > -1)) {
                // Save this character
                storedParts.push(char);
            } else {
                // Just ignore it
            }
            textParts.shift();
        });
        this.setState({
            items: [...this.state.items, ...pendingTags],
            text: storedParts.join('')
        });
    }

    render() {
        return (
            <View>
                <TextInput
                    style={this.styles.textInput}
                    placeholder={this.props.placeholder || 'Enter tags'}
                    onChangeText={text => this._parseTags(text)}
                />
                <View style={this.styles.tagContainer}>
                    { this.state.items.map((item, index) => this._renderItem(item)) }
                </View>
            </View>
        );
    }

    styles = StyleSheet.create({

        textInput: {
            marginBottom: 15,
            fontSize: 16
        },

        tagContainer: {
            display: 'flex',
            flexDirection: 'row'
        },

        tagWrapper: {
            borderWidth: 1,
            borderColor: '#b2b2b2',
            display: 'flex',
            flexDirection: 'row',
            padding: 7,
            borderRadius: 15,
            margin: 5,
        },

        tagCancelButton: {
            marginLeft: 10,
            color: '#b2b2b2'
        },

        tagText: {
            color: '#b2b2b2'
        }

    })
}