import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'
import { UserContext2 } from '../Context/ContextProvider';

export default function RegName({ nextStep }) {

	const { name, SetName } = useContext(UserContext2);

	const [warningSwitch, SetWrningSwitch] = useState(false);

	const confirmAndNextStep = () => {
		const unRegEx = /^[A-Za-z!@#$%^&*_+]{1,60}$/;  //^[A-Za-z!@#$%^&*_+]{1,60}$
		if (!unRegEx.test(name)) {
			SetWrningSwitch(true);
		}
		else {
			nextStep(name);
		}

	}
	return (
		<View style={styles.inputFieldFlex}>
			<Text style={styles.inputTitle}>איך היית רוצה להקרא?</Text>

			<TextInput
				style={styles.basicGrayInputBox}
				value={name}
				onChangeText={(name) => { SetName(name) }}
				keyboardType='name-phone-pad'
			/>
			<View style={styles.submitAndInfo}>
				<Pressable onPress={confirmAndNextStep} style={styles.regRegistr}>
					<Text style={styles.BtnText}>הבא</Text>
				</Pressable>
				{
					warningSwitch ? <View>
						<Text style={[styles.dataConditions]}> שם משתמש עד 60 תוים ללא רווחים </Text>
						{/* <Text style={styles.dataConditions}>וללא רווחים</Text> */}
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
		textAlign: 'right',
	},


	// infoConditions: {
	// 	textAlign: 'right',
	// 	color: '#fff',
	// 	fontFamily: 'openSansReg',
	// 	fontSize: 13,
	// },


})

// textBlkRight:{
// 	color:'#000',
// 	fontFamily:'openSansReg',
// 	textAlign:'right',		
// }