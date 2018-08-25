import React, { Component } from 'react';
import {
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class TagInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items || [],
            text: ''
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.items != this.state.items && this.props.onChange) {
            console.log('updating', this.state.items)
            // Tags changed, fire update
            this.props.onChange(this.state.items);
        }
    }

    _removeTag = (index) => {
        const items = [...this.state.items];
        console.log(items, index);
        items.splice(index, 1);
        this.setState({
            items
        });
    }

    _renderItem = (item, index) => {
        return (
           <TouchableOpacity
                onPress={() => { this._removeTag(index)} }
                key={`${item}${index}`}
           >
                <View style={this.styles.tagWrapper}>
                    <Text style={this.styles.tagText}>{item}</Text>
                    <Text style={this.styles.tagCancelButton}>x</Text>
                </View>
           </TouchableOpacity>
        );
    }

    _parseTags = (text) => {
        console.log(text);
        // this.setState({ text });

        // Check all text for a delimiter
        const parseWhen = [',', ' ', ';', '\n'];
        const ignoreWhen = ['#'];

        const lastTyped = text.charAt(text.length - 1);

        const textParts = text.split('');
        let storedParts = [];
        let pendingTags = [];

        console.log(textParts);
        textParts.forEach((char, index) => {
            if (parseWhen.indexOf(char) > -1) {
                // This is a breaking character
                pendingTags.push(storedParts.join(''));
                console.log('pushed', pendingTags, storedParts);
                storedParts = [];
            } else if (ignoreWhen.indexOf(char) > -1) {
                // Just ignore it
                console.log('ignoed', char);
            } else {
                // Save this character
                storedParts.push(char);
                console.log('saved', char, storedParts);
            }
            // textParts.shift();
        });
        this.setState({
            items: [...this.state.items, ...pendingTags],
            text: storedParts.join('')
        });
        console.log(this.state);
    }

    render() {
        return (
            <View>
                <TextInput
                    style={this.styles.textInput}
                    placeholder={this.props.placeholder || 'Enter tags'}
                    onChangeText={text => this._parseTags(text)}
                    value={this.state.text}
                />
                <View style={this.styles.tagContainer}>
                    { this.state.items.map((item, index) => this._renderItem(item, index)) }
                </View>
            </View>
        );
    }

    styles = StyleSheet.create({

        textInput: {
            marginBottom: 15,
            fontSize: 16,
            lineHeight: 16
        },

        tagContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
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