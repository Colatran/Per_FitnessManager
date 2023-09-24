import { StyleSheet, View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';


import { color_background_dark, styles_common, styles_text } from "../../styles/styles";
import Button_Icon from "../../components/Button_Icon";
import { db, schedules } from "../../firebase.config";


const ref_schedules = collection(db, schedules);

export default function ScheduleList({ navigation }) {
  const [docs, setDocs] = useState([]);


  useEffect(() => {
    return onSnapshot(ref_schedules, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocs(data);
    });
  }, []);








  
  const handleOnPressView = (item) => {
    navigation.navigate('Schedule', {item: item});
  }
  const handleOnPressEdit = (item) => {

  }
  const handleOnPressMoveUp = (item) => {

  }
  const handleOnPressMoveDown = (item) => {

  }



  return (
    <View style={styles_common.container}>
      
      <View style={styles_common.container_list}>
        <FlatList
          data={docs}
          renderItem={({item}) => { 
            return(
              <View style={[styles_common.container_front, styles_common.container_list_item]}>
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
  button: {
    marginHorizontal: 2,
    backgroundColor: color_background_dark,
  }
});