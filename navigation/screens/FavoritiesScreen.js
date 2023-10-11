import { useState, useEffect } from 'react';
import { FIRESTORE_DB } from '../../authentication/firebase';
import { FIREBASE_AUTH } from '../../authentication/firebase';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';

import Item from '../../components/advertisements/Item';
import { addDoc, collection,  serverTimestamp } from 'firebase/firestore';

const FavoritiesScreen = () => {

    const auth = FIREBASE_AUTH;
    const firestore = FIRESTORE_DB;

    const [isLoading, setIsLoading] = useState(false);
    const [favorities, setFavorities] = useState([]);


    const dummyItems = [
        {
            id: 0,
            img: 'https://img.freepik.com/premium-photo/modern-automobile-classic-technology-wheel-traffic_665346-119.jpg',
            title: 'Dodge Charger SRT',
            price: 230000,
            location: 'Skarżysko-Kamienna',
            timestamp: '23 sie, 13:30'
        },
        {
            id: 1,
            img: 'https://img.freepik.com/premium-photo/classic-sports-car-red_8353-3444.jpg',
            title: 'Ferrari 488 GTB',
            price: 350000,
            location: 'Warszawa',
            timestamp: '20 sie, 10:15'
        },
        {
            id: 2,
            img: 'https://img.freepik.com/premium-photo/luxury-car-front-view_1088-340.jpg',
            title: 'Mercedes-Benz S-Class',
            price: 400000,
            location: 'Kraków',
            timestamp: '19 sie, 18:45'
        },
        {
            id: 3,
            img: 'https://img.freepik.com/free-photo/new-car-near-showroom-car-dealer_7502-8093.jpg',
            title: 'Toyota Camry',
            price: 280000,
            location: 'Poznań',
            timestamp: '18 sie, 16:20'
        },
        {
            id: 4,
            img: 'https://img.freepik.com/premium-photo/sport-car-concept_385786-245.jpg',
            title: 'Porsche 911',
            price: 450000,
            location: 'Gdańsk',
            timestamp: '17 sie, 14:55'
        },
    ];

    return(
        <SafeAreaView style={{ flex: 1, marginHorizontal: 5 }}>
            <Text style={{ fontSize: 32, fontWeight: 600, margin: 15}}>Obserwowane</Text>

            {isLoading ? <ActivityIndicator color="indigo" size="large" style={{ flex: 1, alignContent: 'center', justifyContent: 'center',}} /> : null }
            
            {!isLoading && dummyItems.length === 5 ?
                (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon size="100" name="eye" type="entypo"/>
                    <Text style={{fontSize: 32, fontWeight: 600}}>Nie znaleziono ogłoszenia.</Text>
                    <Text style={{fontSize: 32, fontWeight: 600}}>Chętnie to dla Ciebie znajdę.</Text>
                </View>
                ) : null }

            {!isLoading ?
                (
                    <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 15 }}>
                        { dummyItems.map( (item, index) => (
                            <Item key={item.id} img={item.img} title={item.title} price={item.price} location={item.location} timestamp={null} />
                        )) }
                    </ScrollView>
                ) 
            : null }


            
        </SafeAreaView>
    )
}

export default FavoritiesScreen;