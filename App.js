import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserProvider } from './utils/UserContext';

import {
  _color_baseBorder_front,
  _color_base_front, _color_border_base_front,
  _iconSize_m,
  _space_l, _space_m, _space_s,
  _textColor, _textShadowColor, _textShadowRadius, styles_text
} from './styles/styles';



/*import ExercisesList from './screens/ExercisesList';
import WorkoutList_Practice from './screens/WorkoutList_Practice';
import WorkoutList_Manage from './screens/WorkoutList_Manage';
import WorkoutEdit from './screens/WorkoutEdit';
import WorkoutEdit_Exercise from './screens/WorkoutEdit_Exercise';
import WorkoutPractice from './screens/WorkoutPractice';*/

import Food from './screens/Food/Food';
import IngredientList from './screens/Food/IngredientList';
import IngredientEdit from './screens/Food/IngredientEdit';
import IngredientCheck from './screens/Food/IngredientCheck';
import RecipeList from './screens/Food/RecipeList';
import RecipeEdit from './screens/Food/RecipeEdit';
import MealList from './screens/Food/MealList';
import MealEdit from './screens/Food/MealEdit';

import Schedule from './screens/Schedule/Schedule';
import ScheduleList from './screens/Schedule/ScheduleList';



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
              backgroundColor: _color_base_front,
              borderTopColor: _color_baseBorder_front,
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
          <Tab.Screen
            name="Tab_Schedule"
            options={TabOptions("Schedule", "calendar-month")}
            component={Stack_Schedule}
          />

          {/*<Tab.Screen 
              name="Tab_Practice"
              options={TabOptions("Practice", "play")}
              component={Stack_Practice}
            />
            <Tab.Screen 
              name="Tab_Exercises"
              options={TabOptions("Exercises", "format-list-text")}
              component={Stack_Exercises}
            />
            <Tab.Screen 
              name="Tab_Workouts"
              options={TabOptions("Workouts", "dumbbell")}
              component={Stack_Workouts}
            />
            <Tab.Screen 
              name="Tab_History"
              options={TabOptions("History", "history")}
              component={Stack_Exercises}
            />*/}
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}



const StackOptions = (title) => {
  return {
    title: `  ${title}  `,
    headerStyle: {
      backgroundColor: _color_base_front,
      borderBottomColor: _color_baseBorder_front
    },
    headerTintColor: _textColor,
    headerTitleStyle: styles_text.title,
  }
}
const TabOptions = (title, icon) => {
  return {
    title: `${title}`,
    tabBarIcon: () => (
      <Icon name={icon} size={_iconSize_m} color={_textColor}/>
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
        name='MealList'
        component={MealList}
        options={StackOptions("Meals")} />
      <Stack.Screen
        name='MealEdit'
        component={MealEdit}
        options={StackOptions("Meal")} />
    </Stack.Navigator>
  );
}

function Stack_Schedule() {
  return (
    <Stack.Navigator initialRouteName='ScheduleList'>
      <Stack.Screen
        name='ScheduleList'
        component={ScheduleList}
        options={StackOptions("Schedules")} />
      <Stack.Screen
        name='Schedule'
        component={Schedule}
        options={StackOptions("Schedule")} />
    </Stack.Navigator>
  );
}





/*
function Stack_Practice() {
  return (
    <Stack.Navigator initialRouteName='WorkoutList'>
      <Stack.Screen
        name='WorkoutList'
        component={WorkoutList_Practice}
        options={StackOptions("Select a Workout")}/>
      <Stack.Screen
        name='Practice'
        component={WorkoutPractice}
        options={StackOptions("Practice")}/>
    </Stack.Navigator>
  );
}
function Stack_Exercises() {
  return (
    <Stack.Navigator initialRouteName='Exercises'>
      <Stack.Screen
        name='Exercises'
        component={ExercisesList}
        options={StackOptions("Exercises")}/>
    </Stack.Navigator>
  );
}
function Stack_Workouts() {
  return (
    <Stack.Navigator initialRouteName='Workouts'>
      <Stack.Screen 
        name='WorkoutList'
        component={WorkoutList_Manage}
        options={StackOptions("Workouts")}/>
      <Stack.Screen
        name='WorkoutEdit'
        component={WorkoutEdit}
        options={StackOptions("Editing")}/>
      <Stack.Screen
        name='WorkoutEdit_Exercise'
        component={WorkoutEdit_Exercise}
        options={StackOptions("Exercise")}/>
    </Stack.Navigator>
  );
}*/