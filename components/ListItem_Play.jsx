import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import Button from "./Ritch_Button";
import { styles_text } from "../utils/styles";



export default function ListItem_Play(props) {
  const [name, setName] = useState(props.item.name);

  const item = props.item;
  const onPlay = props.onPlay;



  const onPressPlay = () => {
    onPlay(item);
  }



  return (
    <>
      <View style={styles.container}>
        <View style={styles.container_text}>
          <Text style={styles_text.common}>{name}</Text>
        </View>
        <View style={styles.container_button}>
          <Button 
            icon={"play-arrow"}
            onPress={() => onPressPlay()}
          />
        </View>
      </View>
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
  container_text: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  container_button: {
    alignItems: 'flex-end'
  },
});