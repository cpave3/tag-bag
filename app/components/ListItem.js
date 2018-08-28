import React, { Component } from 'react';
import { 
    TouchableHighlight, 
    Text,
    View,
    Switch,
    StyleSheet 
} from 'react-native';

const styles = StyleSheet.create({

});

export default class ListItem extends Component {
    render() {
        return (
            <TouchableHighlight 
                onLongPress={() => this._showOptions(item)} underlayColor='rgba(0,0,0,.2)'
                onPress={() => this._copyTags(item)}
            >
            {(item.name && item.tags) ?
            <View style={styles.row}>
                    <Text style={styles.title}>
                        {item.name}
                    </Text>
                    <View style={styles.content}>
                        <Text style={[styles.description, {flex:2}]}>
                            {item.tags.join(', ')}
                        </Text>
                        <Switch 

                        />
                    </View>
                </View> : <Text>INVALID DATA</Text>} 
            </TouchableHighlight>
        );
    }
}