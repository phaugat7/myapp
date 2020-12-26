import React, {useState} from "react";
import {FlatList, StyleSheet} from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

const initialMessages = [
    {
        id: 1,
        title: "Micheal Coppola",
        description: 'A specialist doctor',
        image: require('../assets/home-banner.jpg')
    },
    {
        id: 2,
        title: "Dr. Mahesh Gopalan",
        description: 'NASA Scientist',
        image: require('../assets/dr-banner.png')
    }
]

function MessagesScreen(props) {

    const [messages, setMessages]= useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = message => {
        //Delete from message array
        //Call the server to delete the record from backend
        setMessages(messages.filter(m => m.id !== message.id));
    }

    return (
        <Screen>
            <FlatList
                data={messages}
                keyExtractor={(message) => message.id.toString()}
                renderItem={({item}) =>
                    <ListItem
                        title={item.title}
                        subTitle={item.description}
                        image={item.image}
                        onPress={() => console.log("Message Selected", item)}
                        renderRightActions={() => (
                            <ListItemDeleteAction onPress={() => handleDelete(item)}/>
                        )}
                    />}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    setMessages([
                        {
                            id: 2,
                            title: "Dr. Mahesh Gopalan",
                            description: 'NASA Scientist',
                            image: require('../assets/dr-banner.png')
                        }
                    ])
                }}
            />
        </Screen>
    )
};

const styles = StyleSheet.create({})
export default MessagesScreen;
