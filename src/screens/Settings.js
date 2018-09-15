import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class Settings extends Component {
    eraseCache = () => {
        firebase.auth().signOut();
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
