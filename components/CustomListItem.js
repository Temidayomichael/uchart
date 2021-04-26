import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';


const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
     const unsubscribe = db.collection('chat').doc(id).collection('messages').orderBy("timeStamp", "desc").onSnapshot((snapshot) => {
              
            setChatMessages(
                snapshot.docs.map(doc => 
                    doc.data()
              )
                     
         )
        
        });
        return unsubscribe
    })
    return (
        <View>
            <ListItem key={id} bottomDivider onPress={()=> enterChat(id,chatName)} >
                <Avatar
                    rounded
                    source={{
                       
                        uri:  chatMessages?.[0]?.photoURL || "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "800" }}>{chatName}</ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >{chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
 
})
