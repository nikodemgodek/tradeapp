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

    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
        displayNameError: '',
        phoneError: ''
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
                    console.log('dupa');
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

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }
    
    const handleEmailValidation = () => {
        if(!validateEmail(formState.email)) {
            setError({emailError: 'Email is incorrect'})
        }
    }

    const validatePassword = (password, confirmPassword) => {
        if(password !== confirmPassword) {
            return 'Passwords are different'
        }

        if(password.length < 8) {
            return 'Password should have minimum 8 letters'
        }

        return null;
    }

    const handlePasswordValidation = () => {
        const validationMessage = validatePassword(formState.password, formState.confirm_password);
        if(validationMessage) {
            setError({passwordError: validationMessage})
        }else{
            setError({passwordError: ''})
        }
    }

    const validateDisplayName = (displayName) => {
        if(displayName === '') {
            return 'Display name is required'
        }

        if(displayName.length <= 2) {
            return 'Display name cannot be short more than 2'
        }
        
        return null;
    }

    const handleDisplayNameValidation = () => {
        const validationMessage = validateDisplayName(formState.displayName);

        if(validationMessage) {
            setError({displayNameError: validationMessage})
        }
    }

    const validatePhoneNumber = (phoneNumber) => {
        // Wyrażenie regularne sprawdzające format numeru telefonu
        const phoneRegex = /^[0-9]{6,14}$/;
    
        if (!phoneRegex.test(phoneNumber)) {
          return 'Phone number is invalid';
        }
        return null; // Numer telefonu jest poprawny
      };
    
      const handlePhoneValidation = () => {
        const validationMessage = validatePhoneNumber(formState.phone);
        if (validationMessage) {
          setError({phoneError: validationMessage})
        } else {
            setError({phoneError: ''})
        }
      };

    return(
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' , margin: 20,}}>
            <Text style={style.label}>Register</Text>
            <TextInput style={style.input} placeholder="Email" value={formState.email} onChangeText={text => setFormState({...formState, email: text})} onBlur={handleEmailValidation}/>
            <Text style={style.error}>{error.emailError}</Text>
            <View style={style.Row}>
                <TextInput style={style.RowInput} secureTextEntry placeholder="Password" value={formState.password} onChangeText={text => setFormState({...formState, password: text})}/>
                <TextInput style={style.RowInput} secureTextEntry placeholder="Confirm password" value={formState.confirm_password} onChangeText={text => setFormState({...formState, confirm_password: text})} onBlur={handlePasswordValidation}/>
            </View>
            <Text style={style.error}>{error.passwordError}</Text>
            <TextInput style={style.input} placeholder="Display name" value={formState.displayName} onChangeText={text => setFormState({...formState, displayName: text})} onBlur={handleDisplayNameValidation}/>
            <Text style={style.error}>{error.displayNameError}</Text>
            <TextInput style={style.input} keyboardType="text" placeholder="Phone number" value={formState.phone} onChangeText={text => setFormState({...formState, phone: text})} onBlur={handlePhoneValidation}/>
            <Text style={style.error}>{error.phoneError}</Text>

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