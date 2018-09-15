import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { wrapWithContext } from 'components/wrapWithContext';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const Friends = wrapWithContext(class Friends extends Component {
    state = {
        friends: [],
        users: [],
        friendsLoaded: false,
    }

    componentDidMount() {
        const ref = firebase.database().ref(`friends/${this.props.uid}`);

        ref.on('child_added', (snapshot) => {
            this.setState((prevState) => ({
                friends: [...prevState.friends, snapshot.key],
            }));
        });
    }

    getUsers = () => {
        const ref = firebase.database().ref('users');

        ref.on('child_added', (snapshot) => {
            this.setState((prevState) => ({
                users: [...prevState.users, snapshot.key],
            }));
        });
    }

    render() {
        if (this.state.friends.length < 1 && this.state.users.length < 1) {
            return (
                <View style={styles.container}>
                    <Text>
                        {'You don\'t have any friends!'}
                    </Text>
                    <Button
                        title="Add A Friend"
                        raised
                        onPress={this.getUsers}
                    />
                </View>
            );
        }

        return (
            <View
                style={styles.container}
            >
                {
                    this.state.friends.map((text, i) => {
                        return (
                            <Text key={i}>
                                {text}
                            </Text>
                        );
                    })
                }
                {
                    this.state.users.map((text, i) => {
                        return (
                            <Text key={i}>
                                {text}
                            </Text>
                        );
                    })
                }
            </View>
        );
    }
});

