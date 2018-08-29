import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { Icon } from 'react-native-elements'

const styles = {
    fab: {
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
};

export default class SimpleFab extends Component {
    render() {
        return (
        <TouchableHighlight 
            style={[styles.fab, { backgroundColor: this.props.color, borderColor: this.props.color }]}
            underlayColor={this.props.color} 
            onPress={this.props.onPress}
        >
            {this.props.icon ? 
            <Icon name={this.props.icon} color={this.props.iconColor} type='entypo' /> :
            <Text style={{fontSize: 25, color: 'white'}}>{this.props.text}</Text> }
        </TouchableHighlight>
        );
    }
}