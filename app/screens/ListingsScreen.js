import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";


import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from '../api/listing';
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";

function ListingsScreen({navigation}) {
    const {data: listings, error, loading, request: loadListings} = useApi(listingsApi.getListings);

    useEffect(() => {
        loadListings();
    }, [])


    return (
        <>
            <ActivityIndicator visible={loading}/>
            <Screen style={styles.screen}>
                {error && <>
                    <AppText>Couldn't retrieve the listing.</AppText>
                    <AppButton title="Retry" onPress={loadListings}/>
                </>}

                <FlatList
                    data={listings}
                    keyExtractor={listing => listing.id.toString()}
                    renderItem={({item}) =>
                        <Card
                            imageUrl={item.images[0] && item.images[0].url}
                            title={item.title}
                            subTitle={"$" + item.price}
                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                        />
                    }
                />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light
    }
})

export default ListingsScreen;
