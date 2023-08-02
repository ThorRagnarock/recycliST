

import { Dimensions, Text, View, StyleSheet, Image, Button, Pressable } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { sqrt } from 'math';

const onBoardingData = [
	{
		id: 0,
		titleLine0: 'רשימת הקניות שלך - \n חושבת ירוק כבר עבורך',
		img: require('../../assets/icons/smart-listiings_1.png'),
		dscrpt: 'אין עוד צורך להתעכב על מה הולך לאיפה.\n מידע אודות תוצרי הלוואי - \nזמין כבר בשלב תכנון הקניות',
		btnText: 'נמשיך...',
	},
	{
		id: 1,
		titleLine0: 'קניה מודעת - מתחילה כאן',
		img: require('../../assets/icons/smart-shopping_2.png'),
		dscrpt: 'שבור את הרוטינה היומית - תכנן קניותך\n חכם יותר עם רסייקליסט, שדרג את האחריות\n הסביבתית ותהנה מבית נקי ומסודר יותר',
		btnText: 'למהפכה',
	},
	{
		id: 2,
		titleLine0: 'פחות זבל - פחות טרחה',
		img: require('../../assets/icons/stop-plastic-bags_3.png'),
		dscrpt: ' הרגלי מיחזור חכמים - פחות ירידות לפח,\n בית יותר רענן, כדור ארץ ירוק יותר, בזכותך.',
		btnText: 'קח אותי לשם',
	},
];
export default function OnBoarding() {
	const navigation = useNavigation();

	const [screenNum, SetScreenNum] = useState(0);
	const nextScreen = () => {
		if (screenNum < onBoardingData.length - 1) {
			SetScreenNum(screenNum + 1)
		}
		else navigation.navigate('SignInScreen');

	}
	const escapeOnBoarding = () => {
		navigation.navigate('SignInScreen');
	}

	const toShow = onBoardingData.find(item => item.id === screenNum);
	return (
		<View style={styles.container}>
			<Image
				style={styles.splashLogo} resizeMode='contain' source={require('../../assets/icons/recycliSTLogo113.png')} />

			<View style={styles.content}>
				{toShow &&
					<View style={styles.infoDiv}>
						<Text style={styles.onBoardingTitle}>{toShow.titleLine0}</Text>
						<Image source={toShow.img} style={styles.onBoardingImage} resizeMode='contain' />
						<Text style={styles.onBoardingInfo}>{toShow.dscrpt}</Text>
					</View>
				}
			</View>
			<View style={styles.btnsView}>
				<Pressable style={styles.nextBoard} onPress={nextScreen}>
					<Text style={styles.btnText}>{toShow ? toShow.btnText : ''}</Text>
				</Pressable>
				{
					screenNum != onBoardingData.length - 1 ?
						<Pressable onPress={escapeOnBoarding} style={{ color: '#000' }}>
							<Text style={{ fontFamily: 'openSansReg' }}>דלג</Text>
						</Pressable>
						: null
				}
			</View>
		</View>
	)
};


const { height, width } = Dimensions.get('window');
const factor = Math.sqrt(height * width) / 0.9;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFFEFE',
	},
	content: { //that exclude logo and botton
		
		height:'60%',
	},
	infoDiv: {
		flex:1,
		alignItems: 'center',
	},
	onBoardingTitle: {

		textAlign: 'center',
		fontFamily: 'openSansBold',
		fontSize: factor*0.05,
		marginTop: height*0.02,
	},
	splashLogo: {
		marginTop: '15%',
		width: 110,
	},
	onBoardingInfo: {
		// zIndex:1,
		textAlign: 'center',
		fontFamily: 'openSansReg',
		fontSize:factor*0.031,
		
		marginTop: factor*0.01,
		// justifyContent:'space-evenly',
	},
	onBoardingImage: {
		// zIndex:2,
		// width: width*1.5,
		transform: [{scale: height*0.0014}]

		
	},

	btnsView: { //that's not text!!
		flex: 1,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		// width: '100%',
		// height:'100%',
		justifyContent: 'center',

		
	},


	nextBoard: {//that's not text!! that's the blue botton itself
		borderColor: '#074EE8',
		borderWidth: 2.2,
		borderRadius: 5.22,
		backgroundColor: '#6E90E6',
		width: 180,
		height: 50,
		alignItems: 'center',
		marginLeft: 30,
	},
	btnText: {
		// flex:1,
		fontSize: 16,
		textAlign: 'center',
		marginVertical: '6%',
		color: '#fff',
		alignSelf: 'center',
		fontFamily: 'openSansBold',
	}

})