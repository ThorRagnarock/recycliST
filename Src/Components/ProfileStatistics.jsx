import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

 const  ProfileStatistics = () => {
	return (
		<View style={styles.container}>
			
			<View style={styles.divOfTwo}>
				<View style={styles.statiscComponent}>
					<Text style={{ fontFamily: 'openSansBold' }}>00</Text>
					<Text style={styles.statisticsTitle}>מוקאפ זמני</Text>
					<Image source={require('../../assets/icons/ExperienceIconFlame.png')} style={{ width: 24 }} />
				</View>
				<View style={styles.statiscComponent}>
					<Text style={{ fontFamily: 'openSansBold' }}>00</Text>
					<Text style={styles.statisticsTitle}>מוקאפ זמני</Text>
					<Image source={require('../../assets/icons/ExperienceIconFlame.png')} style={{ width: 24 }} />
				</View>
			</View>
			<View style={styles.divOfTwo}>

			<View style={styles.statiscComponent}>
					<Text style={{ fontFamily: 'openSansBold' }}>00</Text>
					<Text style={styles.statisticsTitle}>מוקאפ זמני</Text>
					<Image source={require('../../assets/icons/ExperienceIconFlame.png')} style={{ width: 24 }} />
				</View>
				<View style={styles.statiscComponent}>
					<Text style={{ fontFamily: 'openSansBold' }}>00</Text>
					<Text style={styles.statisticsTitle}>מוקאפ זמני</Text>
					<Image source={require('../../assets/icons/ExperienceIconFlame.png')} style={{ width: 24 }} />
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
		flexDirection:'row',
		justifyContent:'space-evenly',
		alignItems:'flex-end',
		width: 155,
		height: 55,
		borderRadius: 15,
		borderWidth: 2,
		borderColor: '#d9d9d9',
		backgroundColor: '#f9f9f9',
		shadowColor: '#d9d9d9',
		shadowOffset: {width: 0, height:3},
		shadowOpacity: 1,
		shadowRadius: 0,
		marginTop: 10,

	},
	statisticsTitle:{
		color:"#b0b0b0",
	},
})

export default ProfileStatistics;