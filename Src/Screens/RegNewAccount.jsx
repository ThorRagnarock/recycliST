import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserContext2 } from '../Context/ContextProvider'

import RegMail from '../Components/RegMail';
import RegPassword from '../Components/RegPassword';
import RegName from '../Components/RegName';
import RegRecycPrefs from '../Components/RegRecycPrefs';

export default function RegNewAccount() {
	const navigation = useNavigation();

	const [currentStep, SetCurrentStep] = useState(1);
	const [formData, SetFormData] = useState({
		email: '',
		password: '',
		name: '',
		recycPrefrence: '',
	});
	const updateData = (field, value) => {
		SetFormData(prevData => ({
			...prevData, [field]: value,
		}));
	}

	const stepSwitcher = () => {
		switch (currentStep) {
			case 1:
				return <RegMail value={formData.email} updateData={updateData} nextStep={() => SetCurrentStep(2)} />;
			case 2:
				return <RegPassword value={formData.password} updateData={updateData} nextStep={() => SetCurrentStep(3)} prevStep={() => SetCurrentStep(1)} />;
			case 3:
				return <RegName value={formData.name} updateData={updateData} nextStep={() => SetCurrentStep(4)} prevStep={() => SetCurrentStep(2)} />;
			case 4:
				return <RegRecycPrefs value={formData.recycPrefrence} updateData={updateData}  nextStep={()=> navigation.navigate('PersonalProfile')}  prevStep={() => SetCurrentStep(3)} />
			default:
				return null;
		}
	}
	return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={{ fontFamily: 'openSansBold', fontSize: 16 }}>צור חשבון</Text>
					<TouchableOpacity onLongPress={() => navigation.navigate('SignInScreen')}>
						<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={{ width: 60 }} resizeMode='contain' />
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 30 }}>
					{
						stepSwitcher()
					}
				</View>
			</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#6d8fe6',
		alignItems: 'center',
		// justifyContent: 'center', | textAlign: 'left', | flexDirection:'row', | alignSelf


	},
	title: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 330,
		// borderColor: '#000',
		// borderWidth:1,	
		position: 'fixed',
		top: '9%',
	},
})