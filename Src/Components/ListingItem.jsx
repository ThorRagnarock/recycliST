import { Text, TouchableOpacity, Image, Alert, StyleShee, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import React, { useState } from 'react';

const ListingsItem = ({ headerId, listName}) => {
	const navigation = useNavigation();
	const [ listColor, SetListColor ] = useState("#D9D9D9");
	const [ pinned, SetPinned ] = useState(false);

	const ContextMenu = (value) => {
		switch (value) {
			case 'togglePin':
				//goto server and run that option
				Alert.alert("TODO: toggle pin");
				break;
			case 'dropListing':
				//goto server and run that option
				Alert.alert("TODO: drop listing");
				break;
			case 'duplicatelisting':
				//goto server and run that option
				Alert.alert("TODO: duplicatelisting");
				break;
			case 'renameListing':
				//goto server and run that option
				Alert.alert("TODO: rename that listing");
				break;
			case 'shareMail':
				//goto server and run that option
				Alert.alert("TODO: share list");
				break;
		}
	}

	return (
		<TouchableOpacity onPress={(event) => {
			event.stopPropagation();
			navigation.navigate('ListScreen', { headerId }); //Something like collection name
		}}
			style={[styles.listsItem, { borderColor: listColor }]}
		>
			{	//if pinned so //TODO: add the pinned to the top of the list...
				pinned &&
				<Image source={require('../../assets/icons/pinned.png')} style={{ marginRight: 10 }} />
			}
			<Text style={styles.textStyle}>{listName || "רשימה חדשה"}</Text>
			<Menu>
				<MenuTrigger>
					<Image source={require('../../assets/icons/threeDotsIcon.png')} resizeMode='contain' style={styles.menuTrigger} />
				</MenuTrigger>

				<MenuOptions customStyles={{
					optionsContainer: {
						width: 300,
						minHeight: 600,
					}
				}}>
					{/* <View style={styles.contextMenuFrame}> */}
					<MenuOption>
						<Text style={{ fontWeight: 'bold', padding: 10, textAlign: 'right', backgroundColor: "#ddd", }}>סגור</Text>
					</MenuOption>

					<MenuOption value="togglePin" onSelect={() => ContextMenu('togglePin')}>
						<View style={styles.ContextMenuItem}>
							<Image source={require('../../assets/icons/pinned.png')} style={{ marginLeft: 8, paddingTop: 10 }} />
							<Text>הסר/הוסף נעוץ</Text>
						</View>
					</MenuOption>

					<MenuOption value="dropListing" onSelect={() => ContextMenu('dropListing')}>
						<View style={styles.ContextMenuItem}>
							<Image source={require('../../assets/icons/dropListing.png')} style={{ marginLeft: 8 }} />
							<Text>מחק</Text>
						</View>
					</MenuOption>


					<MenuOption value="duplicatelisting" onSelect={() => ContextMenu('duplicatelisting')}>
						<View style={styles.ContextMenuItem}>
							<Image source={require('../../assets/icons/duplicateListing.png')} style={{ marginLeft: 8 }} />
							<Text>שכפל רשימה</Text>
						</View>
					</MenuOption>

					<MenuOption value="renameListing" onSelect={() => ContextMenu('renameListing')}>
						<View style={styles.ContextMenuItem}>
							<Image source={require('../../assets/icons/renameListing.png')} style={{ marginLeft: 8 }} />
							<Text>שנה את שם הרשימה</Text>
						</View>
					</MenuOption>

					<MenuOption value="shareMail" onSelect={() => ContextMenu('shareMail')}>
						<View style={styles.ContextMenuItem}>
							<Image source={require('../../assets/icons/mailShare.png')} style={{ marginLeft: 8 }} />
							<Text>שתף (במייל)</Text>
						</View>
					</MenuOption>
					{/*  */}
					{/* </View> */}
				</MenuOptions>
			</Menu>
			{ }
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({

	textStyle: {
		flex: 1,
		textAlign: 'right',
		fontSize: 16,
		fontFamily: 'openSansReg',
		marginRight: 10,
	},
	menuTrigger: {

		paddingVertical:15,
		// marginHorizontal:10,
		marginLeft: 10
	},

	contextMenuFrame: {
	},
	ContextMenuItem: {
		flexDirection: 'row-reverse',
		padding: 10.9,
		borderColor: "#fff",
		borderBottomColor: "#999",
		borderWidth: 1,
	},
	listsItem: {
		marginTop: 16,
		borderRadius: 5,

		backgroundColor: "#FFFEFE",
		borderWidth: 2,
		height: 40,

		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default ListingsItem;