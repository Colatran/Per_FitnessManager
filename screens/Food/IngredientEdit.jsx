import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import { color_button_confirmation, styles_common, styles_text } from "../../styles/styles";
import Input_TextLabel from "../../components/Input_TextLabel";
import Button_Icon from "../../components/Button_Icon";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { ref_food_ingredients } from "../../firebase.config";



const margin = 5;
export default function IngredientEdit({ navigation, route }) {
  const { ingredient } = route.params;

  const [label, setLabel]         = useState(ingredient ? ingredient.label : "");
  const [unit, setUnit]           = useState(ingredient ? ingredient.unit : 0);
  const [energy, setEnergy]       = useState(ingredient ? ingredient.energy : 0);
  const [fats, setFats]           = useState(ingredient ? ingredient.fats : 0);
  const [saturates, setSaturates] = useState(ingredient ? ingredient.saturates : 0);
  const [carbs, setCarbs]         = useState(ingredient ? ingredient.carbs : 0);
  const [sugars, setSugar]        = useState(ingredient ? ingredient.sugars : 0);
  const [protein, setProtein]     = useState(ingredient ? ingredient.protein : 0);
  const [salt, setSalt]           = useState(ingredient ? ingredient.salt : 0);
  const [fiber, setFiber]         = useState(ingredient ? ingredient.fiber : 0);



  const saveIngredient = async () => {
    const data = {
      label: label,
      unit: unit,
      energy: energy,
      fats: fats,
      saturates: saturates,
      carbs: carbs,
      sugars: sugars,
      protein: protein,
      salt: salt,
      fiber: fiber,
    }

    if(ingredient) {
      await addDoc(ref_food_ingredients, data);
    } 
    else {
      const docRef = doc(ref_food_ingredients, ingredient.id);
      await updateDoc(docRef, data);
    }
  }



  const handleSaveOnPress = () => { 
    saveIngredient()
    .then(() => {navigation.goBack()})
    .catch(() => {setSaveLock(false)});
  }



  return (
    <View style={styles_common.container}>
      <View>
        <Margin margin={margin}/>
        <Input_TextLabel label="Label" value={label} setValue={setLabel} placeholder={"Label"}/>
        <Margin margin={margin}/>
        
        <Input_TextLabel label="Unit Weight (g)" value={unit} setValue={setUnit} placeholder={""} keyboardType={"numeric"}/>
        <Margin margin={15}/>

        <Text style={styles_text.bold}>{"Nutrition (Per 100g): "}</Text>
        <View style={{marginLeft: 10}}>
          <Input_TextLabel label="Energy (kcal)" value={energy} setValue={setEnergy} placeholder={""} keyboardType={"numeric"}/>
          <Margin margin={margin}/>
          
          <Input_TextLabel label="Fat (g)" value={fats} setValue={setFats} placeholder={""} keyboardType={"numeric"}/>
          <Paragraph>
            <Input_TextLabel label="Saturates (g)" value={saturates} setValue={setSaturates} placeholder={""} keyboardType={"numeric"}/>
          </Paragraph>
          <Margin margin={margin}/>

          <Input_TextLabel label="Carbohydrate (g)" value={carbs} setValue={setCarbs} placeholder={""} keyboardType={"numeric"}/>
          <Paragraph>
            <Input_TextLabel label="Sugars (g)" value={sugars} setValue={setSugar} placeholder={""} keyboardType={"numeric"}/>
          </Paragraph>
          <Margin margin={margin}/>

          <Input_TextLabel label="Protein (g)" value={protein} setValue={setProtein} placeholder={""} keyboardType={"numeric"}/>
          <Margin margin={margin}/>

          <Input_TextLabel label="Salt (g)" value={salt} setValue={setSalt} placeholder={""} keyboardType={"numeric"}/>
          <Margin margin={margin}/>

          <Input_TextLabel label="Fiber (g)" value={fiber} setValue={setFiber} placeholder={""} keyboardType={"numeric"}/>
          <Margin margin={margin}/>
        </View>
      </View>

      <View style={{flex:1, flexDirection: "row", alignItems: "flex-end", marginVertical: 20}}>
        {
          ingredient ?
            <Button_Icon 
              style={{flex: 1, backgroundColor: color_button_confirmation}}
              icon="plus"
              onPress={handleSaveOnPress}
            />
          :
            <Button_Icon 
              style={{flex: 1, backgroundColor: color_button_confirmation}}
              icon="content-save"
              onPress={handleSaveOnPress}
            />
        }
      </View>
    </View>
  );
}

function Paragraph(props) { return (<View style={{marginLeft: 30}}>{props.children}</View>);}
function Margin(props) { return (<View style={{margin: props.margin}}/>); }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
