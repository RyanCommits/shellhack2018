import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class LoadingOverlay extends Component {
    static defaultProps = {
        visible: false,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType={'fade'}
                onRequestClose={() => ''}
                transparent
                visible={this.props.visible}
            >
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            </Modal>
        );
    }
}
