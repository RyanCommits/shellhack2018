import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { Card, Icon, Avatar, Divider, Button, Header } from 'react-native-elements';
import { wrapWithContext } from 'components/wrapWithContext';
import firebase from 'firebase';
import FoodApprovalButtons from '../components/FoodApprovalButtons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -130
    },
    headerText: {
        color: '#FFF',
        fontSize: 32,
        marginBottom: 12,
        fontWeight: '800',
    }
});

export const ClientFoodList = wrapWithContext(class ClientFoodList extends Component {
    state = {
        foods: [],
        clientInfo: {}
    };

    componentDidMount() {
        const { uid, name, photo } = this.props.navigation.state.params;
        this.state.clientInfo = { name, photo }
        const ref = firebase.database().ref(`foods/${uid}`);

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
        const { uid } = this.props.navigation.state.params;
        const foodRef = firebase.database().ref(`foods/${uid}/${food.id}`);

        foodRef.update({ approvedBy: firebase.auth().currentUser.uid });
    }

    handleDenyFood = (food) => {
        const { uid } = this.props.navigation.state.params;
        const foodRef = firebase.database().ref(`foods/${uid}/${food.id}`);

        foodRef.update({ approvedBy: 'denied' });
    }

    onSelect = () => {
        this.props.navigation.navigate(
            'dashboard'
        );
    }

    render() {
        const notApprovedFoods = this.state.foods.filter((food) => food.approvedBy === false);
        const approvedFoods = this.state.foods.filter((food) => !(food.approvedBy === false));

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image style={{ height: 150 }} source={ require('../../assets/images/button_background_1.png') } />
                    <View style={styles.header} >
                    <Button
                        icon={
                        <Icon
                            name='chevron-left'
                            size={50}
                            color='white'
                            onPress={() => this.onSelect()}
                        />
                        }
                        buttonStyle={{ backgroundColor: "transparent",  elevation: 0, borderRadius: 0 }}
                        containerStyle={{ elevation: 0, borderRadius: 0, position: 'absolute', top: 0, left: 0 }}

                        title=''
                        />
                        <Text style={styles.headerText}>{ this.state.clientInfo.name }</Text>
                        <Avatar
                            size="xlarge"
                            rounded
                            source={{uri: this.state.clientInfo.photo }}
                            activeOpacity={0.7}
                            avatarStyle={{
                                borderWidth: 7,
                                borderColor: '#FFF',
                            }}
                        />
                    </View>
                    <Text style={{ padding: 30, fontSize: 28, fontWeight: 'bold' }}>
                        New Meals
                    </Text>
                    {
                        notApprovedFoods.map((food) => {
                            return (
                                <Card
                                    containerStyle={{ padding: 30, borderRadius: 25 }}
                                    key={food.id}
                                    title={(
                                        <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'flex-end' }}>
                                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                                {food.name}
                                            </Text>
                                            <Text style={{ fontSize: 18 }}>
                                                1 serving
                                            </Text>
                                        </View>
                                    )}
                                >
                                    <View style={{ alignItems: 'stretch', flexWrap: 'nowrap', flexDirection: 'row', marginBottom: 10 }}>
                                        <Image style={{ width: 150, height: 150 }} source={{ uri: food.url }}/>
                                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 15 }}>
                                            <Text style={{ fontSize: 18 }}>
                                                Carbs -
                                                {' '}
                                                {food.carbs}
                                            </Text>
                                            <Text style={{ fontSize: 18 }}>
                                                Protein -
                                                {' '}
                                                {food.protein}
                                            </Text>
                                            <Text style={{ fontSize: 18 }}>
                                                Fat -
                                                {' '}
                                                {food.fat}
                                            </Text>
                                        </View>
                                    </View>
                                    <FoodApprovalButtons
                                        handleApproveFood={() => this.handleApproveFood(food)}
                                        handleDenyFood={() => this.handleDenyFood(food)}
                                    />
                                </Card>
                            );
                        })
                    }
                    <Text style={{ padding: 30, fontSize: 28, fontWeight: 'bold' }}>
                        History
                    </Text>
                    <View>
                        {
                            approvedFoods.map((food) => {
                                return (
                                    <Fragment key={food.url}>
                                        <View
                                            style={{
                                                paddingHorizontal: 30,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Avatar
                                                size='large'
                                                rounded={false}
                                                source={{ uri: food.url }}
                                            />
                                            <Text style={{ fontSize: 24 }}>
                                                {food.name}
                                            </Text>
                                            {
                                                food.approvedBy === 'denied' ?
                                                    <Icon
                                                        size={32}
                                                        name='close'
                                                        color='#f50'
                                                    />
                                                    :
                                                    <Icon
                                                        size={32}
                                                        name='check'
                                                        color='#F8BA85'
                                                    />
                                            }
                                        </View>
                                        <Divider style={{ marginVertical: 10 }}/>
                                    </Fragment>
                                );
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
});
