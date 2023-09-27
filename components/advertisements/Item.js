import { View, Text } from "react-native"
import { Image } from "react-native-elements"
import { Icon } from "react-native-elements"

const Item = (props) => {
    return(
        <View style={{ width: '50%', minHeight: 250, maxHeight: 350, padding: 5}}>
            <View style={{ width: '100%', height: '50%'}}>
                <Image 
                    style={{
                        width: '100%', 
                        height: '100%',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }} 
                    source={{uri: `${props.img}` }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fcfcfc'}}>
                <View style={{ flex: 1, width: '100%', paddingHorizontal: 5, paddingVertical: 10}}>
                    <Text style={{ fontSize: 16, maxWidth: '100%'}}>{props.title}</Text> 
                    <Text style={{ fontSize: 24, fontWeight: 600}}>{props.price ? `${props.price} PLN` : 'Za darmo' }</Text>
                    <Text style={{ fontSize: 16 }}>{props.location}</Text>
                    <Text style={{ fontSize: 16 }}>{props.timestamp}</Text>
                </View>
                <Icon style={{ marginTop: 15, marginRight: 10 }} name="star-outlined" type="entypo" />
            </View>
        </View>
    )
}


export default Item;