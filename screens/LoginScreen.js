import {StatusBar} from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { Linking } from 'react-native';
import { StyleSheet, Text, View,Image } from 'react-native'
import { Button, Input } from "react-native-elements";
import { SocialIcon } from 'react-native-elements/dist/social/SocialIcon';
import { round } from 'react-native-reanimated';
import { auth } from '../firebase';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
               navigation.replace('Home')
           }
       })
        return unsubscribe;
    }, [])


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="dark" />
          
            <Image
                source={require('../assets/logo.png')}
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 20,
                }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button onPress={signIn} title="Login"
                buttonStyle={{
                width: 300,
                marginTop: 10,
                backgroundColor: "#41bebd"
            }} />
            {/* <Button containerStyle={styles.button} onPress={() => { navigation.navigate('Register') }} type="outline" title="Register" /> */}
            <Text
                style={{ color: '#0000FF', marginVertical: 25 }}
                onPress={() => { Linking.openURL('http://www.example.com/') }}
            >
                Forget Password?
  </Text>
            <SocialIcon
                title='Sign In With Facebook'
                button
                type='facebook'
                style={{ ...styles.socialIcon, backgroundColor: "#e9ecfe" }}
                light
                   
            />

            <SocialIcon
                title='Sign In With Google'
                button
                type='google'
                style={{ ...styles.socialIcon, backgroundColor: "#ffedef" }}
                light
            />
            <Text
                style={{ color: '#0000FF', marginVertical: 25 }}
                onPress={() => { navigation.navigate('Register') }}
            >
                Don't have an account? Register
  </Text>
            <View>
              
            </View>
     
        </KeyboardAvoidingView>
        
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      backgroundColor:"white"
    },
    inputContainer: {
        width: 300,
        marginTop:20
        
    },
     socialIcon: {
        width: 300,
        borderRadius: 5,
        height: 50,
        
    }

})
