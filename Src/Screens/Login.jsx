import { View, Text, TextInput, Alert, StyleSheet, Image, Pressable, Switch, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {UserContext2} from '../Context/ContextProvider';

export default function Login() {
	const { currentUser, SetCurrentUser, handleActiveMember } = useContext(UserContext2);
	const [email, SetEmail] = useState('');
	const [password, SetPassword] = useState('');
	const [ togglePasswordVisibility, SetTogglePasswordVisibility ]=useState(true);
	const [switchEnabled, SetSwitchEnabled] = useState(true); //remember login details

	const onToggleSwitch = () => { SetSwitchEnabled(previousState => !previousState) };
	const onVisibilitySwitch = () => { SetTogglePasswordVisibility(prevState => !prevState)}
	const navigation = useNavigation();
	const resetPassword = () => {
		Alert.alert('TODO: password reset');
	}

	useEffect(()=>{
		if(currentUser){
			console.log("current user been updated: ", currentUser.email);
			navigation.navigate('ListsMan');
		}
	},[currentUser])
	//////////////////////////////////////////////////////////////////////
	async function submitDetails() {
		// console.log("Email and password entered: ", currentUser.email, currentUser.password );
		
		let loginUser = { email, password };
		console.log("1. contextProvider's loginer: server calling...");

		let res = await fetch('https://recyclistserver.onrender.com/api/users/login', { //
			method: 'POST',
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify(loginUser)
		})
		let data = await res.json();
		console.log(res.status);
		if (res.status == 200) {
			await handleActiveMember(data, switchEnabled);
			// await SetCurrentUser(data);
			return true;
		} else {
			console.warn("login error...");
			return false;
		}
		// if (loginFeedback) {}
		// else console.log("false details");
	}
	//////////////////////////////////////////////////////////////////////

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
				<Image
					style={styles.splashLogo} resizeMode='contain' source={require('../../assets/icons/recycliSTLogo113.png')} />
			</TouchableOpacity>
			<View style={styles.content}>
				<Text style={styles.boldCentered16}>התחבר/י לצורך כניסה</Text>

				<Text style={styles.regular15}>כתובת אי מייל</Text>
				<View style={styles.InputContainer}>
					<Image source={require('../../assets/icons/envelopIcon.png')} style={styles.iconStyle} />
					<TextInput
						style={styles.inputBox}
						onChangeText={(email) => { SetEmail(email) }}
						value={email}
						keyboardType="email-address"
					/>
				</View>
				<Text style={styles.regular15}>{"\n"}סיסמה</Text>
				<View style={styles.InputContainer}>
					<TouchableOpacity onPress={()=>onVisibilitySwitch()}>
						<Image resizeMode='contain' source={require('../../assets/icons/eyeCrossIcon.png')} style={styles.iconStyle} />
					</TouchableOpacity>
					<TextInput
						onChangeText={(password) => { SetPassword(password) }}

						style={styles.inputBox}
						value={password}

						keyboardType="visible-password"
						secureTextEntry={togglePasswordVisibility}
					/>
				</View>

				<View style={styles.detailOptions}>
					<Pressable onPress={resetPassword} >
						<Text style={styles.regularWhiteUnderscore14}>איפוס סיסמה</Text>
					</Pressable>
					<View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
						<Switch value={switchEnabled}
							onValueChange={onToggleSwitch}
							ios_backgroundColor={'#424B5A'}
							style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
						/>
						<Text style={{ fontFamily: 'openSansBold', color: '#fff', marginRight: 5, }}>זכור אותי</Text>
					</View>
				</View>
				<Pressable onPress={submitDetails} style={styles.regRegistr}  >
					<Text style={styles.BtnText}>הבא</Text>
				</Pressable>

			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#6d8fe6',
		alignItems: 'center',
	},
	splashLogo: {
		marginTop: '15%',
		marginBottom: 15,
	},
	InputContainer: {
		flexDirection: 'row',
		alignItems: 'center', //doens't help much
		marginBottom: -10,
	},
	iconStyle: {
		zIndex: 2,
		marginLeft: 20,
	},
	inputBox: {
		zIndex: -1000,
		height: 40,
		backgroundColor: '#D9D9D9',
		width: 330,
		marginLeft: -40,
		paddingLeft: 45,
	},
	boldCentered16: {
		fontFamily: 'openSansBold',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 10,
	},
	regular15: {
		fontFamily: 'openSansReg',
		fontSize: 15,
		textAlign: 'right',
		marginBottom: 3,
	},
	regularWhiteUnderscore14: {
		textDecorationLine: 'underline',
		fontFamily: 'openSansReg',
		fontSize: 14,
		color: '#fff',
		marginLeft: 12,
	},
	regRegistr: {
		backgroundColor: '#fff',
		width: 221,
		height: 39,
		alignItems: 'center',
		justifyContent: 'center',//that's wont basline elements
		borderRadius: 5.22,
		alignSelf: 'center',
		marginTop: 20,
	},
	BtnText: {
		fontFamily: 'openSansBold',
		fontSize: 16,
	},
	detailOptions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 25,
	}
})
