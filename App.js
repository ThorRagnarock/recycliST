
import { useFonts } from 'expo-font';

//navigation stuff
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContextProvider from './Src/Context/ContextProvider';

import { StyleSheet, Text, View } from 'react-native';

import Login from './Src/Screens/Login';
import Splash from './Src/Screens/Splash';
import OnBoarding from './Src/Screens/OnBoarding';
import SignInScreen from './Src/Screens/SignInScreen';
import RegNewAccount from './Src/Screens/RegNewAccount';
import PersonalProfile from './Src/Screens/PersonalProfile';
import DropDownScreen from './Src/Screens/DropDownScreen';// **
import DropDownSearchStreet from './Src/Screens/DropDownSearchStreet';
// import DropDownMachine  from './Src/Screens/DropDownMachine';


import ListsMan from './Src/Screens/ListsMan';

// SplashScreen.preventAutoHideAsync();
// const navigation  = useNavigation();
const NavStack = createStackNavigator();


export default function App() {

  const [isLoaded] = useFonts({
    "openSansReg": require('./assets/fonts/static/OpenSans-Regular.ttf'),
    "openSansBold": require('./assets/fonts/static/OpenSans-Bold.ttf'),
  });
  if (!isLoaded) return null;

  return (
    <ContextProvider>
      <NavigationContainer>
        <NavStack.Navigator initialRouteName='ListsMan' screenOptions={{ headerShown: false }}>
          {/* PersonalProfile */}
          <NavStack.Screen name='Splash' component={Splash} />
          <NavStack.Screen name='OnBoarding' component={OnBoarding} />
          <NavStack.Screen name='SignInScreen' component={SignInScreen} />
          <NavStack.Screen name='Login' component={Login} />
          <NavStack.Screen name='RegNewAccount' component={RegNewAccount} />
          <NavStack.Screen name='PersonalProfile' component={PersonalProfile} />

          <NavStack.Screen name='DropDownScreen' component={DropDownScreen}/>
          <NavStack.Screen name='DropDownSearchStreet' component={DropDownSearchStreet}/>
          {/* <NavStack.Screen name='DropDownMachine' component={DropDownMachine}/> */}

          <NavStack.Screen name='ListsMan' component={ListsMan} />
        </NavStack.Navigator>

      </NavigationContainer>
    </ContextProvider>
    // <Login/> change the PersonalProfile to splash on the initialRouteName
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  AppText: {
    fontFamily: 'openSansReg',
    fontSize: 16,
  },

})


{/*
Deploy hook:
https://api.render.com/deploy/srv-cjp28ur6fquc73aq72k0?key=Fh5SMp6Ghj4
*/
}