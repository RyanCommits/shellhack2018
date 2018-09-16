import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wrapWithContext } from 'components/wrapWithContext';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        paddingHorizontal: 50,
        marginTop: 50,
    },
    titleText: {
        color: '#383B41',
        fontSize: 24,
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 50,
        paddingTop: 20,
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
                    trainers: [...prevState.trainers, { ...user, uid: snapshot.key }],
                }));
            }
        });
    }

    onSelect = (uid) => {
        const userRef = firebase.database().ref(`users/${this.props.uid}`);
        const trainerRef = firebase.database().ref(`users/${uid}/clients`);

        userRef.update({ professional: uid });
        // add to a trainer's list of clients
        trainerRef.push(this.props.uid);

        this.props.navigation.navigate('client');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Choose Your Trainer
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    {
                        this.state.trainers.map((trainer, i) => {
                            return (
                                <ListItem
                                    style={{
                                        minHeight: 150,
                                        alignItems: 'center',
                                    }}
                                    onPress={() => this.onSelect(trainer.uid)}
                                    key={i}
                                    leftAvatar={{
                                        source: { uri: trainer.photoURL },
                                        rounded: true,
                                        size:"large",
                                        height: 75,
                                        width: 75
                                    }}
                                    title={trainer.name}
                                    scaleProps={{
                                        friction: 90,
                                        tension: 100,
                                        activeScale: 0.95,
                                    }}
                                    containerStyle={{
                                        height: 100,
                                        width: 250,
                                        marginTop: 30,
                                        borderRadius: 45,
                                        elevation: 10,
                                        shadowOffset: { width: 1, height: 1 },
                                        shadowOpacity: 0.9,
                                        shadowRadius: 25,
                                        shadowColor: 'grey',
                                    }}
                                />
                            );
                        })
                    }
                </View>
            </View>
        );
    }
});
