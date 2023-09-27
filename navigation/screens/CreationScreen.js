import * as React from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { FIRESTORE_DB } from '../../authentication/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Carousel from 'react-native-reanimated-carousel';

import { useNavigation } from '@react-navigation/native';

const CreationScreen = ({navigation}) => {

    const [formData, setFormData] = useState({ img: '', title: '', price: '', location: '', timestamp: null});
    const [photosArray, setPhotosArray] = useState(null);

    const handleFormReset = () => {
        setFormData({ title: '', price: '', location: ''});
    }

    const navigate = useNavigation();

    const handleItemAdd = async () => {
        try {

            if(formData.title.trim() === '') return;
            if(formData.price.trim() === '') return;
            if(formData.location.trim() == '') return;

            const newElement = {
                img: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/cfe15a14-d615-43c3-c0b4-145c8c775c00/width=450/321171.jpeg',
                title: formData.title.trim(),
                price: formData.price.trim(),
                location: formData.location.trim(),
                timestamp: serverTimestamp()
            };
            const collectionRef = collection(FIRESTORE_DB, 'items');
            const docRef = await addDoc(collectionRef, newElement);
            navigate.navigate('Home');

        } catch (error) {
            console.error("Wystąpił błąd podczas dodawania ogłoszenia", error);
        }
    }

    const slides = [
        { id: 1, text: 'Slide 1', backgroundColor: 'lightblue' },
        { id: 2, text: 'Slide 2', backgroundColor: 'lightgreen' },
    ];

    const width = Dimensions.get('window').width;

    return(
        <SafeAreaView style={{ flex: 1, marginHorizontal: 5 }}>
            <Text style={{ fontSize: 32, fontWeight: 600, margin: 15}}>Dodaj ogłoszenie</Text>
            <View style={{ marginHorizontal: 15}}>
                <TouchableOpacity>
                    <View style={style.photo}>
                        <Icon size="30" name="upload" type="entypo" />
                    </View>
                </TouchableOpacity>
                {photosArray ? 
                    ( <View style={styles.container}>
                        <Carousel
                            data={slides}
                            renderItem={({ item }) => (
                                <View
                                style={[styles.slide, { backgroundColor: item.backgroundColor }]}
                                >
                                <Text style={styles.text}>{item.text}</Text>
                                </View>
                            )}
                            width={width} height={width / 2}
                        />
                    </View> ) : null}
                <TextInput
                    style={style.input}
                    placeholder="Nazwa ogłoszenia np. BMW E46"
                    onChangeText={text => setFormData({ ...formData, title: text })}
                    value={formData.title}
                />
                <TextInput
                    style={style.input}
                    placeholder="Cena"
                    onChangeText={text => setFormData({ ...formData, price: text })}
                    value={formData.price}
                />
                <TextInput
                    style={style.input}
                    placeholder="Lokalizacja"
                    onChangeText={text => setFormData({ ...formData, location: text })}
                    value={formData.location}
                />
                <View style={{ marginTop: 15}}>
                    <Button style={style.button} icon="" mode="outlined" onPress={handleFormReset}>
                        Zresetuj
                    </Button>
                    <Button style={style.button} icon="" mode="contained" onPress={handleItemAdd}>
                        Dodaj
                    </Button>
                </View>
            </View>
        </SafeAreaView>

        
    )
}

const style = StyleSheet.create({
    photo: {
        height: 250,
        backgroundColor: '#fff',
        borderWidth: .5,
        borderRadius: 3,
        borderColor: '#ccc',
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: .5,
        borderRadius: 3,
        borderColor: "#ccc",
        marginVertical: 4

    },
    button: {
        marginVertical: 5,
    }
})

const styles = StyleSheet.create({
    slide: {
      width: 350,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });

export default CreationScreen;