import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { wrapWithContext } from 'components/wrapWithContext';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export const ProDashboard = wrapWithContext(class Friends extends Component {
    state = {
        clients: [],
    };


    componentDidMount() {
        const uid = 'algkjew3323jg';
        const proRef = firebase.database().ref(`users/${ uid }/clients`);
        const clientRef = firebase.database().ref('users');

        proRef.on('child_added', (snapshot) => {
            const user_id = snapshot.val();
            clientRef.child(user_id).once('value', (snapshot) => {
                const user = snapshot.val();
                this.setState((prevState) => ({
                    clients: [...prevState.clients, { ...user, uid: snapshot.key }],
                }));
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Your Client
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    {
                        this.state.clients.map((client, i) => {
                            return (
                                <ListItem
                                    style={{
                                        height: '100%',
                                        width: 500,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => this.onSelect(client.uid)}
                                    key={i}
                                    leftAvatar={{
                                        source: { uri: client.photoURL },
                                        rounded: true,
                                        size: 'large',
                                        height: 75,
                                        width: 75,

                                    }}
                                    title={client.name}
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
