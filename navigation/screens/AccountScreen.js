import { useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../authentication/firebase';
import { Button } from 'react-native';

const AccountScreen = ( { navigation } ) => {
    const auth = FIREBASE_AUTH;
    
    const displayName = auth.currentUser.displayName;
    const avatarPath = auth.currentUser.photoURL;

    const handleSignOut = () => {
        auth.signOut();
    }

    return(
        <SafeAreaView style={{ flex: 1}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 100}}
                    source={{ uri: avatarPath}}
                />
                <Text style={style.currentUserName}>{auth.currentUser ? displayName : 'Niezalogowany'}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20}}>
                <Button 
                    title="Wyloguj się" 
                    color="#ff0000"
                    onPress={handleSignOut}/>
            </View>
            
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    currentUserName: {
        fontWeight: 600,
        fontSize: 24,
        marginTop: 15
    }
})
export default AccountScreen;