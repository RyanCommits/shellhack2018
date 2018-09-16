import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
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
        marginBottom: 20,
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 30,
    },
    buttonContainerStyle: {
        marginTop: 15,
    },
    buttonStyle: {
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
});

export class Slides extends Component {
    renderSlides() {
        return this.props.data.map((slide, i) => {
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

                    {
                        i === this.props.data.length - 1 &&
                            <Button
                                title="Let's Get Started!"
                                raised
                                containerStyle={styles.buttonContainerStyle}
                                buttonStyle={styles.buttonStyle}
                                onPress={this.props.onComplete}
                            />
                    }
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
