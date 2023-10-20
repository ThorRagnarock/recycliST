import {
	View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Dimensions, Alert, TextInput
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu'; ///

import ListItem from '../Components/ListItem';
import ContextMenu from '../Components/ContextMenu';

export default function ListScreen({ headerId, userID }) {
	// console.log("Hello 1");

	const [groceryItems, SetGroceryItems] = useState([
		{
			"_id": {
				"$oid": "652099f1876135ccb962787"
			},
			"userItemStr": "מגן תחתון",
			"tickToggle": false,
			"groceryPoints": 1,
			"packaging": [
				"paperCard",
				"noneRecyclable",
				"generalRecyclable"
			],
			"colorCodes": [
				"blue",
				"orange",
				"green"
			],
			"feedbackFlag": false,
			"lastIndex": {},
			"userFeedback": ""
		},
		{
			"_id": {
				"$oid": "65209a1b876135ccb962960d"
			},
			"userItemStr": "צ׳אי חריף וויסוצקי",
			"tickToggle": true,
			"groceryPoints": 2,
			"packaging": [
				"generalRecyclable",
				"paperCard"
			],
			"colorCodes": [
				"blue",
				"orange"
			],
			"feedbackFlag": false,
			"lastIndex": {},
			"userFeedback": ""
		},
		{
			"_id": {
				"$oid": "652099f1876135ccb962960b"
			},
			"userItemStr": "מגן תחתון",
			"tickToggle": false,
			"groceryPoints": 1,
			"packaging": [
				"paperCard",
				"noneRecyclable",
				"generalRecyclable"
			],
			"colorCodes": [
				"blue",
				"orange",
				"green"
			],
			"feedbackFlag": false,
			"lastIndex": {},
			"userFeedback": ""
		}
	]);
	const [showJustTicked, SetShowJustTicked] = useState(false);
	// const [groceryInput, SetGroceryInput] = useState("");
	const [userItemStr, SetSserItemStr] = useState("");
	const navigation = useNavigation();



	//const { headerId }= route.params; //to fetch the list items - use the header aggregation to show items

	const alertMsgForCheck = () => { Alert.alert('TODO: Work this!!') }
	const alertMsgThat = () => { Alert.alert('TODO: Work THAT!!') }

	const toggleTick = (itemId) => {
		const updatedItem = groceryItems.map((item) => {
			if (item._id.$oid == itemId) {
				return { ...item, tickToggle: !item.tickToggle }
			}
			return item;
		})
		SetGroceryItems(updatedItem);
	}
	const EmptyCan = ()=>{
		Alert.alert("TODO:Empty Can");
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
				
				<SafeAreaView style={styles.safeView}>
					<ScrollView>
						<MenuProvider customStyles={{ menuProviderWrapper: [{ height: 350 }] }} skipInstanceCheck>



							<View style={styles.container}>

								<View style={styles.title}>
									<TouchableOpacity onPress={showJustTicked ? alertMsgForCheck : alertMsgThat}>
										{/* SHOW/ HIDE  ARCHIVED ITEMS*/}
										<Image source={require('../../assets/icons/toggleArchive.png')} resizeMode='contain' />

									</TouchableOpacity>

									<TouchableOpacity onPress={() => navigation.goBack()}>
										<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={styles.LogoImage} resizeMode='contain' />
									</TouchableOpacity>
								</View>

								<View style={styles.shoppingListTitle}>
									<Text style={styles.listName}>רשימת קניות 1</Text>
									<ContextMenu />
								</View>
								<View style={{ height: 0.1, borderWidth: 1, borderColor: "#444", borderStyle: 'dashed', }} />
							</View>
							{/* ADD A userItemStr ITEM */}
							<View style={styles.addGroceryItem}>
								<Image source={require('../../assets/icons/BlackPlus.png')} resizeMode='contain' style={{ margin: 10 }} />
								<TextInput
									style={[styles.inputField]}
									placeholderTextColor={"black"}
									placeholder={"הוסף פריט"}
									value={userItemStr.toString()}
									keyboardType='ascii-capable'
									onChangeText={(userItemStr) => { SetSserItemStr(userItemStr) }}
								/>
							</View>
							<View style={styles.groceryList}>
								{
									groceryItems.filter(item => !item.tickToggle).map((listing, index) => (
										<ListItem key={index} {...listing} toggleTick={toggleTick} />
									))
								}
							</View>
							<View style={styles.checkedGroceryList}>
								{
									groceryItems.filter(item => item.tickToggle).map((listing, index) => (
										<ListItem key={index} {...listing} toggleTick={toggleTick} />
									))
								}
							</View>
							{/*here the list is*/}

						</MenuProvider>
					</ScrollView>
				</SafeAreaView>


				<View style={[styles.profileFooterPressable, { width: screenWidth }]}>
					<TouchableOpacity onPress={() => EmptyCan()}>
						<Image source={require('../../assets/icons/garbageCanWhite.png')} resizeMode='contain' />
					</TouchableOpacity>

					
					<TouchableOpacity onPress={() => navigation.navigate('ListsMan')}>
						<Image source={require('../../assets/icons/HomeWhite.png')} resizeMode='contain' />
					</TouchableOpacity>
					
					<TouchableOpacity onPress={() => EmptyCan()}>
						<Image source={require('../../assets/icons/whiteEmptingCan.png')} resizeMode='contain' />
					</TouchableOpacity>

					

				</View>

			</LinearGradient >

		</View >

	)
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	backgroundGradient: {
		flex: 1,
	},

	linearGradient: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		fontFamily: 'openSansReg'
	},

	title: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: screenWidth,
		paddingHorizontal: 40,

	},
	LogoImage: {
		width: 60,
	},
	shoppingListTitle: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40,
		paddingVertical: 15,
		width: screenWidth,
	},
	listName: {
		fontFamily: 'openSansReg',
		fontSize: 18,

	},
	groceryList: {
		// flexDirection: 'column',
	},
	inputField: {
		fontFamily: 'openSansLightItalic',
		fontSize: 15,
		color: "#000",

	},
	addGroceryItem: {
		flexDirection: 'row-reverse',
		// justifyContent:"center",
		alignItems: 'center'
	},

	checkedGroceryList: {
		marginTop: 30,
		color: "#333",
		fontSize: 5
	},
	profileFooterPressable: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#6D8FE6',
		padding: 20,
		////////////////
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
});