
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Animated, Alert, TextInput, Platform, Dimensions, SafeAreaView, ScrollView, Linking } from 'react-native'//////
import React, { useState, useContext, } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext2 } from '../Context/ContextProvider';
import { IsExistingUser } from '../../utils/IsExistingUser';

import * as ImagePicker from 'expo-image-picker';

import FloatingOptionPicker, { floatingOptionPicker } from '../Components/FloatingOptionPicker'
import ProfileStatistics from '../Components/ProfileStatistics';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PersonalProfile() {
	const screenWidth = Dimensions.get('window').width;
	const navigation = useNavigation();
	const [Editing, SetEditing] = useState(false);
	const [hasAlerted, SetHasAlerted] = useState(false);

	const StartEdit = () => { SetEditing(true); Alert.alert("מצב עריכה") }
	const ConcludeEdit = () => {
		SetDatePickerSwitch(false);
		SetOptionPicker(false);
		SetEditing(false); Alert.alert("עריכה הסתיימה")
	}
	
	const now = new Date();

	// //this.accountCreated = ;
	// SetSubscriberDate (`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

	// let mockupSubscribeDate = new Date(2023, 6, 18); //remember january = 0
	// /*#  TODO!!!  #*/const [subscribeDate, SetSubscriberDate] = useState(mockupSubscribeDate); //new Date() - TODO!!!!

	//{ name, email, password, recycPrefs, birthDate, residence, status, profileImage:profileImage.base64 }
	const {
		name, SetName,
		email, SetEmail,
		password, SetPassword,
		recycPrefs, SetRecycPrefs,
		residence, SetResidence,

		status, SetStatus,
		birthDate, SetBirthDate,
		profileImage, SetProfileImage,

		subscribeDate, SetSubscriberDate,

		points, SetPoints,
		shoppingLists, SetShoppingLists,
		currentUser, SetCurrentUser,
		loginer,
		logOuter } = useContext(UserContext2);

	const formData = ({
		name: name,

		email: email,
		password: password,
		recycPrefs: recycPrefs,
		birthDate: birthDate,

		residence: residence,
		status: status,
		subscribeDate: subscribeDate,
	})
	const [textVisible, SetTextVisible] = useState(false);
	const timeRef = React.useRef(null);
	const [animatedFadeout] = useState(new Animated.Value(1));
	/////////// birthday date gadget thingie //////
	const [datePickerSwitch, SetDatePickerSwitch] = useState(false);
	const [optionPicker, SetOptionPicker] = useState(false);
	const dateEventChange = (event, selectedDate) => {
		const currentDate = selectedDate || birthDate;
		SetDatePickerSwitch(Platform.OS === 'ios');
		SetBirthDate(currentDate);
	}
	const dateFormatter = birthDate ? `${('0' + (birthDate.getDate())).slice(-2)}/${('0' + (birthDate.getMonth() + 1)).slice(-2)}/${birthDate.getFullYear()}` : "00/00/0000";
	const minAge = new Date(); minAge.setFullYear(minAge.getFullYear() - 8);
	const maxAge = new Date(); maxAge.setFullYear(maxAge.getFullYear() - 120);

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
	const upsertUserDetails = async () => {

		console.log("Got into the upsert function on the PersonalProfile");
		let user = { name, email, password, recycPrefs, birthDate, residence, status, profileImage:profileImage.base64 }

		console.log(`running upsert func\n\r-userDetails obj: ${user}`);

		if (IsExistingUser(email)) {	//in case of new user (insert)
			console.log(user);
			let res = await fetch('https://recyclistserver.onrender.com/api/users/register', {
				method: 'POST',
				headers: {
					Accept: "application/json",
					"Content-type": "application/json",
				},
				body: JSON.stringify(user)
			})
				.then(resp => resp.json())
				.then(data => {
					console.log(data)
				})
				.catch(error=>{console.error('error registring user:', error);});
			// navigation.navigate('Login');
		} else {						//in case of existing user (update)
			let res = await fetch('https://recyclistserver.onrender.com/api/users/returnId', {
				method: 'POST',
				headers: {
					Accept: "application/json",
					"Contnet-type": "application/json",
				},
				body: JSON.stringify({ email })
			})
			const userId = await res.json();

			res = await fetch(`https://recyclistserver.onrender.com/api/users/${userId}`, {
				method: 'PUT',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user)
			})
			.then(resp=>resp.json())
			.then(data=>{
				console.log(data);
			})
			.catch(error=>{console.error('error updating user:', error);});
		}
	}
	async function HandleImageUpload() {
		// console.log("Image upload button");
		let { permissionStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
		if (permissionStatus !== 'granted' && !hasAlerted) {
			let perrmissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (perrmissionResult !== 'granted') {
				SetHasAlerted(true);
				Alert.alert(
					'יש צורך באישור גישה לרול מצלמה',
					'נא לאשר גישה לרול מצלמה בהגדרות הטלפון',
					[
						{ text: 'ביטול', onPress: () => console.log('Permission Denied'), style: 'cancel' },
						{ text: 'אפשרויות', onPress: () => Linking.openSettings() },
					]
				)
				// Alert.alert('Camera roll permissions needed!');
				return;
			}
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.1,
			base64: true,
		});
		if (!result.canceled) {
			// const base64Image = await toBase64(result.uri);
			SetProfileImage(result.assets[0]);
		}
		console.log(Object.keys(result.assets[0]));
		// console.log(result.assets[0].base64);
		// console.log(result.assets);


		// if (!result.canceled) {
		// 	// const base64Image = await toBase64(result.uri);
		// 	SetProfileImage(result.assets[0]);
		// }
	}
	return (
		<View style={styles.backgroundGradient}>
			<LinearGradient
				colors={['rgba(161, 178, 166, 0.75)', 'rgba(255, 255, 255, 0.00)']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				locations={[0, 0.89]}
				style={styles.linearGradient}
			>
				<SafeAreaView>
					<ScrollView style={styles.container}>
						{/* logo and cogwheel */}
						<View style={[styles.title]}>
							<TouchableOpacity onPress={Editing ? ConcludeEdit : StartEdit} onLongPress={handleLongPress}>
								<Image source={require('../../assets/icons/SettingsCogwheel.png')} resizeMode='contain' />
								{
									textVisible &&
									<Animated.Text style={{ fontFamily: 'openSansReg', fontSize: 11, color: '#7394E7', opacity: animatedFadeout }}>עריכה</Animated.Text>
								}
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={styles.LogoImage} resizeMode='contain' />
							</TouchableOpacity>
						</View>
						{/* Image and Name */}

						<View style={[styles.wrapper, styles.ImageAndName,]}>
							<View style={[styles.profilePictureView]}>
								<Pressable style={[styles.changeProfilePicBtn]} onPress={() => HandleImageUpload()}>
									<Image source={require('../../assets/icons/EditProfileImageIcon.png')} />
								</Pressable>
								<View style={[styles.profilePicContainer]}>
									{
										profileImage == ""
											? <Image source={require('../../assets/icons/profilePicture.png')} style={[styles.ProfilePicture]} />
											: <Image source={{ uri: profileImage.uri }} style={[styles.ProfilePicture]} />
									}

								</View>
							</View>
							<View style={[styles.nameAndGreeting]}>
								<Text style={{ fontFamily: 'openSansBold', fontSize: 14.5 }}>היי, {formData.name}</Text>
								<Text style={{ fontFamily: 'openSansReg', fontSize: 12, color: '#7394E7' }}>חבר החל מ{formData.subscribeDate.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}</Text>
							</View>
						</View>

						{/* d */}
						<View style={[styles.formFieldsContainer, styles.wrapper]}>
							<View style={[styles.addressDetails, {}]}>
								<View style={[styles.addressDetail, { marginLeft: 15, }]}>
									<Pressable
										style={[styles.textBoxStyle, { width: 140, }]}
										onPress={() => navigation.navigate('DropDownScreen', { SetResidence })}>
										<Text style={styles.oSans12r}>{residence.city ? `${residence.city}` : 'ישוב'}</Text>
									</Pressable>
									<Text style={styles.generalSubtitle}>ישוב</Text>
								</View>
								<View style={[styles.addressDetail, { marginLeft: 15, }]}>
									<Pressable
										style={[styles.textBoxStyle, { width: 140, }]}
										onPress={() => navigation.navigate('DropDownSearchStreet', { SetResidence })}>
										<Text style={styles.oSans12r}>{residence.street ? `${residence.street}` : 'רחוב'}</Text>
									</Pressable>
									<Text style={styles.generalSubtitle}>רחוב</Text>
								</View>
								<View style={[styles.addressDetail, { marginLeft: 15, }]}>
									<TextInput
										key={residence.streetNum}
										style={[styles.textBoxStyle, styles.oSans12r, { width: 30 }]}
										placeholder={residence.streetNum ? residence.streetNum.toString() : '00'}
										value={residence.streetNum ? residence.streetNum.toString() : ''}
										editable={Editing}
										keyboardType='numeric'
										onChangeText={text => SetResidence(pervResidence => ({ ...pervResidence, streetNum: Number(text) }))}
									/>
									<Text style={styles.generalSubtitle}>מס׳</Text>
								</View>

							</View>
							{/** So far address View */}
							<View style={styles.personalDetails}>
								<View style={[styles.verticalFormItem, styles.dateItem]}>
									<Pressable
										style={[styles.textBoxStyle, { width: 210, height: 25 }]}
										onPress={() => { SetDatePickerSwitch(true); }}  //SetDatePressableOn(true); 
										disabled={!Editing}
									>
										<Text style={[styles.placeHolderText, { textAlign: 'center' }]}>{dateFormatter}</Text>
										{(datePickerSwitch) &&
											(<DateTimePicker
												testID='dateTimePicker'
												value={birthDate ? birthDate : new Date()}
												mode='date'
												display='default'
												onChange={dateEventChange}
												maximumDate={minAge}
												minimumDate={maxAge}
											/>
											)}
									</Pressable>
									<Text style={styles.generalSubtitle}>תאריך לידה</Text>
								</View>
								<View style={[styles.verticalFormItem, styles.null]}>
									<Pressable
										style={[styles.textBoxStyle, { width: 210 }]}
										value={status}
										disabled={!Editing}
										onPress={() => SetOptionPicker(true)}
									>
										<Text style={[styles.placeHolderText, { textAlign: 'center' }]}>{status}</Text>
									</Pressable>
									<FloatingOptionPicker status={status} SetStatus={SetStatus} optionPicker={optionPicker} SetOptionPicker={SetOptionPicker} style={{ zIndex: 9999 }}
									/>

									<Text style={styles.generalSubtitle}>סטטוס אישי</Text>
								</View>
								<View style={[styles.verticalFormItem, { zIndex: 1 }]}>
									<TextInput
										style={[styles.textBoxStyle, { width: 210 }]}
										value={password}
										editable={Editing}
										onChangeText={() => Alert.alert('TODO: change/reset password?')}
									/>
									<Text style={styles.generalSubtitle}>סיסמה</Text>
								</View>

								{/*so the problem is not with the email... maybe the date thing  */}
								<View style={[styles.verticalFormItem, { zIndex: 1 }]}>
									<TextInput
										style={[styles.textBoxStyle, { width: 210 }]}
										value={email}
										editable={Editing}
										onChangeText={() => Alert.alert('TODO: should kept locked')}
									/>
									<Text style={styles.generalSubtitle}>אימייל</Text>
								</View>



								<View style={[styles.verticalFormItem, { zIndex: 1 }]}>
									<TextInput
										style={[styles.textBoxStyle, { width: 210, height: 1000 }]}
										value={profileImage?.base64}
										editable={Editing}
										// onChangeText={() => Alert.alert('TODO: should kept locked')}
										multiline

									/>
									<Text style={styles.generalSubtitle}>אימייל</Text>
								</View>
							</View>
						</View>

						<View style={styles.wrapper}>

							<Text style={[styles.generalSubtitle, { marginTop: 35, }]}>סטטיסטיקה</Text>
							<ProfileStatistics />
						</View>
					</ScrollView>
				</SafeAreaView>

				<View style={styles.profileFooterPressable}>
					<TouchableOpacity style={[styles.footerTouchable, { width: screenWidth }]} onPress={() => upsertUserDetails()}>
						<Text style={styles.footerText}>סיים - ונכנס לאפליקציה :)</Text>
					</TouchableOpacity>
				</View>
				{/** I want that it would get me back to the login */}
			</LinearGradient>
		</View>
	)
}
const styles = StyleSheet.create({
	backgroundGradient: {
		flex: 1,
	},
	container: {
		flex: 21,
	},
	linearGradient: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	LogoImage: {
		width: 60,
	},
	title: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 330,
	},
	wrapper: {},
	ImageAndName: {	},
	profilePictureView: {
		flex: 7, 		// zIndex: -10, // marginTop:-20,
		alignItems: 'center',
		padding: 0,
	},
	nameAndGreeting: {
		flex: 3,
		alignItems: 'center',
	},
	changeProfilePicBtn: {
		zIndex: 3,
		width: 30,
		top: 32,
		left: 32,
		backgroundColor: 'rgba(255, 255, 255, 0.01)', // Transparent background

		elevation: 5, //for android
		shadowColor: '#000',
		shadowOffset: { width: -3, height: 3 },//bottom left below this
		shadowOpacity: 0.55,
		shadowRadius: 3.84,
	},
	profilePicContainer: {
		width: 90,
		height: 90,
		overflow: 'hidden',
		borderRadius: 100,
		backgroundColor: '#6D8FE6',
		padding: 0,
		margin: 0,
	},
	ProfilePicture: {
		flex: 1,
		width: 90,
		// top: 0,
		resizeMode: 'cover',
	},
	formFieldsContainer: {
		flex: 21,
		flexDirection: "column",
		flexWrap: 'wrap-reverse',
		alignItems: 'center'
	},
	addressDetails: {
		marginTop: 15,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		flex: 10,
	},
	addressDetail: {
		textAlign: 'right',
		alignItems: 'flex-end',
		flexDirection: 'column',
	},
	textBoxStyle: {
		height: 25,
		justifyContent: 'center',
		backgroundColor: '#d9d9d9',
		padding: 1,
		textAlign: 'right',
		borderColor: '#ccc',
		borderWidth: 1,
		fontFamily: 'openSansReg',
	},
	personalDetails: {},
	floatingOptionPicker: {
		position: 'absolute',
		zIndex: 9999,
		bottom: 300,
		left: 30,
		backgroundColor: 'white',
		width: '80%',
		alignSelf: 'center',
	},
	verticalFormItem: {
		zIndex: 2,
		flexDirection: 'row',
		textAlign: 'right',
		justifyContent: 'flex-end',
		justifyContent: 'space-between',
		marginTop: 30,
	},
	profileFooterPressable: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
	},
	footerTouchable: {
		backgroundColor: '#6D8FE6',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
	},
	footerText: {
		fontFamily: 'openSansBold',
		color: '#fff'
	},
	oSans12r: {
		textAlign: 'right',
		fontFamily: 'openSansReg',
		fontSize: 12,
	},
	generalSubtitle: {
		textAlign: 'right',
		fontFamily: 'openSansBold',
		fontSize: 13,
	},
	placeHolderText: {
		fontFamily: 'openSansReg',
		fontSize: 12,
	},
})
