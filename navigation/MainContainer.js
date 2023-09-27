import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AnnouncementsScreen from './screens/AnnouncementsScreen';
import HomeScreen from './screens/HomeScreen';
import CreationScreen from './screens/CreationScreen';
import FavoritiesScreen from './screens/FavoritiesScreen';
import AccountScreen from './screens/AccountScreen';

const homeName = 'Home';
const creationFormName = 'Add';
const announcementsName = 'Announcements';
const favoritiesName = 'Favorities';
const accountName = 'Account';

const Tab = createBottomTabNavigator();

const MainContainer = () => {

    return(
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if(rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    //}else if(rn === announcementsName) {
                      //  iconName = focused ? 'pricetags' : 'pricetags-outline'
                    }else if(rn === creationFormName) {
                        iconName = focused ? 'add-circle' : 'add-circle-outline'
                    }else if(rn === favoritiesName) {
                        iconName = focused ? 'heart' : 'heart-outline'
                    }else if(rn === accountName) {
                        iconName = focused ? 'heart' : 'heart'
                    }

                    return <Ionicons name={iconName} size={size} color="indigo" />
                }, 
                headerShown: false, 
        })}>
            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={favoritiesName} component={FavoritiesScreen} />
            <Tab.Screen name={creationFormName} component={CreationScreen} />
            <Tab.Screen name={accountName} component={AccountScreen} />
        </Tab.Navigator>
    )
}

export default MainContainer;