import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserProvider } from './utils/UserContext';

import {
  _color_back_1, _color_back_1_border, _iconSize_m, _space_m, _space_s,
  _textColor, _textShadowColor, _textShadowRadius, styles_text
} from './styles/styles';



import Food from './screens/Food/Food';
import IngredientList from './screens/Food/IngredientList';
import IngredientEdit from './screens/Food/IngredientEdit';
import IngredientCheck from './screens/Food/IngredientCheck';
import RecipeList from './screens/Food/RecipeList';
import RecipeEdit from './screens/Food/RecipeEdit';
import DietList from "./screens/Food/DietList";
import DietEdit from "./screens/Food/DietEdit";


import MealList from './screens/Food/MealList';
import MealEdit from './screens/Food/MealEdit';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Tab_Food'
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: _textColor,
            tabBarStyle: {
              height: 64,
              paddingTop: _space_s,
              paddingBottom: _space_m,
              backgroundColor: _color_back_1,
              borderTopColor: _color_back_1_border,
            },
            tabBarLabelStyle: {
              textShadowColor: _textShadowColor,
              textShadowRadius: _textShadowRadius,
            }
          }}
        >
          <Tab.Screen
            name="Tab_Food"
            options={TabOptions("Food", "food-drumstick")}
            component={Stack_Food}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}



const StackOptions = (title) => {
  return {
    title: `  ${title}  `,
    headerStyle: {
      backgroundColor: _color_back_1,
      borderBottomColor: _color_back_1_border,
    },
    headerTintColor: _textColor,
    headerTitleStyle: styles_text.title,
  }
}
const TabOptions = (title, icon) => {
  return {
    title: `${title}`,
    tabBarIcon: () => (
      <Icon name={icon} size={_iconSize_m} color={_textColor} />
    ),
  }
}



function Stack_Food() {
  return (
    <Stack.Navigator initialRouteName='FoodScreen'>
      <Stack.Screen
        name='FoodScreen'
        component={Food}
        options={StackOptions("Food")} />

      <Stack.Screen
        name='IngredientList'
        component={IngredientList}
        options={StackOptions("Ingredients")} />
      <Stack.Screen
        name='IngredientEdit'
        component={IngredientEdit}
        options={StackOptions("Ingredient")} />
      <Stack.Screen
        name='IngredientCheck'
        component={IngredientCheck}
        options={StackOptions("Ingredient")} />

      <Stack.Screen
        name='RecipeList'
        component={RecipeList}
        options={StackOptions("Recipes")} />
      <Stack.Screen
        name='RecipeEdit'
        component={RecipeEdit}
        options={StackOptions("Recipe")} />
      <Stack.Screen
        name='IngredientCheck_Recipe'
        component={IngredientCheck}
        options={StackOptions("Nutrition")} />


      <Stack.Screen
        name='MealList'
        component={MealList}
        options={StackOptions("Meals")} />
      <Stack.Screen
        name='MealEdit'
        component={MealEdit}
        options={StackOptions("Meal")} />
      <Stack.Screen
        name='IngredientCheck_Meal'
        component={IngredientCheck}
        options={StackOptions("Nutrition")} />

      <Stack.Screen
        name='DietList'
        component={DietList}
        options={StackOptions("Diets")} />
      <Stack.Screen
        name='DietEdit'
        component={DietEdit}
        options={StackOptions("Diet")} />
    </Stack.Navigator>
  );
}



