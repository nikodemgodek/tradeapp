import { Text, View, ScrollView, StyleSheet, FlatList, Image } from 'react-native';
import { useState } from 'react';

const PickedForYou = () => {

    const data = [
        { id: '1', title: 'Element 1' },
        { id: '2', title: 'Element 2' },
        { id: '3', title: 'Element 3' },
        // ... więcej elementów
    ];

    const renderItem = ({item}) => (
        <View style={styles.item}>
            <Image style={styles.image} source={{ uri: 'https://img.freepik.com/darmowe-wektory/sprzet-do-pilki-noznej-siatkowki-baseballu-i-rugby_1441-4026.jpg?w=2000' }} />   
            <Text>{item.title}</Text>
        </View>
    );
      

    return(
        <View style={{backgroundColor: '#f5f5f5', flexDirection: 'column', paddingVertical: 10}}>
            <View style={{ marginHorizontal: 15}}>
                <Text style={{ fontSize: 24}}>Wybrane dla Ciebie</Text>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                numColumns={2} // Liczba kolumn w siatce
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
      flex: 1,
      margin: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgray',
      height: 100,
      borderRadius: 5
    },

    image: {
        width: '100%',
        height: 50
    }
  });

export default PickedForYou;