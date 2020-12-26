import React from "react";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import {FlatList, StyleSheet, View} from "react-native";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/ListItemSeparator";
import useAuth from "../auth/useAuth";

const menuItems = [
    {
        title: "My Listing",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary
        }
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary
        },
        targetScreen: "Messages"
    }
]

function AccountScreen({navigation}) {
    const {user, logout} = useAuth();

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.name}
                    subTitle={user.email}
                    image={require('../assets/dr-banner.png')}/>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={mentuItem => mentuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({item}) =>
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    }
                />
            </View>
            <ListItem
                title="Log out"
                IconComponent={
                    <Icon name="logout" backgroundColor='#ffe66d'/>
                }
                onPress={() => logout()}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    screen: {
        backgroundColor: colors.light
    }
})
export default AccountScreen;
