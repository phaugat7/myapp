import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function NewListingButton({onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons
                    name="plus-circle"
                    color={colors.white}
                    size={40}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 40,
        borderColor: colors.white,
        borderWidth: 10,
        bottom: 25,
        justifyContent: 'center',
        height: 80,
        width: 80,
    }
});
export default NewListingButton;
