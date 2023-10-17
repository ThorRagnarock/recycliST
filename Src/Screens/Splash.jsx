import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect  } from 'react'
import { useNavigation } from '@react-navigation/native';


export default function Splash() {
	const navigation = useNavigation();

	//TODO If user already signed in in the past than skip OnBoarding
	//Go to lists directly
	useEffect(()=> { 
		const timer = setTimeout(() => {
		  navigation.navigate('OnBoarding');
		  //TODO condition here to count if the user ever signed and/or read the recyclist onboarding
		}, 3000);
		return () => clearTimeout(timer);
	  }, [navigation]);


	return (
		<View style={styles.container}>
			<Image 
			style={styles.splashImage}
			resizeMode='contain'
			source={require('../../assets/icons/recycliSTSplashLogo.png')} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#6d8fe6',
		alignItems: 'center',
		justifyContent: 'center',
	},
	splashImage: {
		width: 414,
	},
})