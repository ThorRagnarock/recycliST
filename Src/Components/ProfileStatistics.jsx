import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

 const  ProfileStatistics = () => {
	return (
		<View style={styles.container}>

			<View style={styles.divOfTwo}>
				<View style={styles.statiscComponent}>
					<View style={[styles.numPlusIcon, {}]}>

						<Text style={{ fontFamily: 'openSansBold' }}>00</Text>
						<Image source={require('../../assets/icons/CartUsingShoppingList.png')} style={{ width: 24 }} />
					</View>
					<Text style={styles.statisticsTitle}>מימוש קניות</Text>
				</View>
				<View style={styles.statiscComponent}>
					<View style={[styles.numPlusIcon, {}]}>

						<Text style={{ fontFamily: 'openSansBold' }}>00</Text>
						<Image source={require('../../assets/icons/DaysUsingApp.png')} style={{ width: 24 }} />
					</View>
					<Text style={styles.statisticsTitle}>ימי שימוש באפליקציה</Text>
				</View>
			</View>
			<View style={styles.divOfTwo}>
				<View style={styles.statiscComponent}>
					<View style={[styles.numPlusIcon, { }]}>
						<Text style={{ fontFamily: 'openSansBold' }}>00</Text>
						<Image source={require('../../assets/icons/ExperienceIconFlame.png')} style={{ width: 24 }} />
					</View>
					<Text style={styles.statisticsTitle}>סה״כ נק. נסיון</Text>
				</View>
				<View style={styles.statiscComponent}>
					<View style={[styles.numPlusIcon, {}]}>

						<Text style={{ fontFamily: 'openSansBold',paddingRight:5 }}>00</Text>
						<Image source={require('../../assets/icons/BinEmptying.png')} style={{ width: 24 }} />
					</View>
					<Text style={styles.statisticsTitle}>ריקוני סל מחזור</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		// borderWidth:1,
		// borderColor:'#000',
		flexDirection:'row',
		justifyContent:'space-between',
		marginTop:5,


	},
	divOfTwo:{
		flexDirection:'column',
	},
	statiscComponent: {
		flexDirection:'column',
		justifyContent:'space-evenly',
		alignItems:'flex-end',
		width: 155,
		height: 65,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#d9d9d9',
		backgroundColor: '#f9f9f9',
		shadowColor: '#d9d9d9',
		shadowOffset: {width: 0, height:3},
		shadowOpacity: 1,
		shadowRadius: 0,
		marginTop: 10,
		paddingRight:15,
		paddingBottom:5,
	},
	numPlusIcon:{
		marginTop:10,
		flex: 1, 
		flexDirection: 'row',
		alignItems:'center',
	},
	statisticsTitle:{
		color:"#b0b0b0",
		fontFamily: 'openSansBold',
		fontSize: 12,
	},
})

export default ProfileStatistics;