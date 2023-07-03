import { StyleSheet, View, Text, TextInput } from "react-native";
import { useState } from "react";

import Button from "./ButtonRitch";
import { styles_text } from "../utils/styles";



export default function Item_ExerciseManage(props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(props.item.name);

  const item = props.item;
  const onPressDelete = props.onPressDelete;
  const onChangeName = props.onChangeName;



  const onPressEdit = () => {
    setEditing(true);
  }
  const onPressSave = () => {
    setEditing(false);
    onChangeName(item, name);
  }



  return (
    <View style={styles.container}>
      {
        editing ?
        <>
          <View style={styles.section_text}>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              color={'#fff'}
            />
          </View>
          <View style={styles.section_buttons}>
            <Button 
              icon={"check"}
              onPress={() => onPressSave()}
            />
          </View>
        </>
        :
        <>
          <View style={styles.section_text}>
            <Text style={styles_text.common}>{name}</Text>
          </View>
          <View style={styles.section_buttons}>
            <Button 
              icon={"edit"}
              onPress={() => onPressEdit()}
            />
            <Button 
              icon={"delete-forever"}
              onPress={() => onPressDelete(item)}
            />
          </View>
        </>
      }
    </View> 
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },

  section_text: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  section_buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
});