import { View, Text, TextInput, Alert, StyleSheet, Image, Pressable, Switch, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


// import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

export default function Login() {
	const [inputEmail, SetInputEmail] = useState('');
	const [inputPassword, SetInputPassword] = useState('');
	const [switchEnabled, SetSwitchEnabled] = useState(true);

	const onToggleSwitch = () => { SetSwitchEnabled(previousState => !previousState) };
	const navigation = useNavigation();

	const resetPassword = () => {
		Alert.alert('TODO: password reset');
	}
	const submitDetails = () => {
		Alert.alert("TODO: Submit")
	}
	return (
		<View style={styles.container}>
			<TouchableOpacity onLongPress={() => navigation.navigate('SignInScreen')}>
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
						onChangeText={(email) => { SetInputEmail(email) }}
						value={inputEmail}
						keyboardType="email-address"
					/>
				</View>
				<Text style={styles.regular15}>{"\n"}סיסמה</Text>
				<View style={styles.InputContainer}>
					<Image source={require('../../assets/icons/eyeCrossIcon.png')} style={styles.iconStyle} />
					<TextInput
						onChangeText={(password) => { SetInputPassword(password) }}

						style={styles.inputBox}
						value={inputPassword}
						keyboardType="visible-password"
					// secureTextEntry
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#6d8fe6',
		alignItems: 'center',
		//justifyContent: 'center'
	},
	splashLogo: {
		marginTop: '15%',
		marginBottom: 15,
	},
	content: {

		// alignItems: 'center'
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
		zIndex: 1,
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
		// alignItems:'center',
		// justifyContent:'center',
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
