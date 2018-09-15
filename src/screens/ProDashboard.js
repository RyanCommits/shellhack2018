import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { wrapWithContext } from 'components/wrapWithContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const ProDashboard = wrapWithContext(class Friends extends Component {
    render() {
        return (
            <View style={styles.container}/>
        );
    }
});

