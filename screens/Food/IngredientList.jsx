import { StyleSheet, View, Text, FlatList} from "react-native";
import { useContext, useEffect, useState } from "react";
import { onSnapshot } from 'firebase/firestore';
import { db, exercises, ref_food_ingredients } from '../../firebase.config';

import { color_button_confirmation, styles_common, styles_text } from "../../styles/styles";
import Button_Icon from "../../components/Button_Icon";





export default function IngredientList({ navigation }) {
  const [docs, setDocs] = useState([]);


  
  useEffect(() => {
    return onSnapshot(ref_food_ingredients, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocs(data);
    });
  }, []);



  const handleAddOnPress = () => {
    navigation.navigate("IngredientEdit", {});
  }



  return (
    <View style={styles_common.container}>
      
      <View style={{flex: 1}}>
        <FlatList
          data={docs}
          renderItem={({item}) => { 
            return(
              <View style={[styles_common.container_front, {paddingHorizontal: 8, paddingVertical: 4, marginVertical: 10, flexDirection: "row", alignItems: "center"}]}>
                <Button_Icon style={[styles.button, {marginRight: 8}]} icon="eye" onPress={() => handleOnPressView(item)}/>
                <Text style={styles_text.common}>{item.title}</Text>
                <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
                  <Button_Icon style={styles.button} icon="menu-up" onPress={() => handleOnPressMoveUp(item)}/>
                  <Button_Icon style={styles.button} icon="menu-down" onPress={() => handleOnPressMoveDown(item)}/>
                  <Button_Icon style={styles.button} icon="pencil" onPress={() => handleOnPressEdit(item)}/>
                </View>
              </View>
            )
          }}
        />
      </View>

      <View style={{flex:1, flexDirection: "row", alignItems: "flex-end", marginVertical: 20}}>
        <Button_Icon 
          style={{flex: 1, backgroundColor: color_button_confirmation}}
          icon="plus"
          onPress={handleAddOnPress}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
