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

export const Food = () => {
    return (
        <View
            style={styles.container}
        >
            <Text>
                hey
            </Text>
        </View>
    );
};

