import React from 'react';
import { Notifications } from 'expo';
import Clarifai from 'clarifai';
import firebase from 'firebase';
import { emitter } from 'lib/emitter';
import { handlePushToken } from 'lib/pushNotifications';
import { StyleSheet, View, YellowBox, Alert, AsyncStorage } from 'react-native';
import { LoadingOverlay } from 'screens/Loading/LoadingOverlay';
import { MainNavigator } from 'Navigation';
import { setTopLevelNavigator, navigate } from 'NavigationService';
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_STORAGE_BUCKET,
    CLARIFAI_API_KEY,
} from 'react-native-dotenv';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);
// known EXPO issue with firebase token having an expiration timer
YellowBox.ignoreWarnings(['Setting a timer']);

const app = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY,
});

export const AppContext = React.createContext();

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export class App extends React.Component {
    state = {
        showLoading: false,
        uid: null,
        userType: null,
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('fb_token');
        this.handleUserNavigation(token);

        emitter.on('new_user_token', this.startFirebase);

        // if user does not exist, create one
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const { uid, providerData } = user;
                if (uid) {
                    const userRef = firebase.database().ref(`users/${uid}`);

                    // does not ask for permission
                    this.setState({ uid });
                    handlePushToken(uid);

                    return userRef.once('value').then((snapshot) => {
                        if (!snapshot.exists()) {
                            const { displayName, photoURL } = providerData[0];

                            userRef.set({
                                name: displayName,
                                photoURL,
                            });
                        }

                        if (snapshot.userType) {
                            this.setState({ userType: snapshot.userType });
                        }

                        return this.hideLoader();
                    });
                }
            }
            this.setState({ uid: '' });
            return this.hideLoader();
        });

        Notifications.addListener((notification) => {
            const { data: { text }, origin } = notification;

            console.log(notification, 'received');
            if (origin === 'received' && text) {
                Alert.alert(
                    'New Push Notification',
                    text,
                    [{ text: 'Ok. ' }]
                );
            }
        });
    }

    handleUserNavigation = (token) => {
        if (token) {
            this.startFirebase(token);
        } else {
            navigate('welcome');
        }
    }

    startFirebase = (token) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .then((result) => {
                if (result) {
                    navigate('main');
                }
                return this.hideLoader();
            })
            .catch((error) => {
                console.log(error);
                return this.hideLoader();
            });
    }

    showLoader = () => this.setState({ showLoading: true });

    hideLoader = () => this.setState({ showLoading: false });

    render() {
        const ctx = {
            app,
            showLoader: this.showLoader,
            hideLoader: this.hideLoader,
            uid: this.state.uid,
            userType: this.state.userType,
        };

        return (
            <View style={styles.container}>
                <LoadingOverlay
                    visible={this.state.showLoading}
                />
                <AppContext.Provider value={ctx}>
                    <MainNavigator
                        ref={(navigatorRef) => {
                            setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </AppContext.Provider>
            </View>
        );
    }
}
