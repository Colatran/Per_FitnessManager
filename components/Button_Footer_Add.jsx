import { StyleSheet, View } from "react-native";
import { _color_button_green, _space_l } from "../styles/styles";
import Button_Icon from "./Button_Icon";



export default function Button_Footer_Add(props) {
  const onPressAdd = props.onPressAdd

  return (
    <View style={styles.container}>
      <Button_Icon 
        style={styles.button}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: _space_l
  },

  button: {
    flex: 1, 
    backgroundColor: _color_button_green
  },
});