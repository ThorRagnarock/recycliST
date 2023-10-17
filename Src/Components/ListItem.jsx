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

const colorsHex = {
	green: '#309600',
	blue: '#001AFF',
	orange: '#FF8A00',
	purple: '#BB007B',
	brown: '#650000',
	yellow: '#FFD600',
}
export default function ListItem({ userItemStr, tickToggle: initChecked, groceryPoints,packaging,  colorCodes, feedBackFlag: initFeedbackFlag, _id, toggleTick }) {

	const [feedbackFlag, SetFeedbackFlag]= useState(initFeedbackFlag);
	const [tickToggle, SetToggleTicked] = useState(initChecked);

	const tickedStyle = tickToggle ? styles.tickedDisplay : styles.untickedDisplay;

	const feedbackMan = () => {
		sendEmail(userItemStr, packaging).then((success)=>{ if (success){SetFeedbackFlag(true)}})
	};
	const renderVisualization = () => {
		const maxWidth = 50; // The width of the biggest rectangle
		return (
			<View style={{ alignItems: 'flex-start', height: 20, width: maxWidth }}>
				{colorCodes.map((color, index) => {
					const currentWidth = maxWidth - index * 15;
					return (
						<View
							key={index}
							style={{
								width: maxWidth - index * 15,
								height: 15,
								backgroundColor: colorsHex[color],
								borderRadius: 19,
								marginBottom: 20,
								position: 'absolute',  
								left: maxWidth - currentWidth,
							}}
						/>
					)
				})}
			</View>
		)
	}
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
				{
					//TODO - change the DB accordingly
					!tickToggle ?
						renderRecyclingIcons()
						:
						<Text style={[styles.tickedDisplay, {marginRight:30}]}>{groceryPoints}</Text>
				}
			</View>
			{
				tickToggle
					? (renderVisualization())
					: (
						<>
							{/** DELETE ITEM */}
							<TouchableOpacity style={{}} onPress={() => Alert.alert("TODO: DELETE ITEM")}>
								<Image source={require('../../assets/icons/closingEx.png')} resizeMode='contain' />
							</TouchableOpacity>

							{/** FEEDBACK ITEM ===> () => sendEmail(userItemStr, packaging) */}
							<TouchableOpacity style={{ marginRight: 15 }} onPress={feedbackMan}>
								<Image source={feedbackFlag
									? require('../../assets/icons/commentRecieved.png')
									: require('../../assets/icons/CommentBubble.png')
								} resizeMode='contain' />
							</TouchableOpacity>
						</>
					)
			}
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
		color:"#AAA",
		fontFamily:"openSansLightItalic",
	},
})