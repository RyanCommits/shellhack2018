import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

export const handlePushToken = async (uid) => {
    const previousToken = await AsyncStorage.getItem('push_token');
    if (!previousToken) {
        const token = await Notifications.getExpoPushTokenAsync();
        const userRef = firebase.database().ref('pushTokens');
        userRef.update({
            [uid]: token,
        });
        AsyncStorage.setItem('push_token', token);
    }
};
