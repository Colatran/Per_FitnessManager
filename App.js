import { StyleSheet, View } from 'react-native';

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ExercisesList from './screens/ExercisesList';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Exercises'
          screenOptions={TabScreenOptions()}
        >
          <Tab.Screen 
            name="Tab_Exercises"
            options={TabOptions("Exercises", "home")}
            component={ExercisesList}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
