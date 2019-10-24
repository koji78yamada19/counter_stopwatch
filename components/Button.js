import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Button extends React.Component {
    render() {

        return (
            <TouchableOpacity
                onPress={this.props.function}
                style={[styles.btn, this.props.style]}
            >

                <Text style={styles.btnText}>{this.props.text}</Text>

            </TouchableOpacity>

        )
    }
}
const styles = StyleSheet.create({
    btn: {
        height: 45,
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 20,
        color: "#fff"
    },
})
