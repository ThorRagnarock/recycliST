import { Text, TouchableOpacity, Image, Alert, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ContextMenu from './ContextMenu';

import React, { useState } from 'react';

const ListingsItem = ({ headerId, listName, pinned: isPinned}) => {
	const navigation = useNavigation();
	const [ listColor, SetListColor ] = useState("#D9D9D9");
	const [ pinned, SetPinned ] = useState(isPinned);

	return (
		<TouchableOpacity onPress={(event) => {
			event.stopPropagation();
			navigation.navigate('ListScreen', { headerId }); //Something like collection name
		}}
			style={[styles.listsItem, { borderColor: listColor }]}
		>
			{//TODO: add the pinned to the top of the list...
				pinned &&  <Image source={require('../../assets/icons/pinned.png')} style={{ marginRight: 10 }} />
			}
			<Text style={styles.textStyle}>{listName || "רשימה חדשה"}</Text>

			<ContextMenu />
			{/** add params that are for the context menu */}
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