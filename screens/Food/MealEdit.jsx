import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ref_food_ingredients, ref_food_meals } from "../../firebase.config";
import { addDoc, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";

import { UserContext } from "../../utils/UserContext";
import { color_background_dark, color_background_input, color_button_green, color_button_red, styles_common, styles_text } from "../../styles/styles";

import Label from "../../components/Label";
import Popup from "../../components/Popup";
import Input_Text from "../../components/input/Input_Text";
import Button_Footer_Form from "../../components/screen/Button_Footer_Form";
import Button_Icon from "../../components/input/Button_Icon";
import Button from "../../components/input/Button";



const FloorValue = (value) => {return  Math.floor(value * Math.pow(10, 2)) / Math.pow(10, 2);}

export default function MealEdit({ navigation, route }) {
  const { meal } = route.params;
  const { ingredientDocs } = useContext(UserContext);


  const isEdit = meal ? true : false;



  const [amountEdit_visible, setAmountEdit_visible] = useState(false);
  const [amountEdit_index, setAmountEdit_index]     = useState(0);
  const [amountEdit_value, setAmountEdit_value]     = useState(0);

  const [saveLock, setSaveLock]             = useState(false);
  const [lockSwitch, setLockSwitch]         = useState(false);

  const [incIngredientDocs, setIngredientDocs] = useState([]);

  const [label, setLabel]                   = useState(isEdit ? meal.label          : "");
  const [isSolid, setIsSolid]               = useState(isEdit ? meal.isSolid        : true);
  const [ingredients, setIngredients]       = useState([]);


  
  const Start = () => {
    const data = ingredientDocs.map((doc) => ({
      ...doc,
      include: true
    }));

    if(isEdit) {
      const ingData = meal.ingredients;
  
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
  const saveMeal = async () => {
    const ingredietData = ingredients.map((item) => ({ingredientId: item.ingredientId, amount: item.amount}));
    const mealData = {
      label: label,
      isSolid: isSolid,
      ingredients: ingredietData,
    }

    if(isEdit) {
      const mealDocRef = doc(ref_food_meals, meal.id);
      await updateDoc(mealDocRef, mealData);
    } 
    else {
      return await addDoc(ref_food_meals, mealData);
    }
  }
  const deleteMeal = async () => {
    const docRef = doc(ref_food_meals, meal.id);
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

    saveMeal()
    .then(() => {
      setSaveLock(false);
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
      setSaveLock(false)});
  }
  const handleDeleteOnPress = () => {
    deleteMeal()
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
