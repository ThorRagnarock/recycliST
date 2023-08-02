import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native'
import React, { useState, useContext } from 'react';
import { UserContext2 } from '../Context/ContextProvider';


export default function RegPassword({ nextStep }) {
	const { password, SetPassword } = useContext(UserContext2);
	
	//const [password, SetPassword] = useState('');
	const [warningSwitch, SetWrningSwitch] = useState(false);

	const confirmAndNextStep = () => {
		const pwRegEx =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_+]).{7,12}$/

		if (!pwRegEx.test(password)) {
			Alert.alert(password);
			SetWrningSwitch(true);
		}
		else { nextStep(password); }
	}

	return (
		<View style={styles.inputFieldFlex}>
			<Text style={styles.inputTitle}>צור סיסמה</Text>
			<TextInput
				style={styles.basicGrayInputBox}
				value={password}
				onChangeText={(password) => { SetPassword(password) }}
				keyboardType='visible-password'
				secureTextEntry
			/>
			<Text style={styles.infoConditions}>
				לפחות 8 תווים			</Text>

			<View style={styles.submitAndInfo}>
				<Pressable onPress={confirmAndNextStep} style={styles.regRegistr}>
					<Text style={styles.BtnText}>הבא</Text>
				</Pressable>
				{
					warningSwitch ? 
					<View>
						<Text style={[styles.dataConditions, {marginBottom: 5}]}>סיסמתך חייבת להיות בין 7 - 12 תווים, ולשלב:</Text>
						<Text style={[styles.dataConditions, {fontFamily: 'openSansReg'}]}>* אותיות קטנות וגדולות</Text>
						<Text style={[styles.dataConditions, {fontFamily: 'openSansReg'}]}>* ספרות</Text>
						<Text style={[styles.dataConditions, {fontFamily: 'openSansReg'}]}>* סימנים מיוחדים (כמו !@#$%^*_+)</Text>
						</View> : null
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	inputFieldFlex: {
		flex: 1,
		textAlign: 'right',
		paddingTop: '8%',
	},
	inputTitle: {
		color: '#000',
		fontFamily: 'openSansReg',
		fontSize: 15,
		textAlign: 'right',
		marginBottom: 5,
	},
	basicGrayInputBox: {
		height: 40,
		backgroundColor: '#D9D9D9',
		width: 330,
		marginBottom: 5,
	},
	infoConditions: {
		textAlign: 'right',
		color: '#fff',
		fontFamily: 'openSansReg',
		fontSize: 13,
	},
	submitAndInfo: {
		alignItems: 'center',
		marginTop: 40,
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
	BtnText: {
		fontFamily: 'openSansBold',
		fontSize: 16,
	},
	dataConditions: {
		color: '#FFD15E',
		fontFamily: 'openSansBold',
		fontSize: 13,
		textAlign: 'right'
	},
})