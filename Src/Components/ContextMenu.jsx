import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { useState } from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

export default function ContextMenu(value) {
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
	return (
		<View>
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
					{/** (MAIL) OPTION not linked it yet */}
					<MenuOption value="shareMail" onSelect={() => ContextMenu('shareMail')}>
						<View style={styles.ContextMenuItem}>
							<Image source={require('../../assets/icons/mailShare.png')} style={{ marginLeft: 8 }} />
							<Text>שתף (במייל)</Text>
						</View>
					</MenuOption>
				</MenuOptions>
			</Menu>
		</View>
	)

}

const styles = StyleSheet.create({
	menuTrigger: {
		paddingVertical: 15,
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
});