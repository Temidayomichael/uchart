import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StatusBar, View ,TouchableOpacity,Text} from 'react-native'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Button,Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 

const HomeScreen = ({ navigation }) => {
    
    const [chats, setChats] = useState([]);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chat').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data:doc.data()
            })))
        })
        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Uchat",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: "black", fontWeight: "800" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }} >
                    <TouchableOpacity onPress={signOutUser} activeOpacity="0.5">
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    marginRight: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 70
                }} >
                    <TouchableOpacity activeOpacity="0.5">
                        <AntDesign name="camerao" size={26} color="#41bebd" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate('AddChat')} activeOpacity="0.5">
                        <FontAwesome name="pencil-square-o" size={24} color="#41bebd" />
                    </TouchableOpacity>
                </View>
            )
        })
       
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        });
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chats.map(({id, data: {chatName}}) => (
                <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />     
                    ))
                }
            </ScrollView>
                      
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:
        { height: "100%" }
})
