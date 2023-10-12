import { View, TouchableOpacity, StyleSheet, Image, Alert, TextInput, SafeAreaView, Dimensions, ScrollView, Animated, Easing } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MenuProvider } from 'react-native-popup-menu';

import HamburgerMenu from '../Components/HamburgerMenu';

import ListingsItem from '../Components/ListingItem';

/*
function HamburgerDrawer() {
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['rgba(161, 178, 166, 0.75)', 'rgba(255, 255, 255, 0.00)']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				locations={[0, 0.89]}
				style={styles.linearGradient}
			>
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

				<Text>HamburgerMenu</Text>
			</LinearGradient>
		</View>
	);
	
}
*/

export default function ListsMan() {
	const screenWidth = Dimensions.get('window').width;
	// const screenHeight = Dimensions.get('window').width;
	const navigation = useNavigation();

	const [searchValue, SetSearchValue] = useState('');
	const [addListName, SetAddListName] = useState('');
	const [toggleAdd_Search, SetToggleAdd_Search] = useState(true);
	const [drawerPositon, SetDrawerPosition] = useState(new Animated.Value(-300));	//THE DRAWER INITIAL POSITION
	const [switchViewHamburger, SetSwitchViewHamburger] = useState(false);
	const toggleDrawer = () => {  
		const toValue = drawerPositon._value === 0 ? -300:0;
		Animated.timing(drawerPositon, {
			toValue,
			duration:150, 															//VELOCITY???
			easing: Easing.inOut(Easing.ease),  // Add this line

			useNativeDriver: false,
		}).start();
	};

	//Go to the server and return with this searched filed
	const FetchSearchResutlts = (searchValue) => { Alert.alert('TODO:fetch resluts of ', searchValue) }

	const CreateNewListing = (addListName) => {
		Alert.alert(
			'רשימה חדשה',
			`האם ליצור את רשימה ${addListName}?`,
			[
				{
					text: 'בטל',
					style: 'cancel',
				},
				{
					text: 'אשר',
					onPress: () => {
						Alert.alert(`רשימה ${addListName} נוצרה`);
						//TODO: ADD NEW LISTING TO THE DB - - maybe I should do up to 128 listings?
					},
				},
			]
		)
		SetAddListName('');//Nullifies the entry field
	}
	// const OpenHamburgerMenu = () => {}

	const PinLatestList = (event) => { Alert.alert('TODO: pin list '), event }

	const DeleteListing = async (id, listName) => {
		// if (!id || !listName) {
		// 	Alert.alert('אהמ!', 'לא נבחרה רשימה למחיקה'); return;
		// }
		Alert.alert(
			'אשר מחיקה',
			`למחוק את '${listName}'?`,
			[
				{ text: 'בטל', style: 'cancel', },
				{
					text: 'אישור', onPress: () => {
						Alert.alert('אישור סופי', `מחיקת '${listName}' לא תהיה אפשרית לביטול בדיעבד. להמשיך?`,
							[
								{ text: 'חזור', style: 'cancel' },
								{ text: 'מחק', onPress: () => {  Alert.alert("פריט נמחק")/*calling a function to delete this listing*/ }, },
							]
						) 
					},
				},
			]
		);
	}
	return (
		<View style={{ flex: 1, }}>
			<LinearGradient
				colors={['rgba(161, 178, 166, 0.75)', 'rgba(255, 255, 255, 0.00)']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				locations={[0, 0.89]}
				style={styles.linearGradient}
			>
				<ScrollView>
					<SafeAreaView style={styles.container}>
						<View style={styles.title}>
							<View style={[styles.listSearch]}>
								<TouchableOpacity onPress={toggleDrawer}>
									<Image source={require('../../assets/icons/hambungerIcon.png')} resizeMode='contain' />
								</TouchableOpacity>
								{/* <TouchableOpacity onPress={()=>navigation.openDrawer()}> */}

								{/* <Image source={require('../../assets/icons/hambungerIcon.png')} resizeMode='contain' />
								</TouchableOpacity> */}

								<TouchableOpacity style={{ marginRight: 20 }} onPress={() => PinLatestList()}>
									<Image source={require('../../assets/icons/pinned.png')} resizeMode='contain' />
								</TouchableOpacity>
							</View>
							<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={{ width: 60 }} resizeMode='contain' />
						</View>
						<View>
							{/* SEARCH AND ADD BAR */}
							<View style={styles.searchAndAddBar}>
								{
									toggleAdd_Search ?
										(
											<View style={styles.listSearch}>
												<Image source={require('../../assets/icons/magnifingGlassSearch.png')} style={{ marginRight: 10}} />
												<TextInput
													style={[styles.listsSearchBar,]}
													value={searchValue}
													onChangeText={(searchValue) => { SetSearchValue(searchValue) }}
													placeholder='חפש רשימות'
													placeholderTextColor="#000"
												/>
											</View>
										)
										:
										( //Add a new listing 
											<View style={styles.listSearch}>
												<TextInput
													style={[styles.listsSearchBar, { paddingRight: 8 }]}
													value={addListName}
													onChangeText={(addListName) => { SetAddListName(addListName) }}
													placeholder='הוסף רשימה'
													placeholderTextColor="#000"
												/>
												<TouchableOpacity onPress={() => CreateNewListing(addListName)}>
													<Image source={require('../../assets/icons/addListDocument.png')} style={[ { width: 24, marginLeft: 8, marginRight: 10 }]} resizeMode='contain' />
												</TouchableOpacity>
											</View>
										)
								}
							</View>
							<MenuProvider customStyles={{ menuProviderWrapper: [{ height: 350 }] }}>
								<SafeAreaView style={[{ flex: 14, marginTop: 50 }]}>
									<ListingsItem
										id={"00001"}
										pinned={true}
										listName={"ברוכים הבא ל-recycliST"}
										listOrder={"1"}
									/>
									<ListingsItem
										id={"00002"}
										pinned={false}
										listName={"לחץ על + בסרגל התחתון לרשימה חדשה"}
										listOrder={"1"}
										listColor={"#FF8A00"}
									/>
									{
										switchViewHamburger &&
										<HamburgerMenu />
									}
								</SafeAreaView>
							</MenuProvider>
						</View>
					</SafeAreaView>
				</ScrollView>


				<Animated.View
					style={{
						position: 'absolute',
						left: drawerPositon,
						top: 0,
						bottom: 0,
						width: 300,
						backgroundColor: 'grey',
					}}
				>
					<HamburgerMenu/>
					{/* Your Drawer Content */}
				</Animated.View>
				{/* THE HAMBURGER MENU DRAWER SHOULD BE RIGHT HERE  */}


				<View style={[styles.profileFooterPressable, { width: screenWidth }]}>
					<TouchableOpacity onPress={(id, listName) => DeleteListing(id, listName)}>
						<Image source={require('../../assets/icons/garbageCanWhite.png')} resizeMode='contain' />
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate('ListsMan')}>
						<Image source={require('../../assets/icons/HomeWhite.png')} resizeMode='contain' />
					</TouchableOpacity>

					<TouchableOpacity onPress={() => SetToggleAdd_Search(prevState => !prevState)}>
						{
							toggleAdd_Search ?
								<Image source={require('../../assets/icons/PlusWhiteCircle.png')} resizeMode='contain' />
								:
								<Image source={require('../../assets/icons/whiteMagGlass.png')} resizeMode='contain' />
						}
					</TouchableOpacity>

				</View>
			</LinearGradient>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {},
	backgroundGradient: {},
	LogoImage: {},
	inlineImage: {},
	listsUtils: { },

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
	},
	listSearch: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	listsSearchBar: {
		flex: 1,
		textAlign: 'right',
		fontSize: 16,
		fontFamily: 'openSansReg',
		marginRight: 5,
	},
	searchAndAddBar: {
		backgroundColor: "#F3F3F3",
		borderColor: "#F3F3F3",
		borderWidth: 2,
		height: 40,
		justifyContent: 'center',
	},
	///////////////////////////////////////////////
	///////////////////FOOTER//////////////////////
	///////////////////////////////////////////////
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
})



{/**
note that "Gimel@ABC.com" is a userID that supposed to be passed to the thing
All the rest is returned from the DB


  const collection = client.db("_recycliST").collection("shoppinglist");

  collection.find({ "userID": "Gimel@ABC.com" }).sort({ "pinned": -1 }).toArray((err, docs) => {
    if (err) {
      console.error('Error fetching data:', err);
    } else {
      // Do something with the sorted documents
      console.log(docs);
    }
  }) */}