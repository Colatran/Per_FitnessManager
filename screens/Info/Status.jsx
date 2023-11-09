import { StyleSheet, View, Text, FlatList, ScrollView} from "react-native";
import { useContext, useEffect, useState } from "react";

import { color_background_light, styles_common, styles_text } from "../../styles/styles";
import Slider from "../../components/Slider";
import Block from "../../components/screen_Schedule/Block";



export default function Status({ navigation, route }) {
  const { item } = route.params;

  const [weight, setWeight] = useState(70.0);



  return (
    <View style={styles_common.container}>
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
