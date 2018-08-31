import React, { Component } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

export default class SimpleFab extends Component {
    render() {
        return (
        <TouchableHighlight 
            style={[this.styles.fab, { backgroundColor: this.props.color, borderColor: this.props.color }]}
            underlayColor={this.props.color} 
            onPress={this.props.onPress}
        >
            {this.props.icon ? 
            <Icon name={this.props.icon} color={this.props.iconColor} type='entypo' /> :
            <Text style={{fontSize: 25, color: 'white'}}>{this.props.text}</Text> }
        </TouchableHighlight>
        );
    }

    styles = StyleSheet.create({
        fab: {
            backgroundColor: '#eb4d4b',
            borderColor: '#eb4d4b',
            borderWidth: 1,
            height: this.props.mini ? 40 : 56,
            width: this.props.mini ? 40 : 56,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: this.props.bottom || 20,
            right: this.props.right || 20,
            shadowColor: "#000000",
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 0
            }
        }
    });
}