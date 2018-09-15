import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Clarifai from 'clarifai';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
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
        marginTop: 30,
        alignItems: 'center',
    },
    foodImage: {
        width: Dimensions.get('screen').width * 0.75,
        height: Dimensions.get('screen').width * 0.75,
    },
    foodDetailsContainer: {
        flex: 1,
        paddingTop: 30,
    },
    titleRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
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
            .then(async (image) => {
                this.setState({ imageUri: image.uri });

                const response = await fetch(image.uri);
                const blob = await response.blob();

                uploadImage(
                    blob,
                    this.props.uid,
                );

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
                    <View style={styles.foodDetailsContainer}>
                        <View style={styles.titleRow}>
                            <Text>
                                {this.state.foodName}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Send To Nutritionist!"
                            raised
                            // onPress={this.props.onComplete}
                        />
                        <Button
                            title="Cancel!"
                            raised
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
