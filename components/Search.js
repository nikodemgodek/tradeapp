import { SafeAreaView } from "react-native";
import { Icon, SearchBar } from 'react-native-elements';


const Search = ({ onFocus, onCancel, searchValue, setSearchValue, setIsSearchClicked, searchAds, onChangeText, value, onSubmitEditing }) => {
    
    const updateSearch = (search) => {
      setSearchValue(search);
    }
  
    return(
        <SafeAreaView style={{ marginHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <SearchBar
            onCancel={onCancel}
            onFocus={onFocus}
            containerStyle={{backgroundColor: 'transparent'}}
            platform='ios'
            placeholder="Szukaj.."
            onChangeText={onChangeText}
            value={value}
            onSubmitEditing={onSubmitEditing}
            //onFocus={() => setIsSearchClicked(true)}
            //onBlur={() => setIsSearchClicked(false)}
            />
        </SafeAreaView>
    )
}

export default Search;