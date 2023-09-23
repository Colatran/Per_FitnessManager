import { StyleSheet, View, Text, FlatList, ScrollView} from "react-native";
import { useContext, useEffect, useState } from "react";
import { onSnapshot } from 'firebase/firestore';
import { db, exercises, schedules } from '../../firebase.config';

import { styles_common, styles_text } from "../../styles/styles";
import { ref_food_ingredients } from "./Food_Crud";





export default function IngredientList({ navigation }) {
  const [docs, setDocs] = useState([]);


  
  useEffect(() => {
    return onSnapshot(ref_food_ingredients, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocs(data);
    });
  }, []);





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
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
