import { Image } from "react-native";
import { View, Text} from "react-native";

const Category = (props) => {
    return(
        <View style={{ flexDirection: 'column', alignItems: 'center', paddingLeft: 20}}>
            <Image 
                style={{
                    width: 80, 
                    height: 80,
                    borderRadius: 100,
                    marginBottom: 20
                }} 
                source={{uri: props.image, }}/>
            <Text style={{fontSize: 14}}>{props.name}</Text>
        </View>
    )
}

export default Category;