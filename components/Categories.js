import { Text, View, ScrollView, StyleSheet } from 'react-native';

import Category from './Category';

const Categories = () => {
    return(
        <View style={{backgroundColor: '#f5f5f5', flexDirection: 'column', paddingVertical: 10}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 25}}>
                <Text style={{ fontSize: 24}}>Kategorie</Text>
                <Text>Zobacz wszystkie</Text>
            </View>
            <View
                style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginVertical: 20,
                marginHorizontal: 25
                }}
            />
            <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row', paddingVertical: 10}}>
                    <Category name="Samochody" image="https://img.freepik.com/premium-photo/modern-automobile-classic-technology-wheel-traffic_665346-119.jpg"/>
                    <Category name="Motocykle" image="https://c1.wallpaperflare.com/preview/335/22/507/ducati-diavel-motorcycle-motor.jpg" />
                    <Category name="Elektronika" image="https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg" />
                    <Category name="Nieruchomości" image="https://parentportfolio.com/wp-content/uploads/2022/11/estate.jpg" />
                    <Category name="Praca" image="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" />
                    <Category name="Dom i Ogród" image="https://a.allegroimg.com/original/12bb5c/1b500a114cc392e4ca8503b242b8" />
                </View>
            </ScrollView>
        </View>
    )
}

export default Categories;