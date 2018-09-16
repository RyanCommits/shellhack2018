import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { wrapWithContext } from 'components/wrapWithContext';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 15,
        width: '75%',
    },
    titleText: {
        color: '#383B41',
        fontSize: 30,
        fontWeight: 'bold',
    },
    titlePercentage: {
        color: '#383B41',
        fontSize: 35,
        fontWeight: 'bold',
    },
    mealContainter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%',
    },
    mealInnerContainter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mealText: {
        color: '#383B41',
        fontSize: 20,
        marginLeft: 10,
    }
});

export const SuccessLogs = wrapWithContext(class SuccessLogs extends Component {
    state = {
        approvedVotes: 0,
        deniedVotes: 0,
        pendingVotes: 0,
    };

    componentDidMount() {
        const ref = firebase.database().ref(`foods/${this.props.uid}`);

        ref.on('child_added', (snapshot) => {
            const votes = snapshot.val();
            console.log()
            if(votes.approvedBy == 'denied') {
                this.setState((prevState) => ({
                    deniedVotes: prevState.deniedVotes + 1,
                }));
            }
            else if(votes.approvedBy){
                this.setState((prevState) => ({
                    approvedVotes: prevState.approvedVotes + 1,
                }));
            }
            else{
                this.setState((prevState) => ({
                    pendingVotes: prevState.pendingVotes + 1,
                }));
            }
        });
    }

    getPercentage = () => {
        sum = this.state.approvedVotes + this.state.deniedVotes
        if(sum == 0){
            return 0;
        }
        return (this.state.approvedVotes/sum) * 100;
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={ styles.title }>
                    <Text style={ styles.titleText }>
                        {`Your score is ${this.getPercentage().toPrecision(3)}%`}
                    </Text>
                </View>
                <Image source={ require('../../assets/images/trophy.png') } />
                <View style={ styles.mealContainter }>
                    <View style={ styles.mealInnerContainter } >
                        <Icon size={40} color='#FFD57A' name='check' type='evilicon' />
                        <Text style={ styles.mealText } >Approved Meals</Text>
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: '900', }}>{ this.state.approvedVotes }</Text>
                </View>
                <View style={ styles.mealContainter }>
                    <View style={ styles.mealInnerContainter } >
                        <Icon size={40} color='#F7B789' name='spinner-3' type='evilicon' />
                        <Text style={ styles.mealText } >Pending Meals</Text>
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: '900', }}>{ this.state.pendingVotes }</Text>
                </View>
                <View style={ styles.mealContainter }>
                    <View style={ styles.mealInnerContainter } >
                        <Icon size={40} color='#EA7070' name='close-o' type='evilicon' />
                        <Text style={ styles.mealText } >Rejected Meals</Text>
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: '900', }}>{ this.state.deniedVotes }</Text>
                </View>
            </View>
        );
    }
});