import React, { useEffect, useLayoutEffect,useState } from 'react'
import { Avatar } from 'react-native-elements';
import { MaterialIcons,AntDesign,Feather } from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import {
    Platform,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db,auth } from '../firebase';
import firebase from 'firebase';


const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    useEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View
                    style={
                        {
                            flexDirection: "row",
                            alignItems: "center"
                        }
                    }
                >
                    <Avatar
                        rounded
                        source={{
                            uri: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                        }}
                    />
                    <Text style={{ fontWeight: "700", marginLeft: 10, color: "white" }}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: 20,
                        width: 80

                    }}
                >
                    <TouchableOpacity>
                        <AntDesign name="camerao" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation,messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        if (input) {
            db.collection('chat').doc(route.params.id).collection('messages').add({
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
            })
            setInput("");
        }
    }
  
    useLayoutEffect(() => {
        const unsubscribe = db.collection('chat').doc(route.params.id).collection('messages').orderBy("timeStamp", "asc").onSnapshot((snapshot) => {
              
            setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
                     
            )
        });
        return unsubscribe

    }, [route]);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "white"
        }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {
                               
                                messages.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                        <View key={id} style={styles.receiver}>
                                            <Avatar
                                                //web
                                                containerStyle={{
                                                    position: "absolute",
                                                    bottom: -15,
                                                    right: -5
                                                    
                                                 }}
                                                position="absolute"
                                                rounded
                                                size={30}
                                                bottom={-15}
                                                right={-5}
                                                source={{
                                                    uri: data.photoURL,
                                                }}
                                            />
                                            <Text style={styles.receiverText}>{data.message}</Text>
                                        </View>
                                    ) : (
                                        <View key={id} style={styles.sender}>
                                            <Avatar   //web
                                                containerStyle={{
                                                    position: "absolute",
                                                    bottom: -15,
                                                    left: -5
                                                    
                                                 }}
                                                position="absolute"
                                                rounded
                                                size={30}
                                                bottom={-15}
                                                left={-5}
                                                source={{
                                                    uri: data.photoURL,
                                                }} />
                                            <Text style={styles.SenderText}>{data.message}</Text>
                                        </View>
                                      
                                    )
                                        
                                ))
                            }
                        </ScrollView>
                        <View style={styles.footer} >
                            <TextInput
                                placeholder="New Message"
                                style={styles.textInput}
                                value={input}
                                onChangeText={(text) => { setInput(text) }}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity="0.5" >
                                <Feather name="send" size={24} style={{ padding: 5 }} color="black" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding:15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginLeft: 15,
        borderColor: "transparent",
        padding: 10,
        color: "grey",
        borderRadius: 30,
        backgroundColor: "#ECECEC"
    },
    receiverText: {
        fontWeight: "500",
        marginLeft: 10
    },
    SenderText: {
        fontWeight: "500",
        marginLeft: 10
        },
    receiver: {
        position: "relative",
        maxWidth: "80%",
        marginBottom: 20,
        borderRadius: 10,
        marginRight: 20,
        alignSelf: "flex-end",
        padding: 15,
        marginVertical:7,
        backgroundColor: "#d7f1f1"
    },
    sender: {
position: "relative",
        maxWidth: "80%",
        marginBottom: 20,
        borderRadius: 10,
        marginRight: 20,
        alignSelf: "flex-start",
        padding: 15,
        backgroundColor: "#ECECEC"
    }
})
