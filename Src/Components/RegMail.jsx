import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'
import { UserContext2 } from '../Context/ContextProvider'

export default function RegMail({ nextStep }) {
	const { email, SetEmail } = useContext(UserContext2);
	const [warningSwitch, SetWrningSwitch] = useState(false);
	const confirmAndNextStep = () => {
		const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if (!emailRegEx.test(email)) {
			SetWrningSwitch(true);
		}
		else {
			nextStep(email);
		}
	}
	return (
		<View style={styles.inputFieldFlex}>
			<Text style={styles.inputTitle}>מה היא כתובת האי מייל שלך?</Text>

			<TextInput
				style={styles.basicGrayInputBox}
				value={email}
				onChangeText={(email) => { SetEmail(email) }}
				keyboardType='email-address'
				
			/>
			<Text style={styles.infoConditions}>
				תתבקש לאשר את כתובת המייל
			</Text>

			<View style={styles.submitAndInfo}>
				<Pressable onPress={confirmAndNextStep} style={styles.regRegistr}>{/* //that's where the next step takes place */}
					<Text style={styles.BtnText}>הבא</Text>
				</Pressable>
				{
					warningSwitch ?
					<Text style={styles.dataConditions}>נא להזין כתובת אי מייל חוקית</Text>:null
					//or: that mail is already on our database. Sign In
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	inputTitle: {
		color: '#000',
		fontFamily: 'openSansReg',
		textAlign: 'right',

		fontSize: 15,

		marginBottom: 5,
	},
	inputFieldFlex: {
		flex: 1,
		textAlign: 'right',
		paddingTop: '8%',
	},
	basicGrayInputBox: {
		backgroundColor: '#D9D9D9',

		height: 40,
		width: 330,

		marginBottom: 5,
	},
	infoConditions: {
		color: '#fff',

		fontFamily: 'openSansReg',
		textAlign: 'right',

		fontSize: 13,
		// marginBottom:5,
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

		marginBottom: 10,
	},
	submitAndInfo: {
		alignItems: 'center',
		marginTop: 40,
	},
	dataConditions: {
		color: '#FFD15E',
		fontFamily: 'openSansBold',
		fontSize: 13,
	},
})



		// justifyContent: 'center'//vertical align
		// justifyContent: 'center', | textAlign: 'left', | flexDirection:'row', | alignSelf
