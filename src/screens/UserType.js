import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrapWithContext } from 'components/wrapWithContext';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const UserType = wrapWithContext(class Friends extends Component {
    componentDidMount() {
        if (this.props.userType === 'client') {
            this.props.navigation.navigate('client');
        } else if (this.props.userType === 'professional') {
            this.props.navigation.navigate('professional');
        }
    }

    onClient = () => {
        const userRef = firebase.database().ref(`users/${this.props.uid}`);

        userRef.update({ userType: 'client' });
        this.props.navigation.navigate('trainerSelect');
    }

    onProfessional = () => {
        const userRef = firebase.database().ref(`users/${this.props.uid}`);

        userRef.update({ userType: 'professional' });
        this.props.navigation.navigate('professional');
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Client"
                    raised
                    onPress={this.onClient}
                />

                <Button
                    title="Nutritionist"
                    raised
                    onPress={this.onProfessional}
                />
            </View>
        );
    }
});

