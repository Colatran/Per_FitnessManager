import { View } from "react-native";
import { useContext } from "react";

import { UserContext } from "../../utils/UserContext";
import { _icon_checkout, _icon_edit, styles_common, _space_s } from "../../styles/styles";
import List from "../../components/List";
import ListItem_EditCheck from "../../components/screen/ListItem_EditCheck";
import Button_Footer_Add from "../../components/screen/Button_Footer_Add";



export default function IngredientList({ navigation }) {
  const { ingredientDocs } = useContext(UserContext);

  const handleOnPressAdd = () => {
    navigation.navigate("IngredientEdit", {});
  }

  return (
    <View style={styles_common.container}>
      <List data={ingredientDocs}>
        <ListItem navigation={navigation}/>
      </List>
      <Button_Footer_Add onPress={handleOnPressAdd}/>
    </View>
  );
}



function ListItem(props) {
  const { item } = props;
  const navigation = props.navigation;

  const isRecipe = item.recipeId == "";

  const onPress_Edit = (item) => {
    navigation.navigate("IngredientEdit", {ingredient: item});
  }
  const onPress_Check = (item) => {
    navigation.navigate("IngredientCheck", {ingredient: item});
  }

  return (
    <ListItem_EditCheck
      label={item.label}
      showEdit={isRecipe}
      showCheck={true}
      onPressEdit={() => onPress_Edit(item)}
      onPressCheck={() => onPress_Check(item)}
    />
  );
}
