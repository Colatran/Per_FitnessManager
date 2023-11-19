import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ref_food_ingredients, ref_food_recipes } from "../../firebase.config";
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { UserContext } from "../../utils/UserContext";
import { color_background_dark, color_background_input, color_button_green, color_button_red, styles_common, styles_text } from "../../styles/styles";
import Label from "../../components/Label";
import Popup from "../../components/Popup";
import Input_Text from "../../components/input/Input_Text";
import Button_Footer_Form from "../../components/input/Button_Footer_Form";
import Button_Icon from "../../components/input/Button_Icon";
import Button from "../../components/input/Button";



const FloorValue = (value) => {return  Math.floor(value * Math.pow(10, 2)) / Math.pow(10, 2);}

export default function RedipeEdit({ navigation, route }) {
  const { recipe } = route.params;
  const { ingredientDocs } = useContext(UserContext);

  const isEdit = recipe ? true : false;



  const [label, setLabel]                   = useState(isEdit ? recipe.label          : "");
  const [servings, setServings]             = useState(isEdit ? `${recipe.servings}`  : "1");
  const [isSolid, setIsSolid]               = useState(isEdit ? recipe.isSolid        : true);
  const [ingredients, setIngredients]       = useState([]);

  const [ incIngredientDocs, setIngredientDocs] = useState([]);

  const [saveLock, setSaveLock]             = useState(false);
  const [lockSwitch, setLockSwitch]         = useState(false);

  const [amountEdit_visible, setAmountEdit_visible] = useState(false);
  const [amountEdit_index, setAmountEdit_index]     = useState(0);
  const [amountEdit_value, setAmountEdit_value]     = useState(0);


  
  const Start = () => {
    const data = ingredientDocs.map((doc) => ({
      ...doc,
      include: true
    }));

    if(isEdit) {
      const ingData = recipe.ingredients;
  
      ingData.forEach(element => {
        const index = data.findIndex(item => item.id === element.ingredientId);
        const item = data[index];
        item.include = false;
        data[index] = item;
      });
      setIngredientDocs(data);
  
      setIngredients(ingData.map((doc) => ({
        ingredientId: doc.ingredientId,
        amount: doc.amount,
        ingredient: data[data.findIndex(item => item.id === doc.ingredientId)]
      })));
    }
    else {
      setIngredientDocs(data);
    }
  }
  useEffect(() => {
    Start();
    return;
  }, []);


  const getIngredientFromRecipe = (ingredients, recipeId) => {
    let unit_price = 0;
    let unit_weight = 0;
    let nut_energy = 0;
    let nut_fats = 0;
    let nut_saturates = 0;
    let nut_carbs = 0;
    let nut_sugars = 0;
    let nut_protein = 0;
    let nut_fiber = 0;
    let nut_salt = 0;

    ingredients.forEach(element => {
      const amount = parseFloat(element.amount);
      const ingredient = element.ingredient;
      const ingUnitWeight = ingredient.unit_weight;
      const ingUnitPrice = ingredient.unit_price;

      unit_price    += parseFloat(amount * ingUnitPrice / ingUnitWeight);
      unit_weight   += parseFloat(amount);

      nut_energy    += parseFloat(amount * ingredient.nut_energy);
      nut_fats      += parseFloat(amount * ingredient.nut_fats);
      nut_saturates += parseFloat(amount * ingredient.nut_saturates);
      nut_carbs     += parseFloat(amount * ingredient.nut_carbs);
      nut_sugars    += parseFloat(amount * ingredient.nut_sugars);
      nut_protein   += parseFloat(amount * ingredient.nut_protein);
      nut_fiber     += parseFloat(amount * ingredient.nut_fiber);
      nut_salt      += parseFloat(amount * ingredient.nut_salt);
    });

    return ({
      label:      label,
      recipeId:   recipeId,
      isSolid:    isSolid,
      unit_price:     FloorValue(unit_price),
      unit_weight:    FloorValue(unit_weight),
      unit_servings:  parseInt(servings),
      nut_energy:     FloorValue(nut_energy) / unit_weight,
      nut_fats:       FloorValue(nut_fats) / unit_weight,
      nut_saturates:  FloorValue(nut_saturates) / unit_weight,
      nut_carbs:      FloorValue(nut_carbs) / unit_weight,
      nut_sugars:     FloorValue(nut_sugars) / unit_weight,
      nut_protein:    FloorValue(nut_protein) / unit_weight,
      nut_fiber:      FloorValue(nut_fiber) / unit_weight,
      nut_salt:       FloorValue(nut_salt) / unit_weight,
    })
  }

  const addIngredient = async (index) => {
    const ingDoc = incIngredientDocs[index];
    const newIng = { ingredientId: ingDoc.id, amount: `${FloorValue(ingDoc.unit_weight / ingDoc.unit_servings)}`, ingredient: ingDoc};
    setIngredients([...ingredients, newIng]);
 
    incIngredientDocs[index].include = false;
    setIngredientDocs(incIngredientDocs);
  }
  const removeIngredient = async (index) => {
    const ingId = ingredients[index].ingredientId;
    const indexDoc = incIngredientDocs.findIndex(item => item.id === ingId);
    incIngredientDocs[indexDoc].include = true;
    setIngredientDocs(incIngredientDocs);

    ingredients.splice(index, 1);
    setIngredients(ingredients);
  }
  const changeIngredientAmount = async (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].amount = value;
    setIngredients(newIngredients);
  }
  const saveRecipe = async () => {
    const ingredietData = ingredients.map((item) => ({ingredientId: item.ingredientId, amount: item.amount}));

    const recipeData = {
      label: label,
      isSolid: isSolid,
      servings: servings,
      ingredients: ingredietData,
    }


    if(isEdit) {
      const recipeDocRef = doc(ref_food_recipes, recipe.id);
      let ingDocRef;

      const q = query(ref_food_ingredients, where('recipeId', '==', recipe.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((item) => {ingDocRef = doc(ref_food_ingredients, item.id)});

      const recipeIngredientData = getIngredientFromRecipe(ingredients, recipe.id);
      
      await updateDoc(recipeDocRef, recipeData).then(() => {
        updateDoc(ingDocRef, recipeIngredientData);
      });
    } 
    else {
      const recipeId = (await addDoc(ref_food_recipes, recipeData)).id;
      const recipeIngredientData = getIngredientFromRecipe(ingredients, recipeId);
      return await addDoc(ref_food_ingredients, recipeIngredientData);
    }
  }
  const deleteRecipe = async () => {
    const q = query(ref_food_ingredients, where('recipeId', '==', recipe.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      const docRef = doc(ref_food_ingredients, item.id)
      deleteDoc(docRef);
    });

    const docRef = doc(ref_food_recipes, recipe.id);
    return deleteDoc(docRef);
  }



  const handleIsSolidOnPress = () => {
    setIsSolid(!isSolid);
  }
  const handleAddIngredientOnPress = (index) => {
    if(lockSwitch) return;
    setLockSwitch(true);

    addIngredient(index)
    .then(() => setLockSwitch(false));
  }
  const handleRemoveIngredientOnPress = (index) => {
    if(lockSwitch) return;
    setLockSwitch(true);

    removeIngredient(index)
    .then(() => setLockSwitch(false));
  }
  const handleIngredientSetValue = (index) => {
    setAmountEdit_index(index);
    setAmountEdit_value(ingredients[index].amount);
    setAmountEdit_visible(true);
  }
  const handleAmountSave = () => {
    changeIngredientAmount(amountEdit_index, amountEdit_value);
    setAmountEdit_visible(false);
  }
  const handleSaveOnPress = () => {
    if(saveLock) return;
    setSaveLock(true);

    saveRecipe()
    .then(() => {
      setSaveLock(false);
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
      setSaveLock(false)});
  }
  const handleDeleteOnPress = () => {
    deleteRecipe()
    .then(() => {
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
    });
  }



  return (
    <View style={styles_common.container}>

      <Popup isVisible={amountEdit_visible} setInvisible={() => setAmountEdit_visible(false)}>
        <View style={{flex:1}}>
          <View style={{margin: 20 }}>
            <ScrollView>
              <Label label="Amount">
                <Input_Text value={amountEdit_value} setValue={setAmountEdit_value} placeholder={""} keyboardType={"numeric"}/>
              </Label>
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center"}}>
            <Button_Icon style={{margin: 10, backgroundColor: color_button_green}} icon="check" onPress={() => handleAmountSave()}/>
            <Button_Icon style={{margin: 10, backgroundColor: color_button_red}} icon="close" onPress={() => setAmountEdit_visible(false)}/>
          </View>
        </View>
      </Popup>

      <View style={{marginBottom: 10}}>
        <ScrollView>
          <Label label="Label">
            <Input_Text value={label} setValue={setLabel} placeholder={"Label"}/>
          </Label>

          <Label label="Is Solid">
            <Button_Icon icon={isSolid ? "check" : ""} onPress={handleIsSolidOnPress}/>
          </Label>
          
          <Label label="Servings">
            <Input_Text value={servings} setValue={setServings} placeholder={""} keyboardType={"numeric"}/>
          </Label>
        </ScrollView>
      </View>

      <View style={{flex: 1}}>
        <View style={styles.container_list}>
          <FlatList
            data={incIngredientDocs}
            renderItem={({item, index}) => { 
              if(item.include)
                return(
                  <View style={styles.container_item}>
                    <Text style={styles_text.common}>{item.label}</Text>
                    <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
                      <Button_Icon style={styles.button} icon="plus" onPress={() => handleAddIngredientOnPress(index)}/>
                    </View>
                  </View>
                );
              else return (<></>);
            }}
          />
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          <Icon name={"chevron-down"} size={15} color='white'/>
          <Icon name={"chevron-down"} size={15} color='white'/>
          <Icon name={"chevron-down"} size={15} color='white'/>
        </View>

        <View style={styles.container_list}>
          <FlatList
            data={ingredients}
            renderItem={({item, index}) =>
              <View style={styles.container_item}>
                <View style={{flex: 1}}>
                  <Text style={styles_text.common}>{item.ingredient.label}</Text>
                </View>

                <View style={{flex: 1, paddingHorizontal: 5}}>
                  <Button style={styles.button_input} onPress={() => handleIngredientSetValue(index)}>
                    <Text style={styles_text.common}>{item.amount}</Text>
                  </Button>
                </View>

                <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                  <Button_Icon style={styles.button} icon="close" onPress={() => handleRemoveIngredientOnPress(index)}/>
                </View>
              </View>
            }
          />
        </View>
      </View>

      <Button_Footer_Form
        isEdit={isEdit}
        onPressSaveNew={() => handleSaveOnPress()}
        onPressSave={() => handleSaveOnPress()}
        onPressDelete={() => handleDeleteOnPress()}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    backgroundColor: color_background_dark,
  },

  button_input: {
    flex: 1,
    backgroundColor: color_background_input,
  },

  container_item: [
    styles_common.container_front,
    styles_common.container_list_item,
    {marginVertical: 2}
  ],

  container_list: {
    flex: 1,
    marginLeft: 5,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
});
