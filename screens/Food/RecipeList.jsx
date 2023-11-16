import { StyleSheet, View, Text, FlatList} from "react-native";
import { useContext } from "react";

import { color_background_dark, styles_common, styles_text } from "../../styles/styles";
import Button_Icon from "../../components/Button_Icon";
import Button_Footer_Add from "../../components/Button_Footer_Add";
import { UserContext } from "../../utils/UserContext";



export default function RecipeList({ navigation }) {
  const { recipeDocs } = useContext(UserContext);



  const handleAddOnPress = () => {
    navigation.navigate("RecipeEdit", {});
  }
  const handleEditOnPress = (item) => {
    navigation.navigate("RecipeEdit", {recipe: item});
  }



  return (
    <View style={styles_common.container}>
      
      <View style={styles_common.container_list}>
        <FlatList
          data={recipeDocs}
          renderItem={({item}) => { 
            return(
              <View style={[styles_common.container_front, styles_common.container_list_item]}>
                <Text style={styles_text.common}>{item.label}</Text>
                <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
                  <Button_Icon style={styles.button} icon="pencil" onPress={() => handleEditOnPress(item)}/>
                </View>
              </View>
            )
          }}
        />
      </View>

      <Button_Footer_Add onPressAdd={handleAddOnPress}/>
    </View>
  );
}



const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    backgroundColor: color_background_dark,
  }
});
