import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Avatar } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_FONT_SIZE = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        paddingHorizontal: 30,
    },
    headerStyle: {
        color: 'green',
        fontSize: DEFAULT_FONT_SIZE * 1.2,
        marginBottom: 50,
    },
    textStyle: {
        fontSize: DEFAULT_FONT_SIZE,
        textAlign: 'center',
        marginTop: 50,
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
                    <Text style={styles.headerStyle}>
                        {slide.header}
                    </Text>

                    <Avatar size="xlarge" rounded source={ slide.image }/>

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
