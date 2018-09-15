import React, { Component } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { wrapWithContext } from 'components/wrapWithContext';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 50
    },
    userTypeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 300,
        borderRadius: 40,
        marginBottom: 20,
        shadowOpacity: 0.9,
        shadowRadius: 25,
        shadowColor: 'grey',
        elevation: 3
    },
    userTypeTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: '#FFF',
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
                <ImageBackground
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "100%",
                        height: "100%"
                    }}
                    source={require('../../assets/images/background_1.jpg')}
                >
                    <Text style={styles.header}>
                        Which best describes You?
                    </Text>

                    <View>
                        <TouchableOpacity
                            onPress={this.onProfessional}
                        >
                            <ImageBackground
                                style={ styles.userTypeContainer }
                                imageStyle={{ borderRadius: 40 }}
                                source={require('../../assets/images/button_background_1.png')}
                            >
                                <Text style={ styles.userTypeTitle }>
                                    NUTRITIONIST
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.onClient}
                        >
                            <ImageBackground
                                style={ styles.userTypeContainer }
                                imageStyle={{ borderRadius: 40 }}
                                source={require('../../assets/images/button_background_1.png')}
                            >
                                <Text
                                    style={ styles.userTypeTitle }
                                >
                                    CLIENT
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
});
