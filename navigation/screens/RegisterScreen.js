import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Icon, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FIREBASE_AUTH } from '../../authentication/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterScreen = () => {
    
    const auth = FIREBASE_AUTH;

    const [formState, setFormState] = useState({
        email: '',
        password: '',
        confirm_password: '',
        displayName: '',
        phone: ''
    })

    const hideKeyboard = () => {
        Keyboard.dismiss();
    }

    const handleRegister = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, formState.email, formState.password)
            .then(async () => {

                await updateProfile(auth.currentUser, {
                    displayName: formState.displayName,
                    photoURL: 'https://static.prsa.pl/images/90f30d6e-915a-46a2-b860-6fb270ede5b6.jpg',
                })
                .then(() => {
                    console.log("updated profile");
                });

            })

            await signInWithEmailAndPassword(auth, formState.email, formState.password)
            .then(() => {
                console.log("Z automatu zalogowany");

            })

           
        } catch (e) {
            console.log("Blad", e);
        }
    }

    return(
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' , margin: 20,}}>
            <Text style={style.label}>Register</Text>
            <TextInput style={style.input} placeholder="Email" value={formState.email} onChangeText={text => setFormState({...formState, email: text})} />
            <Text style={style.error}>Email is required.</Text>
            <View style={style.Row}>
                <TextInput style={style.RowInput} secureTextEntry placeholder="Password" value={formState.password} onChangeText={text => setFormState({...formState, password: text})}  />
                <TextInput style={style.RowInput} secureTextEntry placeholder="Confirm password" value={formState.confirm_password} onChangeText={text => setFormState({...formState, confirm_password: text})} />
            </View>
            <Text style={style.error}>Passwords are different.</Text>
            <TextInput style={style.input} placeholder="Display name" value={formState.displayName} onChangeText={text => setFormState({...formState, displayName: text})} />
            <Text style={style.error}>Display name is required.</Text>
            <TextInput style={style.input} placeholder="Phone number" value={formState.phone} onChangeText={text => setFormState({...formState, phone: text})} />
            <Text style={style.error}>Phone number is required.</Text>

            <Button style={style.buttonRegister} mode="contained" onPress={handleRegister}>
                Register
            </Button>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    Row: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'no-wrap',
        justifyContent: 'space-between'
    },
    RowInput: {
        width: '48%',
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
        marginVertical: 5
    },
    error: {
        color: 'red', 
    },
    input: {
        marginVertical: 5,
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
        width: '100%',
    },
    label: {
        fontSize: 32,
        fontWeight: 600,
        marginVertical: 15
    },
    buttonRegister: {
        marginTop: 100,
    }
});

export default RegisterScreen;