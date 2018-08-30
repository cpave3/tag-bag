import React, { Component } from 'react';
import { 
    TouchableHighlight, 
    Text,
    View,
    Switch,
    StyleSheet 
} from 'react-native';

export default class ListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            name: this.props.name,
            tags: this.props.tags,
        };
    }

    _item = () => {
        const { id, name, tags } = this.state;
        console.log(id, name, tags);
        return {
            id,
            name,
            tags
        };
    }

    render() {
        console.log('selected', this.props.selected);
        return (
            <TouchableHighlight 
                key={this.props.id}
                onLongPress={this.props.onLongPress} underlayColor='rgba(0,0,0,.2)'
                onPress={this.props.onPress}
            >
        
            <View style={styles.container}>
                <Text style={styles.name}>
                    {this.props.name}
                </Text>
                <View style={styles.content}>
                    <Text style={[styles.tags, {flex:2}]}>
                        {this.props.tags.join(', ')}
                    </Text>
                    <Switch 
                        value={this.props.selected}
                        onValueChange={(status) => {
                            this.props.onSwitch(status);
                        }}
                    />
                </View>
            </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        borderBottomWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 10,
        flex: 1,
        flexDirection: 'column'
    },

    content: {
        flex: 1,
        flexDirection: 'row'
    },

    name: {
        fontSize: 15,
        fontWeight: '600',
    },

    tags: {
        marginTop: 5,
        fontSize: 14,
    },
});