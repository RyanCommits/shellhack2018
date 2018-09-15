import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class Settings extends Component {
    eraseCache = () => {
        AsyncStorage.removeItem('fb_token');
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <Button
                    title="Erase Cache"
                    raised
                    onPress={this.eraseCache}
                />
            </View>
        );
    }
}
