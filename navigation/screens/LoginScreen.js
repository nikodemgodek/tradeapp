import { View, Text, SafeAreaView, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import { FIREBASE_AUTH } from '../../authentication/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';


const LoginScreen = () => {
    const auth = FIREBASE_AUTH;

    const [inputLogin, setInputLogin] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const navigation = useNavigation();

    const login = async (email, password) => {
        try {
            const responseLogin = await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Logged in successfully!");
            })
        } catch (error) {
            console.error("Blad: ", error.message);
            handleLoginError();
        }
    }

    const [errorMessage, setErrorMessage] = useState(false);
    const handleLoginError = () => {
        setErrorMessage(true);
        setTimeout(() => {
            setErrorMessage(false);
        }, 3000);
    }

    const hideKeyboard = () => {
        Keyboard.dismiss();
    }

    const handleRegisterNavigate = () => {
        navigation.navigate('Register');
    }

    return(
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' , margin: 20,}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon size="100" name="price-tag" type="entypo" color="indigo" />
                <Text style={style.brandingText}>Trade App</Text>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={hideKeyboard}>
                    <View style={{flex: 1, marginHorizontal: 20}}>
                        <Text style={{ fontSize: 32, fontWeight: 600, marginVertical: 15}}>Log In</Text>
                        <TextInput style={style.input} placeholder="Email" value={inputLogin} onChangeText={text => setInputLogin(text)}/>
                        <TextInput style={style.input} placeholder="Password" value={inputPassword} onChangeText={text => setInputPassword(text)} secureTextEntry/>
                        {errorMessage ? <Text style={style.error}>Login or password incorrect. Try again.</Text> : null}
                        <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                            <Button style={style.button} mode="outlined" onPress={() => login(inputLogin, inputPassword)}>
                                Login
                            </Button>
                            <Text style={{marginVertical: 10}}>or</Text>
                            <Button style={style.button} mode="contained" onPress={() => handleRegisterNavigate()}>
                                Create account
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    input: {
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
        width: '100%',
    },
    button : {
        width: '100%'
    },
    brandingText: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: 600,
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -0, height: 1},
        textShadowRadius: 1
    },
    error: { 
        color: '#ff0000',
    }
    
})

export default LoginScreen;