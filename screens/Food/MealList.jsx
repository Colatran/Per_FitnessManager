import { StyleSheet, View, Text, FlatList} from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot } from 'firebase/firestore';
import { ref_food_meals } from '../../firebase.config';

import { color_background_dark, styles_common, styles_text } from "../../styles/styles";
import Button_Icon from "../../components/Button_Icon";
import Button_Footer_List from "../../components/Button_Footer_List";



export default function MealList({ navigation }) {
  const [mealsDocs, setMealsDocs] = useState([]);

  useEffect(() => {
    return onSnapshot(ref_food_meals, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => {
        const nameA = a.label.toUpperCase();
        const nameB = b.label.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setMealsDocs(data);
    });
  }, []);



  const handleAddOnPress = () => {
    navigation.navigate("MealEdit", {});
  }
  const handleEditOnPress = (item) => {
    navigation.navigate("MealEdit", {meal: item});
  }



  return (
    <View style={styles_common.container}>
      
      <View style={styles_common.container_list}>
        <FlatList
          data={mealsDocs}
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
