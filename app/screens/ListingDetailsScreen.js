import React from "react";
import {View, StyleSheet, KeyboardAvoidingView, Platform} from "react-native";
import {Image} from 'react-native-expo-image-cache';
import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import ActivityIndicator from "../components/ActivityIndicator";
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({route}) {
    const listing = route.params;
    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
            <Image
                style={styles.image}
                preview={{uri: listing.images[0].thumbnailUrl}}
                uri={listing.images[0].url}/>
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.subTitle}>{listing.price}</AppText>
                <View style={styles.userContainer}>
                    <ListItem
                        image={require("../assets/homepage.png")}
                        title="Ashu Phaugat"
                        subTitle="5 Listings"
                    />
                </View>
                <ContactSellerForm listing={listing}/>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20,

    },
    image: {
        width: '100%',
        height: 300
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 24,
        marginVertical: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "500"
    },
    userContainer: {
        marginVertical: 10
    }
});
export default ListingDetailsScreen;
