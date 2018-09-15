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

export const TrainerSelect = wrapWithContext(class Friends extends Component {
    state = {
        trainers: [],
    };

    componentDidMount() {
        const ref = firebase.database().ref('users');

        ref.on('child_added', (snapshot) => {
            const user = snapshot.val();

            if (user.userType === 'professional') {
                this.setState((prevState) => ({
                    trainers: [...prevState.trainers, user],
                }));
            }
        });
    }

    onProfessional = () => {
        const userRef = firebase.database().ref(`users/${this.props.uid}`);

        userRef.update({ userType: 'professional' });
        this.props.navigation.navigate('professional');
    }

    render() {
        console.log(this.state.trainers, 'yo')
        return (
            <View style={styles.container}>
                {
                    this.state.trainers.map((trainer, i) => {
                        return (
                            <Text key={i}>
                                {trainer.name}
                            </Text>
                        );
                    })
                }
            </View>
        );
    }
});
