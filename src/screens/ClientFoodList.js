import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { wrapWithContext } from 'components/wrapWithContext';
import firebase from 'firebase';
import FoodApprovalButtons from '../components/FoodApprovalButtons';
import FoodApprovalOutcome from '../components/FoodApprovalOutcome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const ClientFoodList = wrapWithContext(class ClientFoodList extends Component {
    state = {
        foods: [],
    };

    componentDidMount() {
        const ref = firebase.database().ref('foods');

        ref.on('child_added', (snapshot) => {
            this.setState((prevState) => ({
                foods: [...prevState.foods, { id: snapshot.key, ...snapshot.val() }],
            }));
        });

        ref.on('child_changed', (snapshot) => {
            const oldFoodIndex = this.state.foods.findIndex((food) => food.id === snapshot.key);
            const newFood = { id: snapshot.key, ...snapshot.val() };

            this.setState(() => ({
                foods: Object.assign([], this.state.foods, { [oldFoodIndex]: newFood }),
            }));
        });
    }

    handleApproveFood = (food) => {
        const foodRef = firebase.database().ref(`foods/${food.id}`);

        foodRef.update({ approvedBy: firebase.auth().currentUser.uid });
    }

    handleDenyFood = (food) => {
        const foodRef = firebase.database().ref(`foods/${food.id}`);

        foodRef.update({ approvedBy: 'denied' });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                    this.state.foods.map((food) => {
                        return (
                            <Card
                                key={food.id}
                                title='Food name here (from meta)'
                                image={{ uri: food.url }}
                            >
                                <Text style={{ marginBottom: 10 }}>
                                    Macros here
                                </Text>
                                {
                                    food.approvedBy !== false ?
                                        <FoodApprovalOutcome food={food}/>
                                        :
                                        <FoodApprovalButtons
                                            handleApproveFood={() => this.handleApproveFood(food)}
                                            handleDenyFood={() => this.handleDenyFood(food)}
                                        />
                                }

                            </Card>
                        );
                    })
                }
                </ScrollView>
            </View>
        );
    }
});
