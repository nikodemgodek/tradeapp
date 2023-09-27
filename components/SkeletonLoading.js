import { View, Text, StyleSheet, } from 'react-native';
import Skeleton from './Skeleton';

const SkeletonLoading = () => {

    return(
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10, height: '70%'}}>
            <View style={{ width: '50%', height: '50%', padding: 5}}>
            </View>
            <View style={{ width: '50%', height: '50%', padding: 5}}>
                <View style={{ backgroundColor: '#a0a0a0', height: '100%'}}>
                    <Skeleton width={"100%"} height={"100%"}/>
                </View>
            </View>
            <View style={{ width: '50%', height: '50%', padding: 5}}>
                <View style={{ backgroundColor: 'red', height: '100%'}}>
                    <Text>Dupa</Text>
                </View>
            </View>
            <View style={{ width: '50%', height: '50%', padding: 5}}>
                <View style={{ backgroundColor: 'red', height: '100%'}}>
                    <Text>Dupa</Text>
                </View>
            </View>
            <View style={{ width: '50%', height: '50%', padding: 5}}>
                <View style={{ backgroundColor: 'red', height: '100%'}}>
                    <Text>Dupa</Text>
                </View>
            </View>
            <View style={{ width: '50%', height: '50%', padding: 5}}>
                <View style={{ backgroundColor: 'red', height: '100%'}}>
                    <Text>Dupa</Text>
                </View>
            </View>
        </View>
    )
}

export default SkeletonLoading;