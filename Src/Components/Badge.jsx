import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';

export default function Badge({ minPoints, maxPoints, badgeInfo, achivementName, badgeIcon }) {
	
	return (
		<View style={styles.statiscComponent}>
			<View style={[styles.numPlusIcon, {}]}>
				<Text style={{ fontFamily: 'openSansBold', fontSize: 18 }}>{`${minPoints} - ${maxPoints}`}</Text>
				<Image source={badgeIcon} style={{ width: 30 }} resizeMode='contain' />
			</View>
			<Text style={[styles.statisticsTitle,{}]}>{achivementName}</Text>
			<Text  style={{ fontFamily: 'openSansReg', fontSize: 16, }}>{badgeInfo}</Text>
			{/* <Text>{badgeConditions}</Text> */}
		</View>
	)
}

// const { scrHeight, scrWidth } = Dimensions.get('window');
const scrWidth = Dimensions.get('window').width;
const scrHeight = Dimensions.get('window').height;
console.log({scrHeight, scrWidth});

const styles = StyleSheet.create({
	statiscComponent: {
		flexDirection:'column',
		justifyContent:'space-evenly',
		alignItems:'flex-end',
		width: scrWidth-(scrWidth/16),
		height: scrHeight/6.5,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#d9d9d9',
		backgroundColor: '#f9f9f9',
		shadowColor: '#d9d9d9',
		shadowOffset: {width: 0, height:3},
		shadowOpacity: 1,
		shadowRadius: 0,
		marginTop: 20,
		paddingHorizontal:20,
		paddingVertical:15,
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
		fontSize: 22,
	},
})


