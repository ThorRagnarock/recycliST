import { Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState, useCallback } from 'react'

export default function DropDownScreen() {
	// const { log, Console } = require('console');

	const [input, SetInput] = useState("");
	const [suggestionsList, SetSuggestionsList] = useState(null);	// = = "data"
	const [loading, SetLoading] = useState(false);

	const onChangeText = useCallback(async text => {
		SetInput(text);
		console.log("oct Suggestions: ", text);// q ==> text
		if (typeof text !== 'string' || text.length < 2) { //clears data if inputBox empty
			SetSuggestionsList(null); return;
		}
		SetLoading(true);

		const response = await fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=1300&fields=_id,city_code,city_name_he');

		const items = await response.json();

		const suggestions = items.result.records
			.filter(item => item.city_name_he.includes(text))
			.map(item => ({
				id: item.city_code,					//uses the city code as an id
				title: item.city_name_he,			//2b retrieved later
			}));
		console.log("dropDown Suggestions:", suggestions);
		SetSuggestionsList(suggestions);
		SetLoading(false);

	}, []); ////////////////////////////////	//that's all folks
	const OnClearPress = useCallback(() => {
		SetSuggestionsList(null);
	}, [])


	return (
		<TouchableWithoutFeedback ofPress={() => { Keyboard.dismiss }}>
			<SafeAreaView style={{ flex: 1 }}>

				<Text style={styles.searchBoxTitle}>הזן כאן פרטים רלוונטים</Text>
				<TextInput
					placeholder='עיר/רחוב'
					onChangeText={onChangeText}
					value={input}
					style={styles.textInputSearchBox}
				/>
				<FlatList
					data={suggestionsList}
					renderItem={({ item, index }) => { // VERY VERY IMPORTANT
						<Pressable onPress={() => { alert('nav passing:' + JSON.stringify(item)) }}>
							<Text style={styles.flatListItem}>{item.title}</Text>
						</Pressable> // console.log(text);
					}}
					keyExtractor={item => item.city_code}
					showsVerticalScrollIndicator={false}

				/>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	searchBoxTitle: {
		marginLeft: 12,
		marginVertical: 5,
		fontSize: 12,
	},
	textInputSearchBox: {
		height: 40,
		marginHorizontalL: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 5,
	},
	flatListItem: {
		color: '#383b42', 
		padding: 10, 
		fontSize: 12, 
		textAlign: 'right',
	},
});