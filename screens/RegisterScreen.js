import {StatusBar} from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View,Image } from 'react-native'
import { Button, Input,Text } from "react-native-elements";
import { auth } from '../firebase';


const RegisterScreen = ({ navigation }) => {
    const [newUser, setNewUser] = useState({
        fullname: '',
        email: '',
        password: '',
        imageUrl: ''
    })

    const register = () => {
        auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(authUser =>{
                authUser.user.updateProfile({
                    displayName: newUser.name,
                    photoURL: newUser.imageUrl || "https://th.bing.com/th/id/OIP.hxRValICG6OlXI56NUfSjAHaF1?pid=ImgDet&rs=1"
                })
            }).catch(error => alert(error.message))
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back"
        })
    }, [navigation])
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 30 }}>
                Create a Uchat account
                </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Fullname'
                    autoFocus type="text"
                    value={newUser.fullname}
                    onChangeText={(text) => { setNewUser({ ...newUser, fullname: text }) }}
                />
                <Input
                    placeholder='Email'
                    type="email"
                    value={newUser.email}
                    onChangeText={(text) => { setNewUser({ ...newUser, email: text }) }}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type="password"
                    value={newUser.password}
                    onChangeText={(text) => { setNewUser({ ...newUser, password: text }) }}
                />
              
                <Input
                    placeholder='Profile picture URL (Optional)'
                    type="image"
                    value={newUser.imageUrl}
                    onChangeText={(text) => { setNewUser({ ...newUser, imageUrl: text }) }}
                    onSubmitEditing={register}
                />
            </View>
            <Button raised
                onPress={register}
                title="Register" buttonStyle={{
                width: 300,
                marginTop: 10, backgroundColor: "#41bebd"
            }} />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
        
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
        
    },
 

})
