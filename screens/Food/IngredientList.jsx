import { StyleSheet, View, Text, FlatList} from "react-native";
import { useContext, useEffect, useState } from "react";
import { onSnapshot } from 'firebase/firestore';
import { ref_food_ingredients } from '../../firebase.config';

import { color_background_dark, color_button_green, styles_common, styles_text } from "../../styles/styles";
import Button_Icon from "../../components/Button_Icon";



export default function IngredientList({ navigation }) {
  const [ingredientDocs, setIngredientDocs] = useState([]);

  useEffect(() => {
    return onSnapshot(ref_food_ingredients, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => {
        const nameA = a.label.toUpperCase();
        const nameB = b.label.toUpperCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setIngredientDocs(data);
    });
  }, []);



  const handleAddOnPress = () => {
    navigation.navigate("IngredientEdit", {});
  }
  const handleViewOnPress = (item) => {
    
  }
  const handleEditOnPress = (item) => {
    navigation.navigate("IngredientEdit", {ingredient: item});
  }



  return (
    <View style={styles_common.container}>
      
      <View style={styles_common.container_list}>
        <FlatList
          data={ingredientDocs}
          renderItem={({item}) => { 
            return(
              <View style={[styles_common.container_front, styles_common.container_list_item]}>
                <Button_Icon style={[styles.button, {marginRight: 8}]} icon="eye" onPress={() => handleViewOnPress(item)}/>
                <Text style={styles_text.common}>{item.label}</Text>
                {
                  item.recipeId === "" ?
                  <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
                    <Button_Icon style={styles.button} icon="pencil" onPress={() => handleEditOnPress(item)}/>
                  </View>
                  :
                  <></>
                }
              </View>
            )
          }}
        />
      </View>

      <View style={{flex:1, flexDirection: "row", alignItems: "flex-end", marginVertical: 20}}>
        <Button_Icon 
          style={{flex: 1, backgroundColor: color_button_green}}
          icon="plus"
          onPress={handleAddOnPress}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    backgroundColor: color_background_dark,
  }
});
