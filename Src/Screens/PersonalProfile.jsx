import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Animated, Alert, TextInput, Platform } from 'react-native'
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

import { UserContext2 } from '../Context/ContextProvider';

export default function PersonalProfile() {

	let mockupSubscribeDate = new Date(2023, 6, 18); //remember january = 0

	const navigation = useNavigation();
	const [Editing, SetEditing] = useState(false);

	const StartEdit = () => { SetEditing(true); Alert.alert("start editing") }
	const ConcludeEdit = () => { SetEditing(false); Alert.alert("done editing") }


	const [subscribeDate, SetSubscriberDate] = useState(mockupSubscribeDate); //new Date()
	//skipping the option to edit recyclePreferences
	const { email, SetEmail, name, SetName, password, SetPassword, recycPrefs, SetRecycPrefs } = useContext(UserContext2);

	const [residence, SetResidence] = useState({
		city: "",
		street: "",
		streetNum: null,
	});
	const settingPressed = () => {
		Alert.alert("settings!")
	}
	const [status, SetStatus] = useState('');
	const [birthDate, SetBirthDate] = useState(null);
	const [formData, SetFormData] = useState({
		email: email,
		password: password,
		name: name,

		residence: residence,
		status: status,
		birthdate: birthDate,
		subscribeDate: subscribeDate,
	})

	const [textVisible, SetTextVisible] = useState(false);
	const timeRef = React.useRef(null);
	const [animatedFadeout] = useState(new Animated.Value(1));

	const handleLongPress = () => {
		SetTextVisible(true);
		animatedFadeout.setValue(1);
		if (timeRef.current) clearTimeout(timeRef.current)
		timeRef.current = setTimeout(() => {

			Animated.timing(
				animatedFadeout, {
				toValue: 0,
				duration: 3000,
				useNativeDriver: true,
			}
			).start(() => SetTextVisible(false))
		}, 3000);
	}
	const alertMsgForCheck = () => { Alert.alert('your interaction seems to be working ok') }
	return (
		<View style={styles.backgroundGradient}>
			<LinearGradient
				colors={['rgba(161, 178, 166, 0.75)', 'rgba(255, 255, 255, 0.00)']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				locations={[0, 0.89]}
				style={styles.linearGradient}
			>
				<View style={styles.container}>
					{/* <Text>PersonalProfile</Text> */}
					<View style={styles.title}>
						<TouchableOpacity onPress={Editing ? ConcludeEdit : StartEdit} onLongPress={handleLongPress}>
							<Image source={require('../../assets/icons/SettingsCogwheel.png')} resizeMode='contain' />
							{
								textVisible &&
								<Animated.Text style={{ fontFamily: 'openSansReg', fontSize: 11, color: '#7394E7', opacity: animatedFadeout }}>עריכה</Animated.Text>
							}
						</TouchableOpacity>
						<TouchableOpacity onLongPress={() => navigation.navigate('SignInScreen')}>
							<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={styles.LogoImage} resizeMode='contain' />
						</TouchableOpacity>
					</View>

					<View style={styles.profilePictureView}>
						<Pressable style={styles.changeProfilePicBtn} onPress={alertMsgForCheck}>
							<Image source={require('../../assets/icons/EditProfileImageIcon.png')} />
						</Pressable>
						<View style={styles.profilePicContainer}>
							<Image source={require('../../assets/icons/profilePicture.png')} style={styles.ProfilePicture} />

						</View>
					</View>
					<View style={styles.nameAndGreeting}>
						<Text style={styles.greetingTitle}>היי, {formData.name}</Text>
						<Text style={styles.memberSince}>חבר החל מ{formData.subscribeDate.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}</Text>
					</View>

					<View style={styles.formFieldsContainer}>
						<View style={styles.addressDetails}>
							<View style={styles.addressDetail}>
								<TextInput
									style={[styles.textBoxStyle, { width: 140 }]}
									placeholder='###'
									value={residence.city}
									editable={Editing}
									onChangeText={text => SetResidence(pervResidence => ({ ...pervResidence, city: text }))}
								/>
								<Text style={styles.addressSubtitle}>ישוב</Text>
							</View>
							<View style={styles.addressDetail}>
								<TextInput
									style={[styles.textBoxStyle, { width: 140 }]}
									placeholder='###'
									value={residence.street}
									editable={Editing}
									onChangeText={text => SetResidence(pervResidence => ({ ...pervResidence, street: text }))}
								/>
								<Text style={styles.addressSubtitle}>רחוב</Text>
							</View>
							<View style={styles.addressDetail}>
								<TextInput
									style={[styles.textBoxStyle, { width: 30 }]}
									placeholder='00'
									value={residence.streetNum ? residence.streetNum.toString() : ''}
									editable={Editing}
									keyboardType='numeric'
									onChangeText={text => SetResidence(pervResidence => ({ ...pervResidence, streetNum: Number(text) }))}
								/>
								<Text style={styles.addressSubtitle}>מס׳</Text>
							</View>
						</View>
						<View style={styles.personalDetails}>
							{/* birthdate, status, password, email (that order)*/}
							<View style={[styles.verticalFormItem, styles.dateItem]}>
								<Pressable
									style={[styles.textBoxStyle, { width: 210, height: 20 }]}>

									<Text style={styles.placeHolderText}>date of some sort</Text>

								</Pressable>
								<Text style={styles.generalSubtitle}>תאריך לידה</Text>
							</View>
							<View style={[styles.verticalFormItem, styles.null]}>
							<TextInput
									style={[styles.textBoxStyle, {width:210}]}
									// placeholder='###'
									value={residence.city}
									editable={Editing}
									onChangeText={text => SetResidence(pervResidence => ({ ...pervResidence, city: text }))}
								/>
								<Text style={styles.generalSubtitle}>סטטוס אישי</Text>

							</View>

						</View>
					</View>
				</View>
			</LinearGradient>
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundGradient: {
		flex: 1,
	},
	container: {},
	linearGradient: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	title: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 330,

		top: '9%',
	},
	profilePictureView: {
		zIndex: -10,
		alignItems: 'center',
		marginTop: -15,
	},
	changeProfilePicBtn: {
		zIndex: 3,
		width: 30,
		top: 32,
		left: 32,
		// elevation: 5, //for android
		shadowColor: '#000',
		shadowOffset: { width: -3, height: 3 },//bottom left below this
		shadowOpacity: 0.55,
		shadowRadius: 3.84,
	},
	profilePicContainer: {
		width: 100,
		height: 100,
		overflow: 'hidden',
		borderRadius: 100,
		backgroundColor: '#6D8FE6',

	},
	ProfilePicture: {
		// zIndex:1,
		flex: 1,
		width: 100,
		top: 5,

		resizeMode: 'contain',
	},
	LogoImage: {
		width: 60,
	},
	addressDetails: {
		marginTop: 15,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
	},
	addressDetail: {
		textAlign: 'right',
		alignItems: 'flex-end',
		flexDirection: 'column'
	},
	textBoxStyle: {
		backgroundColor: '#d9d9d9',
		padding: 1,
		textAlign: 'right',
		borderColor: '#ccc',
		borderWidth: 1,


	},
	verticalFormItem: {
		flexDirection: 'row',
		textAlign: 'right',
		justifyContent: 'flex-end',
		justifyContent: 'space-between',
		marginTop: 20,

	},
})
//background: linear-gradient(180deg, rgba(161, 178, 166, 0.75) 0%, rgba(255, 255, 255, 0.00) 88.99%);

