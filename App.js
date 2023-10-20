
// import { useFonts } from 'expo-font';

import * as Font from 'expo-font';
//navigation stuff
import 'react-native-gesture-handler';
import  React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import ContextProvider from './Src/Context/ContextProvider';

import { StyleSheet } from 'react-native';

import Login from './Src/Screens/Login';
import Splash from './Src/Screens/Splash';
import OnBoarding from './Src/Screens/OnBoarding';
import SignInScreen from './Src/Screens/SignInScreen';
import RegNewAccount from './Src/Screens/RegNewAccount';
import PersonalProfile from './Src/Screens/PersonalProfile';
import DropDownScreen from './Src/Screens/DropDownScreen';// **
import DropDownSearchStreet from './Src/Screens/DropDownSearchStreet';
import AboutUs from './Src/Screens/AboutUs';
// import DropDownMachine  from './Src/Screens/DropDownMachine';

import DisplayBadges from './Src/Screens/DisplayBadges';
import ListsMan from './Src/Screens/ListsMan';
import ListScreen from './Src/Screens/ListScreen';

// SplashScreen.preventAutoHideAsync();
// const navigation  = useNavigation();
const NavStack = createStackNavigator();


export default function App() {

  const [fontLoaded, SetFontLoaded] = useState(false);

    const loadFonts = async () => {
    await Font.loadAsync({
      'openSansReg': require('./assets/fonts/OpenSans-Regular.ttf'),
      'openSansBold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'openSansLightItalic': require('./assets/fonts/OpenSans-LightItalic.ttf'),
    });
    SetFontLoaded(true);
}
useEffect(()=>{loadFonts()},[])
  // if (!isLoaded) return null;

  return (
    <ContextProvider>
      <NavigationContainer>{/* ListsMan */}
        <NavStack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
          {/* PersonalProfile */}
          <NavStack.Screen name='Splash' component={Splash} />
          <NavStack.Screen name='OnBoarding' component={OnBoarding} />
          <NavStack.Screen name='SignInScreen' component={SignInScreen} />
          <NavStack.Screen name='Login' component={Login} />
          <NavStack.Screen name='RegNewAccount' component={RegNewAccount} />
          <NavStack.Screen name='PersonalProfile' component={PersonalProfile} />

          <NavStack.Screen name='DropDownScreen' component={DropDownScreen} />
          <NavStack.Screen name='DropDownSearchStreet' component={DropDownSearchStreet} />
          {/* <NavStack.Screen name='DropDownMachine' component={DropDownMachine}/> */}

          <NavStack.Screen name='ListsMan' component={ListsMan} />

          <NavStack.Screen name='AboutUs' component={AboutUs} />
          <NavStack.Screen name='DisplayBadges' component={DisplayBadges} />
          <NavStack.Screen name='ListScreen' component={ListScreen} />
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