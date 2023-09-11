import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useContext } from 'react';
import { UserContext2 } from '../Context/ContextProvider';



export default function RegRecycPrefs({ nextStep }) {
	const { recycPrefs, SetRecycPrefs } = useContext(UserContext2);
	const [confirmedClick, SetConfirmedClick] = useState(null);
	
	const txtBtnOptions = ['מקפיד מאוד וגם מייצר קומפוסט', 'מקפיד נייר-כחול/זכוכית-סגול/אחר-כתום', 'מפריד זכוכית והשאר בכתום', 'הכל הולך לפח הכתום פרט לפסולת הרגילה', 'לא כזה מטריד אותי'];

	const confirmAndNextStep =(index)=>{
		if(recycPrefs === index && confirmedClick === index){
			// SetConfirmedClick(index);
			nextStep(recycPrefs);
		}
		else /*if(recycPrefs!==confirmedClick)*/ {
			SetRecycPrefs(index);
			SetConfirmedClick(index);
		}
	}

	return (
		<View style={styles.inputFieldFlex}>
			<Text style={styles.inputTitle}>מה יחסך למיחזור?</Text>

			<View style={styles.arrayOfSelectioBtns}>
				{
					txtBtnOptions.map((txtBtnOption, index) => (
						<Pressable
							key={index}
							style={[styles.regRegistr,
							recycPrefs === index && styles.selected,
							recycPrefs !== null && recycPrefs !== index && styles.noneSelected]}
							onPress={() => confirmAndNextStep(index)} //SetRegisteredValue(index)
						>
							<Text style={styles.btnText}>{txtBtnOption}</Text>
						</Pressable>
					)) }
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	inputFieldFlex:{
		flex: 1,
		textAlign: 'right',
		paddingTop:'8%',
	},
	inputTitle:{
		color: '#000',
		fontFamily: 'openSansReg',
		textAlign: 'right',

		fontSize: 15,

		marginBottom: 5,
	},
	btnText: {
		fontFamily: 'openSansReg',
		fontSize: 14,
	},
	regRegistr: {
		backgroundColor: '#fff',

		width: 300,
		height: 39,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5.22,
		
		marginBottom:10,
	},
	selected:{
		borderWidth: 3,
		borderColor: '#000',
	},
	noneSelected:{
		opacity: 0.5,
	}

})