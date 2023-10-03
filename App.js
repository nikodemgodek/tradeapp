import { Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import MainContainer from './navigation/MainContainer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FIREBASE_AUTH } from './authentication/firebase';

import LoginScreen from './navigation/screens/LoginScreen';
import RegisterScreen from './navigation/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const auth = FIREBASE_AUTH;

  const lastSearch = [
    { word: 'zyroskop' },
    { word: 'stojak na chleb'},
    { word: 'maczeta z krakowa'}
  ];

  const data = [
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_gTG_W0gNIGyWkhFq-ifMlFkAA9rb3RoJ8Uz1BaI&s',
        title: 'Książka kuchenna',
        price: 13000,
        loc: 'Inowrocław',
        createdAt: 'Wczoraj o 23:30'
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_gTG_W0gNIGyWkhFq-ifMlFkAA9rb3RoJ8Uz1BaI&s',
      title: 'Alfa romeo',
      price: 13000,
      loc: 'Inowrocław',
      createdAt: 'Wczoraj o 23:30'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_gTG_W0gNIGyWkhFq-ifMlFkAA9rb3RoJ8Uz1BaI&s',
        title: 'BMW e46 zadbana sztuka',
        price: 13000,
        loc: 'Inowrocław',
        createdAt: 'Wczoraj o 23:30'
    },
  ];

  const [dejta, setDejta] = useState(data);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ isSearchClicked, setIsSearchClicked ] = useState(false);

  const renderItem = ({item}) => {
    return(
      <View style={{ minHeight: 70, padding: 5}}>
        <Text>{item.firstName}</Text>
      </View>
    )
  }

  const renderLastSearchedItems = ({item}) => {
    return(
      <View style={{ minHeight: 0, paddingVertical: 5}}>
        <Text>{item.word}</Text>
      </View>
    )
  }

  const searchAds = value => {

    const filteredList = data.filter(
      item => {
        let itemLowercase = item.title.toLowerCase();
        let searchTermLowercase = value.toLowerCase();
        
        return itemLowercase.indexOf(searchTermLowercase) > -1;
      }
    )
    setDejta(filteredList);
  }
  
  const [user, setUser] = useState(null);
  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        console.log("auth: ", user);
        setUser(true);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, [])

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          {user ? (<Stack.Screen name="MainContainer" component={MainContainer}/>) : 
          (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
