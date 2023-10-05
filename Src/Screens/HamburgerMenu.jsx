import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Animated, Alert, TextInput, Platform, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState, } from 'react'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HamburgerMenu() {
	const alertMsgForCheck = () => { Alert.alert('your interaction seems to be working ok') }

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
				<DrawerContentScrollView>
					<View style={styles.hamburgerMenuItems}>
						<View style={styles.menuItem}>
							<Pressable onPress={() => alertMsgForCheck}>
								<Text style={styles.hbrgrItemText}>פרופיל</Text>
								<Image source={require('../../assets/icons/User.png')} />
							</Pressable>
						</View>
						<View style={styles.menuItem}>
							<Pressable onPress={() => alertMsgForCheck}>
								<Text style={styles.hbrgrItemText}>תגים</Text>
								<Image source={require('../../assets/icons/Star.png')} />
							</Pressable>
						</View>
						<View style={styles.menuItem}>
							<Pressable onPress={() => alertMsgForCheck}>
								<Text style={styles.hbrgrItemText}>אודותינו</Text>
								<Image source={require('../../assets/icons/Megaphone.png')} />
							</Pressable>
						</View>
						<View style={styles.menuItem}>
							<Pressable onPress={() => alertMsgForCheck}>
								<Text style={styles.hbrgrItemText}>פניה</Text>
								<Image source={require('../../assets/icons/envelopIcon.png')} />
							</Pressable>
						</View>

					</View>
					<DrawerItemList {...props} />
				</DrawerContentScrollView>


				<Text>HamburgerMenu</Text>
			</LinearGradient>
		</View>
	)
	const Drawer = createDrawerNavigator();
	const Stack = createStackNavigator();
}

const styles = StyleSheet.create({
	container: {
		zIndex: 800,
		width: screenWidth * 0.475,
		height: screenHeight,
	},

	linearGradient: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	hamburgerMenuItems: {
		justifyContent: ''
	},
});