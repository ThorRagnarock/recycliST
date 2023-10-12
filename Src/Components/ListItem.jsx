import { Text, TouchableOpacity, Image, Alert, View, StyleSheet } from 'react-native';
import React from 'react'

export default function ListItem({ userItemStr, tickToggle, groceryPoints, colorCodes, feedBackFlag }) {

	const renderRecyclingIcons = () => {
		return colorCodes.map((color, index) => {
			const iconName = require(`../../assets/recyclingIcons/${color}.png`);
			return (
				<Image
					key={index}
					source={iconName}
					resizeMode='contain'
					style={{ width: 30, height: 30 }}
				/>
			);
		});
	};
	return (
		//, userItemStr, tickToggle, groceryPoints , colorCodes, feedBackFlag 
		<View>
			<Text>ListItem</Text>
			<TouchableOpacity onPress={() => ToggleTicked(prevState => !prevState)}
				style={styles.listTicker}
			>
				{
					//TODO - change the DB accordingly
					!tickToggle ?
						<Image source={require('../../assets/icons/tickCircle.png')} resizeMode='contain' />
						:
						<Image source={require('../../assets/icons/tickedXcircle.png')} resizeMode='contain' />
				}
			</TouchableOpacity>
			<Text style={styles.userItemStr}>טקסט מצרך לדוגמא</Text>
			<View style={styles.recyclingComposite}>
				{renderRecyclingIcons()}
			</View>
		</View>
	)
}


const styles = StyleSheet.create({

})