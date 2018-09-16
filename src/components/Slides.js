import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        width: SCREEN_WIDTH,
        marginTop: 30,
    },
    headerStyle: {
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 28,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 30,
    },
    buttonContainerStyle: {
        marginTop: 85,
        borderRadius: 25,
    },
    buttonStyle: {
        borderRadius: 25,
        backgroundColor: '#F8BA85',
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
});

export class Slides extends Component {
    renderSlides() {
        return this.props.data.map((slide, i) => {
            if (i === this.props.data.length - 1) {
                return (
                    <ImageBackground
                        key={slide.id}
                        resizeMode='cover'
                        style={[styles.slide, { paddingTop: 150, alignItems: 'center' }]}
                        source={require('../../assets/images/background_1.png')}
                    >
                        <Image
                            source={require('../../assets/images/logo1.png')}
                            resizeMode='contain'
                            style={{
                                height: 100,
                                width: '85%',
                            }}
                        >
                        </Image>
                        <Button
                            title="LOG IN WITH FACEBOOK"
                            raised
                            containerStyle={styles.buttonContainerStyle}
                            buttonStyle={styles.buttonStyle}
                            onPress={this.props.onComplete}
                        />
                    </ImageBackground>
                );
            }

            return (
                <View
                    key={slide.id}
                    style={styles.slide}
                >
                    <Image
                        source={slide.image}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: 360,
                        }}
                    />
                    <Text style={styles.headerStyle}>
                        {slide.header}
                    </Text>

                    <Text style={styles.textStyle}>
                        {slide.text}
                    </Text>
                </View>
            );
        });
    }
    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                styles={styles.container}
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

Slides.propTypes = {
    data: PropTypes.array,
    onComplete: PropTypes.func,
};
