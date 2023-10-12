import {
	View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Dimensions, Alert
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

export default function ListScreen({ headerId, userID }) {
	const [showJustTicked, SetShowJustTicked] = useState(false);

	//const { headerId }= route.params; //to fetch the list items - use the header aggregation to show items

	const alertMsgForCheck = () => { Alert.alert('TODO: Work this!!') }
	const alertMsgThat = () => { Alert.alert('TODO: Work THAT!!') }

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

					<View style={styles.container}>
						<View style={styles.title}>
							<TouchableOpacity onPress={showJustTicked ? alertMsgForCheck : alertMsgThat}>
								{/* SHOW/ HIDE  ARCHIVED ITEMS*/}
								<Image source={require('../../assets/icons/toggleArchive.png')} resizeMode='contain' />

							</TouchableOpacity>

							<TouchableOpacity onLongPress={() => navigation.goBack()}>
								<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={styles.LogoImage} resizeMode='contain' />
							</TouchableOpacity>
						</View>

						<View style={styles.shoppingListTitle}>
							<Text style={styles.listName}>רשימת קניות 1</Text>

							<TouchableOpacity style={styles.menuTrigger}>
								<Image source={require('../../assets/icons/threeDotsBig.png')} resizeMode='contain' />
							</TouchableOpacity>
						</View>
						<View style={{ height: 0.1, borderWidth: 1, borderColor: "#444", borderStyle: 'dashed', }} />
					</View>

				</SafeAreaView>

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
		width:screenWidth, 
	},
	listName: {
		fontFamily: 'openSansReg',
		fontSize: 18,

	}
});