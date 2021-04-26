import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
    const [inputChatName, setInputChatName] = useState("");

    const createChat = async () => {
        await db.collection('chat').add({
            chatName: inputChatName,
        }).then(() => {
            navigation.goBack()
        }).catch(error => alert(error.message))
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats"
        })
    }, [])

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={inputChatName}
                onSubmitEditing={createChat}
                onChangeText={(text) => setInputChatName(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size="24" color="#41bebd" />
                }
            />
            <Button buttonStyle={{
                width: 300,
                marginTop: 10,
                backgroundColor: "#41bebd",
                color: "white"
            }}
                disabled={!inputChatName}
                onPress={createChat} title="Create new chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height:"100%"
    }
})
