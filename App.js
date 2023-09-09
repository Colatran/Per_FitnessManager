import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ExercisesList from './screens/ExercisesList';
import WorkoutList_Practice from './screens/WorkoutList_Practice';
import WorkoutList_Manage from './screens/WorkoutList_Manage';
import WorkoutEdit from './screens/WorkoutEdit';
import WorkoutEdit_Exercise from './screens/WorkoutEdit_Exercise';
import WorkoutPractice from './screens/WorkoutPractice';
import { UserProvider } from './utils/UserContext';
import Schedule from './screens/Schedule';
import { color_background_light } from './styles/styles';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserProvider>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName='Tab_Schedule'
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#fff',              
              tabBarStyle: {
                height: 60,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingTop: 5,
                paddingBottom: 5,
                backgroundColor: color_background_light,
                borderTopColor: "#000",
              },
              tabBarLabelStyle: {
                textShadowColor: '#101010',
                textShadowRadius: 10,
              }
            }}
          >
            <Tab.Screen 
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
            />
            <Tab.Screen 
              name="Tab_Schedule"
              options={TabOptions("Schedule", "calendar-month")}
              component={Stack_Schedule}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </UserProvider>
  );
}



const StackOptions = (title) => {
  return {
    title: `  ${title}  `,
    headerStyle: {
      backgroundColor: color_background_light,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 10,
    },
  }
}
const TabOptions = (title, icon) => {
  return {
    title: title,
    tabBarIcon: () => (
      <Icon name={icon} size={30} color='white' />
    ),
  }
}



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
}
function Stack_Schedule() {
  return (
    <Stack.Navigator initialRouteName='Workouts'>
      <Stack.Screen 
        name='WorkoutList'
        component={Schedule}
        options={StackOptions("Schedule")}/>
    </Stack.Navigator>
  );
}