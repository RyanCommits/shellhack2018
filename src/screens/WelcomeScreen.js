import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Slides } from 'components/Slides';
import PropTypes from 'prop-types';
import { Facebook } from 'expo';
import { FACEBOOK_APP_ID } from 'react-native-dotenv';
import { emitter } from 'lib/emitter';
import { wrapWithContext } from 'components/wrapWithContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const SLIDE_DATA = [
    {
        id: 'welcome_screen_0',
        header: 'Welcome to CanIEatThis?',
        text: 'An app that let\'s you vote on your next meal.',
        image: require('../../assets/images/hotDogs.jpg'),
    },
    {
        id: 'welcome_screen_1',
        header: 'Do this to App, Magic!',
        text: 'Test paragraph here.',
        image: require('../../assets/images/hotDogs.jpg'),
    },
];

export const WelcomeScreen = wrapWithContext(class WelcomeScreen extends Component {
    facebookLogin = async () => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FACEBOOK_APP_ID,
            { permissions: ['public_profile'] }
        );

        if (type === 'success') {
            this.props.showLoader();
            emitter.emit('new_user_token', token);
            AsyncStorage.setItem('fb_token', token);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Slides
                    data={SLIDE_DATA}
                    onComplete={this.facebookLogin}
                />
            </View>
        );
    }
});

WelcomeScreen.propTypes = {
    navigation: PropTypes.object,
};
