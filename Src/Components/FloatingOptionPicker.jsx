import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Picker } from '@react-native-picker/picker'; //option-select menu
import React, { useState } from 'react'

export default function FloatingOptionPicker({ status, SetStatus, optionPicker }) {
	const [pickerShown, SetPickerShown] = useState(true);

	const handlePickerValueChange = (itemValue, itemIndex) => {
		SetStatus(itemValue);
		SetPickerShown(false);
	}
	const controlOutsidPress =()=>{
		SetPickerShown(false);
	}

	if (!optionPicker ) { return null; } //|| !pickerShown
	return (
		<TouchableWithoutFeedback onPressOut={controlOutsidPress} >
			<View style={[styles.floatingOptionPicker, {}]}>
				<Picker
					selectedValue={status}
					selectionColor='#000'
					color='#fff'
					onValueChange={handlePickerValueChange}>{/*  the problem lies here |  (itemValue, itemIndex) => SetStatus(itemValue) */}



					<Picker.Item label='רווק/ה' value={'רווק/ה'} />
					<Picker.Item label='גרוש/ה' value={'גרוש/ה'} />
					<Picker.Item label='נשוי/נשואה' value={'נשוי/נשואה'} />
					<Picker.Item label='אלמן/ה' value={'אלמן/ה'} />
					<Picker.Item label='מעדיף/ה שלא לשתף' value={'מעדיף/ה שלא לשתף'} />
				</Picker>
				<Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'openSansReg' }}>קליק בגלגל שיניים כדי לסגור</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	floatingOptionPicker: {
		zIndex: 1000,

		position: 'absolute',
		top: -97,
		left: 30,
		backgroundColor: 'rgba(109, 143, 230, 0.9)',
		// color:'#fff',
		width: '80%',
		alignSelf: 'center',
		borderRadius: 15,
		////
		shadowColor: '#000',
		shadowOffset: { width: -3, height: 3 },//bottom left below this
		shadowOpacity: 0.55,
		shadowRadius: 3.84,
	}
});