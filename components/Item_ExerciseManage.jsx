import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { android_ripple_style, styles_text } from "../utils/styles";



export default function Item_ExerciseManage(props) {
  const [editing, setEditing] = useState(false);

  const item = props.item;
  const onPressDelete = props.onPressDelete;
  const onPressEdit = props.onPressEdit;

  return (
    <View style={styles.container}>
      <View style={styles.section_text}>
        <Text style={styles_text.common}>{item.name}</Text>
      </View>
      <View style={styles.section_buttons}>
        <Button 
          icon={"edit"}
          onPress={() => onPressEdit(item)}
        />
        <Button 
          icon={"delete-forever"}
          onPress={() => onPressDelete(item)}
        />
      </View>
    </View> 
  );
}

function Button(props) {
  const icon = props.icon;
  const onPress = props.onPress;

  return (
    <Pressable style={styles.pressable}
      android_ripple={android_ripple_style}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={30} color='white' />
    </Pressable>
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

  pressable: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
    margin: 2,
  }
});