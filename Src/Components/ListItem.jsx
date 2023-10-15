import { Text, TouchableOpacity, Image, Alert, View, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { sendEmail } from '../../utils/Feedback';


const iconList = {
	blue: require('../../assets/recyclingIcons/blue.png'),
	brown: require('../../assets/recyclingIcons/brown.png'),
	green: require('../../assets/recyclingIcons/green.png'),
	orange: require('../../assets/recyclingIcons/orange.png'),
	purple: require('../../assets/recyclingIcons/purple.png'),
	yellow: require('../../assets/recyclingIcons/yellow.png'),
};
export default function ListItem({ userItemStr, tickToggle: initChecked, groceryPoints,packaging,  colorCodes, feedBackFlag, _id, toggleTick }) {

	const sendFeedbackMail= () => {
		const email = 'recyclist.sprt@gmail.com';
		const subject = encodeURIComponent('grocery composite feedback');

	}

	const [tickToggle, SetToggleTicked] = useState(initChecked);

	const tickedStyle = tickToggle ? styles.tickedDisplay : styles.untickedDisplay;
	const renderRecyclingIcons = () => {

		return colorCodes.map((color, index) => {
			return (
				<Image
					key={index}
					source={iconList[color]}
					resizeMode='contain'
					style={[styles.recycleIcons, { margin: 3 }]}
				/>
			);
		});
	};
	return (
		//, userItemStr, tickToggle, groceryPoints , colorCodes, feedBackFlag 
		<View style={styles.groceryRow}>
			<TouchableOpacity
				onPress={() => toggleTick(_id.$oid)}
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
			<Text style={[styles.userItemStr, tickedStyle]}>{userItemStr}</Text>
			<View style={styles.recyclingComposite}>
				{renderRecyclingIcons()}
			</View>
			{/** DELETE ITEM */}
			<TouchableOpacity style={{}} onPress={{}}> 
				<Image source={require('../../assets/icons/closingEx.png')} resizeMode='contain' />
			</TouchableOpacity>

			{/** FEEDBACK ITEM */}
			<TouchableOpacity style={{ marginRight: 15 }} onPress={() => sendEmail(userItemStr, packaging)}>
				<Image source={require('../../assets/icons/CommentBubble.png')} resizeMode='contain' />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({

	userItemStr: {
		width: 160,
		textAlign: 'right',
		fontFamily: 'openSansReg',
		fontSize: 15,
	},
	groceryRow: {
		borderTopColor: "#CCC",
		borderTopWidth: 1,
		flexDirection: 'row-reverse',
		alignItems: 'center',

		// alignItems: 'center',
	},
	listTicker: {
		padding: 10
	},
	recyclingComposite: {
		flexDirection: 'row-reverse',
		width: 100,
	},
	recycleIcons: {
		width: 20,
		height: 20,
	},
	tickedDisplay:{
		color:"#CCC",
		fontFamily:"openSansLightItalic",

	},
})