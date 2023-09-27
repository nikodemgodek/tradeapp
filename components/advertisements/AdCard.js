import { View, Text } from "react-native";
import { Icon, Image } from "react-native-elements";
const AdCard = (props) => {
    return(

        <View style={{
            width: '50%',
            height: '50%',
            padding: 5,

        }}>
            <View style={{
                justifyContent: 'flex-start',
                backgroundColor: '#f2f2f2',
                flex: 1,
            }}>
                <View style={{ width: '100%', height: '50%', backgroundColor: 'red'}}>
                    <Image style={{ width: '100%', height: '100%'}} source={{ uri: props.img }} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginHorizontal:10, marginBottom: 5}}>
                    <Text style={{ maxWidth: 100 }}>{props.title}</Text>
                    <Icon name="heart" type="font-awesome" size="16"/>
                </View>
                <View style={{ marginLeft: 10}}>
                    <Text style={{ fontSize: 21, fontWeight: 'bold'}}>{props.price} PLN</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5}}>
                    <Text style={{ marginLeft: 5}}>{props.loc}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 5}}>
                    <Text style={{ marginLeft: 5}}>{props.created}</Text>
                </View>
            </View>
        </View>
    )
}

export default AdCard;