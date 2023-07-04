import { View, Text, TextInput } from "react-native";
import { useState } from "react";

import Button from "./ButtonRitch";
import { styles_item, styles_text } from "../utils/styles";



export default function ItemList(props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(props.item.name);

  const item = props.item;
  const onChangeName = props.onChangeName;
  const onEdit = props.onEdit;



  const onPressEdit = () => {
    if(onEdit) onEdit(item);
    else setEditing(true);
  }
  const onPressSave = () => {
    setEditing(false);
    onChangeName(item, name);
  }



  return (
    <View style={styles_item.container}>
      {
        editing ?
        <>
          <View style={styles_item.section_text}>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              color={'#fff'}
            />
          </View>
          <View style={styles_item.section_buttons}>
            <Button 
              icon={"check"}
              onPress={() => onPressSave()}
            />
          </View>
        </>
        :
        <>
          <View style={styles_item.section_text}>
            <Text style={styles_text.common}>{name}</Text>
          </View>
          <View style={styles_item.section_buttons}>
            <Button 
              icon={"edit"}
              onPress={() => onPressEdit()}
            />
          </View>
        </>
      }
    </View> 
  );
}