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
        header: 'Capture Your Meals',
        text: 'Use AI technology and track what you eat',
        image: require('../../assets/images/Camera.png'),
    },
    {
        id: 'welcome_screen_1',
        header: 'Keep Yourself Accountable',
        text: 'Your nutritionist gives you points for eating right',
        image: require('../../assets/images/Nutritionist.png'),
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
