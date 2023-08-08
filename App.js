import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ExercisesList from './screens/ExercisesList';
import WorkoutList_Practice from './screens/WorkoutList_Practice';
import WorkoutList_Manage from './screens/WorkoutList_Manage';
import WorkoutEdit from './screens/WorkoutEdit';
import WorkoutEdit_Exercise from './screens/WorkoutEdit_Exercise';
import WorkoutPractice from './screens/WorkoutPractice';
import { UserProvider } from './utils/UserContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName='Tab_Practice'
            screenOptions={TabScreenOptions()}
          >
            <Tab.Screen 
              name="Tab_Practice"
              options={TabOptions("Practice", "play-arrow")}
              component={Stack_Practice}
            />
            <Tab.Screen 
              name="Tab_Exercises"
              options={TabOptions("Exercises", "list")}
              component={Stack_Exercises}
            />
            <Tab.Screen 
              name="Tab_Workouts"
              options={TabOptions("Workouts", "fitness-center")}
              component={Stack_Workouts}
            />
            <Tab.Screen 
              name="Tab_History"
              options={TabOptions("History", "history")}
              component={Stack_Exercises}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </UserProvider>
  );
}



const StackOptions = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: "#000",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}
const TabScreenOptions = () => {
  return { 
    headerShown: false,
    tabBarActiveTintColor: '#f00',
    tabBarStyle: {
      backgroundColor: '#000',
    }
  }
}
const TabOptions = (title, icon) => {
  return {
    title: title,
    tabBarIcon: () => (
      <MaterialIcons name={icon} size={30} color='white' />
    ),
  }
}


function Stack_Practice() {
  return (
    <Stack.Navigator initialRouteName='WorkoutList'>
      <Stack.Screen
        name='WorkoutList'
        component={WorkoutList_Practice}
        options={StackOptions("  Select a Workout  ")}/>
      <Stack.Screen
        name='Practice'
        component={WorkoutPractice}
        options={StackOptions("  Practice  ")}/>
    </Stack.Navigator>
  );
}
function Stack_Exercises() {
  return (
    <Stack.Navigator initialRouteName='Exercises'>
      <Stack.Screen
        name='Exercises'
        component={ExercisesList}
        options={StackOptions("  Exercises  ")}/>
    </Stack.Navigator>
  );
}
function Stack_Workouts() {
  return (
    <Stack.Navigator initialRouteName='Workouts'>
      <Stack.Screen 
        name='WorkoutList'
        component={WorkoutList_Manage}
        options={StackOptions("  Workouts  ")}/>
      <Stack.Screen
        name='WorkoutEdit'
        component={WorkoutEdit}
        options={StackOptions("  Editing  ")}/>
      <Stack.Screen
        name='WorkoutEdit_Exercise'
        component={WorkoutEdit_Exercise}
        options={StackOptions("  Exercise  ")}/>
    </Stack.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
