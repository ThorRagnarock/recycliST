import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Badge from '../Components/Badge';
import React from 'react';


const badgesData = [
	{
		achivementName: "ממחזר עסוק",
		minPoints: 20,
		maxPoints: 49,
		badgeInfo: "יפה מאוד, אתה עובד בחריצות רבה במחזור",
		badgeIcon: require("../../assets/icons/CartUsingShoppingList.png"),
		badgeConditions: "if points garthered 20~49 within 4 days registered app",
	},
	{
		achivementName: "ממחזר מתחיל",
		minPoints: 10,
		maxPoints: 19,
		badgeInfo: "כל הכבוד, התחלת לממחזר!",
		badgeIcon: require("../../assets/icons/CartUsingShoppingList.png"),
		badgeConditions: "אם צברת 10-19 נקודות ב-2 ימים"
	},
	{
		achivementName: "ממחזר מתקדם",
		minPoints: 20,
		maxPoints: 49,
		badgeInfo: "מעולה, אתה ממחזר כמו גיבור!",
		badgeIcon: require("../../assets/icons/CartUsingShoppingList.png"),
		badgeConditions: "אם צברת 20-49 נקודות ב-4 ימים"
	},

];

export default function DisplayBadges() {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={[styles.text, {}]} onPress={() => navigation.goBack()}> לחזרה למסך הקודם</Text>
			</View>
			<ScrollView style={styles.scrollView}>				
			<View style={styles.allBadges}>
				{/* <Badge/> */}
				
				{
					badgesData.map((badge, index) => (
						<Badge key={index} {...badge} />
					))
				}
			</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	text:{
		fontFamily:'openSansReg',
		fontSize:14,
		textAlign:'right',
		padding:15,
		backgroundColor:"#ddd",

		
	},
	container: {
		flex: 1,
	},
	scrollView: {
		marginHorizontal: 10,
	}
});
