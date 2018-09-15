import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
});

const FoodApprovalOutcome = ({ food }) => {
    return (
        <View>
            {
               food.approvedBy === 'denied' ?
                   <Text>
                        Denied
                   </Text>
                   :
                   <Text>
                        Approved
                   </Text>
                }
        </View>
    );
};

export default FoodApprovalOutcome;
