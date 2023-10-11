import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import * as React from 'react';

import { Icon } from 'react-native-elements';
import { Button } from 'react-native-paper';

import { Image } from 'react-native-elements';
import Search from '../../components/Search';

import { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import Categories from '../../components/Categories';
import FilteredScreen from '../../pages/FilteredScreen';
import { ScrollView } from 'react-native';
import Item from '../../components/advertisements/Item';

import { FIRESTORE_DB, FIREBASE_AUTH } from '../../authentication/firebase';
import { Firestore, collection, getDocs } from 'firebase/firestore';

import { RefreshControl } from 'react-native';
import { updateProfile } from 'firebase/auth';

const state = 2;

// 1 - home
// 2 - search - user inserted input to search bar and next page displayed.


const HomeScreen = ({navigation}) => {

    const auth = FIREBASE_AUTH;
    console.log(auth.currentUser.uid);

    const navigate = useNavigation();
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

    const tmp = [
        { recentSearchTxt: 'Kołpaki Aprilia SR 50'},
        { recentSearchTxt: 'Yamaha FZ6n s2'},
        { recentSearchTxt: 'BMW E46 328'},
        { recentSearchTxt: 'bmx'},
        { recentSearchTxt: 'djdj'},
    ]

    const [isLoading, setIsLoading] = useState(false);
    const [itemsList, setItemsList] = useState(dummyItems);
    const [recentSearch, setRecentSearch] = useState(tmp);

    const [searchInput, setSearchInput] = useState('');
    const [searchInputClicked, setSearchInputClicked] = useState(false);

    const [firestoreDataItems, setFirestoreDataItems] = useState([]);
    const [adverisements, setAdvertisements] = useState(firestoreDataItems);

    const removeFromRecentSearches = (txtToRemove) => {
    
        const recentSearchCopy = [...recentSearch];
        const updatedCollection = recentSearchCopy.filter(item => item.recentSearchTxt !== txtToRemove);
        setRecentSearch(updatedCollection);
    }

    const addToRecentSearches = (searchInput) => {

        const searchValue = searchInput.trim();
        if(!searchValue) return;

        const element = recentSearch.some(item => item.recentSearchTxt === searchValue);
        if(element) return;

        const elementToAppend = { recentSearchTxt: searchValue };
        const updatedCollection = [...recentSearch, elementToAppend];

        setRecentSearch(updatedCollection);
    }


    const handleSearch = () => {
        console.log('Searching');
        addToRecentSearches(searchInput);

        const givenPhrase = searchInput.toLowerCase();
        const firestoreDataItemsCopy = firestoreDataItems.filter(element => element.title.toLowerCase().includes(givenPhrase));
        console.log(firestoreDataItemsCopy);
        setAdvertisements(firestoreDataItemsCopy);
        setSearchInputClicked(false);

    }

    const signOut = () => {
        auth.signOut();
    }

    const fetchItems = async () => {
        try {
            setIsLoading(true);
            const collectionRef = collection(FIRESTORE_DB, 'items');
            const querySnapshot = await getDocs(collectionRef);
            const data = querySnapshot.docs.map(doc => ( { id: doc.id, ...doc.data() }));

            setFirestoreDataItems(data);
            setAdvertisements(firestoreDataItems);

        } catch(error) {
            console.error('Failed to fetch data from firestore collection', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect( () => {
        fetchItems();
        console.log(firestoreDataItems);
    }, []);


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        fetchItems();

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    const handleDisplayName = () => {
        updateProfile(auth.currentUser, {
            displayName: 'Nikodem Godek',
            photoURL: 'https://static.prsa.pl/images/90f30d6e-915a-46a2-b860-6fb270ede5b6.jpg',
        })
    }

    const handleCancelButton = () => {
        console.log('dupa');
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginTop: 0, marginHorizontal: 10, flexDirection: 'column', alignItems: 'flex-start', borderRadius: 8, padding: 10,}}>
                <Text style={{ fontSize: 16, fontWeight: 600}}>Dzień dobry,</Text>
                <Text style={{ fontSize: 22, fontWeight: 600}}>{auth.currentUser ? auth.currentUser.displayName : 'Gościu'}</Text>
            </View>
        
            <Search
                onFocus={() => setSearchInputClicked(true)}
                onCancel={() => setSearchInputClicked(false)}
                onChangeText={text => setSearchInput(text)}
                value={searchInput}
                onSubmitEditing={handleSearch}
            />
            
            {searchInputClicked && recentSearch.length > 0 ?
                (
                    <View>
                        <Text style={{fontSize: 14, fontWeight: 600, textTransform: 'uppercase', marginHorizontal: 15}}>ostatnio wyszukiwane</Text>
                        <View style={{marginVertical: 10}}>
                            { 
                                recentSearch.map( (item, index) => (
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, marginVertical: .5, backgroundColor: '#fff'}} key={index}>
                                        <Text>{item.recentSearchTxt}</Text>
                                        <Icon onPress={() => removeFromRecentSearches(item.recentSearchTxt)} size="20" name="cross" type="entypo"/>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                )
            : null }

            {isLoading ? <ActivityIndicator color="indigo" size="large" style={{ flex: 1, alignContent: 'center', justifyContent: 'center',}} /> : null }

            {!isLoading && !searchInputClicked ?
                (
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 15 }}>
                                
                    { adverisements.map( (item, index) => (
                        <Item key={item.id} img={item.img} title={item.title} price={item.price} location={item.location} timestamp={null} />
                    )) }
                </ScrollView>
                ) 
            : null }

            {!isLoading && searchInputClicked && recentSearch.length === 0 ?
                (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon size="100" name="eye" type="entypo"/>
                        <Text style={{fontSize: 32, fontWeight: 600}}>Napisz czego szukasz.</Text>
                        <Text style={{fontSize: 32, fontWeight: 600}}>Chętnie to dla Ciebie znajdę.</Text>
                    </View>
                )
            : null }

        </SafeAreaView>
    )
}

export default HomeScreen;