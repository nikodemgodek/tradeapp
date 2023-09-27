import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import Search from '../../components/Search';
import SkeletonLoading from '../../components/SkeletonLoading';

//TODO:

const AnnouncementsScreen = ( { navigation }) => {

    const [ isLoading, setIsLoading ] = useState(true);

    return(
        <SafeAreaView style={{ flex: 1}}>
            <Search />
            { isLoading ? <Text>Dupa</Text> : null}
        </SafeAreaView>
    )
}

export default AnnouncementsScreen;