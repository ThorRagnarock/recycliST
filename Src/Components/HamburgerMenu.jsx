import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, Alert, Dimensions, Linking, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Application from 'expo-application';
import * as Device from 'expo-device';


import React, { useState, } from 'react';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HamburgerMenu() {
	const alertMsgForCheck = () => { Alert.alert('your interaction seems to be working ok') }

	const sendEmail = () => {
		const email = 'recyclist.sprt@gmail.com';
		const subject = encodeURIComponent('פניית משתמש מהמגירה');

		const timestamp = new Date().toISOString();
		const systemInfo = {
			reportingEntity: "user",
			timeStamp: timestamp,
			os: Device.osName,
			osVersion: Device.osVersion,
			deviceModel: Device.modelName,
			// os: Platform.OS,
			// osVersion: Platform.Version,
			appVersion: Application.nativeApplicationVersion,
			mongoDBUserID: "///",		//TODO - import this detail here.. 
		};
		const sysInfoString = Object.entries(systemInfo)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\r\n'); // Replacing '\n' with '%0A'

		const userMessage = ('\r\n\__________________________________\r\nמכאן ומטה, כתוב את פנייתך :)');
		const fullMessage = `${sysInfoString}\n\n${userMessage}`;

		const body = encodeURIComponent(fullMessage);
		// const url = `mailto:${email}?subject=${subject}&body=${body}`;

		const url = `mailto:${email}?subject=${subject}&body=${body}`;



		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log(`Don't know how to open this URL: ${url}`);
			}
		})
	}


	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['rgba(161, 178, 166, 0.75)', 'rgba(255, 255, 255, 0.00)']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				locations={[0, 0.89]}
				style={styles.linearGradient}
			>
				<SafeAreaView style={styles.hamburgerMenuItems}>

					<View style={styles.ClickableLogo}>
						<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={{ width: 140 }} resizeMode='contain' />

					</View>

					<View style={styles.menuItem}>
						<Pressable onPress={() => navigation.navigate('PersonalProfile')}	//Link To PERSONAL PROFILE
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<Text style={styles.hbrgrItemText}>פרופיל</Text>
							<Image source={require('../../assets/icons/User.png')}
								style={{ width: 27 }} resizeMode='contain' />
						</Pressable>
					</View>


					<View style={styles.menuItem}>
						<Pressable onPress={() => navigation.navigate('DisplayBadges')}		//Link To PERSONAL
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<Text style={styles.hbrgrItemText}>תגים</Text>
							<Image source={require('../../assets/icons/Star.png')}
								style={{ width: 27 }} resizeMode='contain' />
						</Pressable>
					</View>



					<View style={styles.menuItem}>
						<Pressable onPress={() => navigation.navigate('AboutUs')}		//Link To AboutUs	
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<Text style={styles.hbrgrItemText}>אודותינו</Text>
							<Image source={require('../../assets/icons/Megaphone.png')}
								style={{ width: 27 }} resizeMode='contain' />
						</Pressable>
					</View>
					<View style={styles.menuItem}>
						<Pressable onPress={() => sendEmail()}		//Open mail server with 
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<Text style={styles.hbrgrItemText}>פניה</Text>
							<Image source={require('../../assets/icons/envelopIcon.png')}
								style={{ width: 27 }} resizeMode='contain' />
						</Pressable>
					</View>

				</SafeAreaView>

				{/* <Text>HamburgerMenu</Text> */}
			</LinearGradient>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		zIndex: 800,
		height: screenHeight,
	},

	linearGradient: {
		flex: 1,
		width: '100%',
		// alignItems: 'center',
	},
	hamburgerMenuItems: {
		// justifyContent: 'center',
		marginTop: screenHeight / 8,
		marginRight: 28,
		alignItems: 'flex-end'
	},

	ClickableLogo: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: screenHeight / 8,
	},
	menuItem: {
		flexDirection: 'row-reverse',
		justifyContent: 'center',
		alignItems: 'center',

		// borderWidth: 1,
		// borderStyle: 'dotted',
		// borderColor: '#555',
		marginVertical: 12,
	},
	hbrgrItemText: {
		fontFamily: 'openSansReg',
		textAlign: 'right',
		fontSize: 16,
		marginRight: 20,
	},
});