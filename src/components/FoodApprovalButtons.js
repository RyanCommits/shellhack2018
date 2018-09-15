import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

const FoodApprovalButtons = ({ handleApproveFood, handleDenyFood }) => {
    return (
        <View style={styles.buttonContainer}>
            <Icon
                raised
                name='check'
                color='#4CAF50'
                onPress={handleApproveFood}
            />
            <Icon
                raised
                name='close'
                color='#f50'
                onPress={handleDenyFood}
            />
        </View>
    );
};

export default FoodApprovalButtons;
