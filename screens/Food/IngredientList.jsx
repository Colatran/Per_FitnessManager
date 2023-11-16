import { StyleSheet, View, Text, FlatList } from "react-native";
import { useContext } from "react";

import { color_background_dark, styles_common, styles_text } from "../../styles/styles";
import Button_Icon from "../../components/Button_Icon";
import { UserContext } from "../../utils/UserContext";
import RichList from "../../components/screen/ScreenList";
import Button_Footer_Add from "../../components/Button_Footer_Add";



export default function IngredientList({ navigation }) {
  const { ingredientDocs } = useContext(UserContext);



  const handleOnPressAdd = () => {
    navigation.navigate("IngredientEdit", {});
  }
  const handleViewOnPress = (item) => {
    navigation.navigate("IngredientCheck", {ingredient: item});
  }
  const handleEditOnPress = (item) => {
    navigation.navigate("IngredientEdit", {ingredient: item});
  }



  return (
    <View style={styles_common.container}>
      <RichList data={ingredientDocs}>
        <ListItem navigation={navigation}/>
      </RichList>

      <Button_Footer_Add onPressAdd={handleOnPressAdd}/>
    </View>
  );
}

function ListItem(props) {
  const { item } = props;
  const navigation = props.navigation;

  const handleViewOnPress = (item) => {
    navigation.navigate("IngredientCheck", {ingredient: item});
  }
  const handleEditOnPress = (item) => {
    navigation.navigate("IngredientEdit", {ingredient: item});
  }

  return (
    <View style={{flexDirection: "row", flex:1}}>
      <Button_Icon style={[styles.button, {marginRight: 8}]} icon="eye" onPress={() => handleViewOnPress(item)}/>
      <Text style={styles_text.common}>{item.label}</Text>
      {
        item.recipeId == "" ?
          <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
            <Button_Icon style={styles.button} icon="pencil" onPress={() => handleEditOnPress(item)}/>
          </View>
          :
          <></>
      }
    </View>
  );
}





const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    backgroundColor: color_background_dark,
  }
});
