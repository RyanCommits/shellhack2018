import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Clarifai from 'clarifai';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera, Permissions } from 'expo';
import { wrapWithContext } from 'components/wrapWithContext';
import { uploadImage } from '../../lib/uploads';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        
    },
    reviewContainer: {
        flex: 1,
        padding: 30,
    },
    foodImage: {
        height: Dimensions.get('screen').width * 0.75,
    },
    titleRow: {
        marginTop: 25,
        paddingBottom: 5,
        flexDirection: 'row',
        borderBottomColor: '#F8BA85',
        borderBottomWidth: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    largeText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    normalText: {
        fontSize: 24,
    },
});

export const CameraView = withNavigationFocus(wrapWithContext(class CameraView extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        foodName: '',
        imageUri: null,
        loaded: true,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    cameraRef = React.createRef();

    takePicture = async () => {
        const { app } = this.props;

        this.props.showLoader();
        this.setState({ loaded: false });

        process.nextTick = setImmediate;
        this.cameraRef.current.takePictureAsync({
            allowEditing: true,
            base64: true,
            quality: 0.99,
        })
            .then((image) => {
                this.setState({ imageUri: image.uri });

                return this.predictImage(app, image);
            })
            .catch((err) => {
                this.props.hideLoader();
                this.setState({ loaded: true });
                console.log(err, 'error');
            });
    }

    predictImage = (app, { base64 }) => {
        app.models.predict(Clarifai.FOOD_MODEL, { base64 })
            .then((res) => {
                const foodName = res.outputs[0].data.concepts[0].name;

                this.setState({ foodName });
                this.setState({ loaded: true });
                this.props.hideLoader();
                return foodName;
            })
            .catch((err) => {
                this.setState({ loaded: true });
                this.props.hideLoader();
                console.log(err);
            });
    };

    sendImageToTrainer = async () => {
        const response = await fetch(this.state.imageUri);
        const blob = await response.blob();

        await uploadImage(
            blob,
            this.props.uid,
            { name: this.state.foodName }
        );

        this.onCancel();
    }

    onCancel = () => {
        this.setState({
            imageUri: null,
        });
    }

    render() {
        const { hasCameraPermission } = this.state;

        // RN never unmounts camera. Unmount camera manually
        if (hasCameraPermission === null || !this.props.navigation.isFocused()) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return (
                <Text>
                    No access to camera
                </Text>
            );
        }

        if (this.state.imageUri && this.state.loaded) {
            return (
                <View style={styles.reviewContainer}>
                    <Image style={styles.foodImage} source={{ uri: this.state.imageUri }}></Image>
                    <View style={styles.titleRow}>
                        <Text style={styles.largeText}>
                            {this.state.foodName}
                        </Text>
                        <Text style={styles.normalText}>
                                1 cup
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            containerStyle={{
                                borderRadius: 25,
                            }}
                            buttonStyle={{
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderRadius: 25,
                                backgroundColor: '#F8BA85',
                                borderWidth: 0,
                            }}
                            titleStyle={{ fontSize: 18 }}
                            title="Send To Nutritionist!"
                            raised
                            onPress={this.sendImageToTrainer}
                        />
                        <Button
                            containerStyle={{
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 0,
                                elevation: 0,
                            }}
                            buttonStyle={{
                                elevation: 0,
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 0,
                            }}
                            titleStyle={{ fontSize: 18, color: '#F8BA85' }}
                            title="Cancel"
                            onPress={this.onCancel}
                        />
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Camera
                    style={styles.cameraContainer}
                    type={this.state.type}
                    ref={this.cameraRef}
                >
                    <View
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            height: 85,
                            marginBottom: 15,
                        }}
                    >
                        <Button
                            onPress={this.takePicture}
                            title=''
                            buttonStyle={{
                            backgroundColor: "#fff",
                            opacity: 0.7,
                            width: 60,
                            height: 60,
                            borderColor: "transparent",
                            borderWidth: 0,
                            marginBottom: -180,
                            borderRadius: 33
                            }}
                        />
                        <Button
                            onPress={this.takePicture}
                            title=''
                            buttonStyle={{
                            backgroundColor: "#fff",
                            opacity: 0.6,
                            width: 80,
                            height: 80,
                            borderColor: "transparent",
                            borderWidth: 0,
                            marginTop: -10,
                            borderRadius: 40
                            }}
                        />
                    </View>
                </Camera>
            </View>
        );
    }
}));
