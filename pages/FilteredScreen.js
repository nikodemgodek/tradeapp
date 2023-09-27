import { View, Text, ScrollView } from "react-native";
import { Icon, Image } from 'react-native-elements';

import Filter from "../components/Filter";
import AdCard from "../components/advertisements/AdCard";

const FilteredScreen = ({ data }) => {

    return(
        <View style={{  marginHorizontal: 10, marginTop: 10, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{ textTransform: 'uppercase', fontWeight: 'bold'}}>Znaleziono 0 ogłoszeń</Text>
                <Icon name="select-arrows" type="entypo"/>
            </View>
            
            
                <View style={{
                    width: '100%',
                    height: '85%',
                    padding: 10,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}>
                    {data.map( (item, key) => (
                        <AdCard key={key} img={item.img} title={item.title} price={item.price} loc={item.loc} created={item.createdAt} />
                    ))}
                </View>
            
        </View>

    )
}

export default FilteredScreen;