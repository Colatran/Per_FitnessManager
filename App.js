import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ExercisesList from './screens/ExercisesList';
import WorkoutList from './screens/WorkoutList';
import WorkoutExerciseList from './screens/WorkoutExerciseList';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Tab_Workouts'
          screenOptions={TabScreenOptions()}
        >
          <Tab.Screen 
            name="Tab_Exercises"
            options={TabOptions("Exercises", "fitness-center")}
            component={Stack_Exercises}
          />
          <Tab.Screen 
            name="Tab_Workouts"
            options={TabOptions("Workouts", "fitness-center")}
            component={Stack_Workouts}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
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
        name='Workouts'
        component={WorkoutList}
        options={StackOptions("  Workouts  ")}/>
      <Stack.Screen
        name='Exercises'
        component={WorkoutExerciseList}
        options={StackOptions("  Editing  ")}/>
    </Stack.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
