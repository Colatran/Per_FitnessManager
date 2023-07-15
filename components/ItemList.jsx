import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import Button from "./ButtonRitch";
import { styles_text } from "../utils/styles";
import Field_Text from "./Field_Text";



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
    <>
      {
        editing ?
          <Field_Text
            value={name}
            setValue={setName}
            onPress={onPressSave}
            icon={"check"}
            styles={styles.constainer_editing}
          />
        :
          <View style={styles.container}>
            <View style={styles.container_text}>
              <Text style={styles_text.common}>{name}</Text>
            </View>
            <View style={styles.container_button}>
              <Button 
                icon={"edit"}
                onPress={() => onPressEdit()}
              />
            </View>
          </View>
      }
    </> 
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  constainer_editing: {
    marginTop: 0,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  container_text: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  container_button: {
    alignItems: 'flex-end'
  },
});