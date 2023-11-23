import { StyleSheet, Modal, View } from "react-native";
import { _color_transparent_0, _space_xl } from "../styles/styles";

export default function Popup(props) {
  const isVisible = props.isVisible;

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.container_background}>
        <View style={styles.container}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container_background: {
    flex: 1,
    backgroundColor: _color_transparent_0,
  },
  container: { 
    flex: 1,
    margin: _space_xl,
    justifyContent: "center" }
});
