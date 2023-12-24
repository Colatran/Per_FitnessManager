import { View } from "react-native";
import { useContext } from "react";

import { UserContext } from "../../utils/UserContext";
import { styles_common } from "../../styles/styles";
import List from "../../components/List";
import ListItem_EditCheck from "../../components/screen/ListItem_EditCheck";
import Button_Footer_Add from "../../components/screen/Button_Footer_Add";



export default function RecipeList({ navigation }) {
  const { recipeDocs } = useContext(UserContext);
  const { ingredientDocs } = useContext(UserContext);

  const onPress_add = () => {
    navigation.navigate("RecipeEdit", {});
  }
  const onPress_edit = (item) => {
    navigation.navigate("RecipeEdit", { recipe: item });
  }
  const onPress_check = (item) => {
    const ingredient = ingredientDocs.find(doc => doc.recipeId === item.id);
    navigation.navigate("IngredientCheck_Recipe", { ingredient: ingredient} );
  }

  return (
    <View style={styles_common.container}>
      <List data={recipeDocs}>
        <ListItem 
          onPressEdit={onPress_edit}
          onPressCheck={onPress_check}
        />
      </List>
      <Button_Footer_Add onPress={onPress_add} />
    </View>
  );
}



function ListItem(props) {
  const { item } = props;

  const onPressEdit = props.onPressEdit;
  const onPressCheck = props.onPressCheck;

  return (
    <ListItem_EditCheck
      label={item.label}
      showEdit={true}
      showCheck={true}
      onPressEdit={() => onPressEdit(item)}
      onPressCheck={() => onPressCheck(item)}
    />
  );
}
