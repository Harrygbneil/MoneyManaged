import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Budgets from './components/Budgets';
import NewBudget from './components/NewBudget';

// Create stacknavigator
const Stack = createNativeStackNavigator();

function LoginScreen(){
  return(<Login />);
}
function SignupScreen(){
  return(<Signup />)
}
function HomeScreen(){
  return(<Home />);
}
function BudgetsScreen(){
  return(<Budgets />)
}
function NewBudgetScreen(){
  return(<NewBudget />);
}

export default function App() {
  return (
    <>
      {/* Set the status bar to be visible on app */}
      <StatusBar barStyle='dark-content' backgroundColor='transparent'/> 
      <NavigationContainer theme={MyTheme}>
        {/* Initialise stack navigator with Login as the intial screen */}
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, gestureEnabled: false, animation: 'simple_push'}}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Signup" component={SignupScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Budgets" component={BudgetsScreen}/>
          <Stack.Screen name="NewBudget" component={NewBudgetScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

// Basic theme, will change later
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: '#FECDAA'
  },
};