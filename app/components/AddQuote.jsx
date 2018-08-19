import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import uuid4 from 'uuid/v4';

import { connect } from 'react-redux';
import { addQuote, updateQuote } from '../actions/';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

class NewQuote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: (props.edit) ? props.quote.author : '',
            quote: (props.edit) ? props.quote.quote : '',
        };
    }

    generateID = () => {
        return uuid4();
    };

    addQuote = () => {
        if (this.props.edit) {
            let quote = this.props.quote;
            quote['author'] = this.state.author;
            quote['quote'] = this.state.quote;
            this.props.updateQuote(quote);
        } else {
            const id = this.generateID();
            const quote = {
                id,
                author: this.state.author,
                quote: this.state.quote
            };
            this.props.addQuote(quote);
        }
        Actions.pop();
    };

    hasData = () => {
        return (this.state.author.length > 0 && this.state.quote.length > 0);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundCOlor: '#fff'}}>
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                    <TextInput 
                        onChangeText={(text) => {this.setState({ author: text })}}
                        placeholder={'Author'}
                        autoFocus={true}
                        style={[ styles.title ]}
                        value={this.state.author}
                    />
                    <TextInput 
                        multiline={true}
                        onChangeText={(text) => {this.setState({ quote: text })}}
                        placeholder={'Enter Quote'}
                        style={[ styles.quote ]}
                        value={this.state.quote}
                    />
                    <TouchableOpacity 
                        style={[styles.saveBtn]}
                        disabled={this.hasData() ? false : true}
                        onPress={this.addQuote}
                    >
                        <Text style={[styles.buttonText, { color: this.hasData() ? '#FFF' : 'rgba(255,255,255,.5)' }]}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    <KeyboardSpacer />
                </View>
            </View>
        );
    }
}

export default connect(null, { addQuote, updateQuote })(NewQuote);

const styles = StyleSheet.create({
    saveBtn:{
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#6B9EFA"
    },

    buttonText:{
        fontWeight: "500",
    },

    quote: {
        fontSize: 17,
        lineHeight: 38,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
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
        fontFamily: 'Helvetica Neue',
        height:25+32,
        padding: 16,
        paddingLeft:0
    },
})