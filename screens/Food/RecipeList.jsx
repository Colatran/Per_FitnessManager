import { StyleSheet, View, Text, FlatList} from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot } from 'firebase/firestore';
import { ref_food_recipes } from '../../firebase.config';

import { color_background_dark, styles_common, styles_text } from "../../styles/styles";
import Button_Icon from "../../components/Button_Icon";
import Button_Footer_List from "../../components/Button_Footer_List";



export default function RecipeList({ navigation }) {
  const [recipesDocs, setRecipesDocs] = useState([]);

  useEffect(() => {
    return onSnapshot(ref_food_recipes, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => {
        const nameA = a.label.toUpperCase();
        const nameB = b.label.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setRecipesDocs(data);
    });
  }, []);



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
          data={recipesDocs}
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

      <Button_Footer_List onPressAdd={handleAddOnPress}/>
    </View>
  );
}



const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    backgroundColor: color_background_dark,
  }
});
