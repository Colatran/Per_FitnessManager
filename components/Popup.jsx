import { StyleSheet, Modal, View } from "react-native";
import { color_background_dark } from "../styles/styles";

export default function Popup(props) {
  const isVisible = props.isVisible;

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.container}>
        {props.children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_background_dark + "f0",
  },
});
