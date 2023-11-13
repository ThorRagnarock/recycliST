import {Dimensions, View, Text , StyleSheet, Image, Pressable, Alert} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
	const navigation = useNavigation();
	const StamKishkoosh = () => {
		alert("TODO: 3rd party");
	}
	const Registration = () => {
		navigation.navigate('RegNewAccount');
	}
	const Logintration = () => {
		navigation.navigate('Login');
	}

  return (
	  <View style={styles.container}>
		  <View style={styles.content}>
			  {/* <Text>SignInScreen</Text> */}
			  <Image style={styles.logoImage} resizeMode='contain' source={require('../../assets/icons/recycliSTGlowLSmall.png')} />

			  <View style={styles.SignInOpts}>
				  <Pressable style={styles.regRegistr} onPress={Registration}>
					  <Text style={styles.BtnText}>הרשמה בחינם</Text>
				  </Pressable>
				  {/* <Pressable style={styles.regOptsBlack} onPress={StamKishkoosh}>
					  <Text style={styles.whiteBoldtxt}>Ok Google</Text>
				  </Pressable>
				  <Pressable style={styles.regOptsBlack} onPress={StamKishkoosh}>
					  <Text style={styles.whiteBoldtxt}>Hi Siri</Text>
				  </Pressable> */}
				  <Pressable onPress={Logintration} style={{ marginTop: 15 }}>
					  <Text style={styles.whiteBoldtxt}>כניסה לרשומים</Text>
				  </Pressable>

			  </View>
		  </View>
	  </View>
  )
}
const { height, width } = Dimensions.get('window');

const styles= StyleSheet.create ({
	container: {
		flex:1,
		backgroundColor: '#6d8fe6',

		// justifyContent:'space-between',

	},
	content: {
		flex: 1,
		// backgroundColor: '#6d8fe6',
		alignItems: 'center',
		// position: 'relative',
		top: '30%',
		width:'100%',

		
		// width: width*2.2,
		// height: height*2.2,

	},
	logoImage: {
		width: 350,
	},
	SignInOpts: {
		marginTop:-45,
		// zIndex: 2,
		alignItems:'center',

		resizeMode:'contain',
		transform: [{scale: height*0.00142}]

	},
	
	
	regOptsBlack: {
		backgroundColor: '#000',
		width: 221,
		height: 39,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5.22,
		marginTop: 10,
		borderColor: '#074EE8',
		borderWidth:2.1,
	},
	whiteBoldtxt: {
		fontFamily: 'openSansBold',
		color: '#fff',

	},
	BtnText: {
		fontFamily: 'openSansBold',
		fontSize: 16,
	},
	regRegistr: {
		backgroundColor: '#fff',
		width: 221,
		height: 39,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5.22,
	},
})