import { 
	Text, 
	View, 
	SafeAreaView, 
	StyleSheet, 
	TouchableWithoutFeedback, 
	Keyboard, 
	TextInput, 
	FlatList, 
	Pressable 
} from 'react-native';
import React, { useState, useCallback, useContext } from 'react';
import { UserContext2 } from '../Context/ContextProvider'


export default function DropDownScreen({ navigation}) {
	const { residence, SetResidence } = useContext(UserContext2);

	// const {SetResidence} = route.params;
	// const { log, Console } = require('console');

	const [input, SetInput] = useState("");
	const [suggestionsList, SetSuggestionsList] = useState(null);	// = = "data"
	const [loading, SetLoading] = useState(false);
	const [selectedItem, SetSelectedItem] = useState(null);
	const [showList, SetShowList]=useState(false)

	const onChangeText = useCallback(async (text) => {
		SetInput(text);
		console.log("oct Suggestions: ", text);// q ==> text
		if (typeof text !== 'string' || text.length < 2) { //clears data if inputBox empty
			SetSuggestionsList(null); return;
		}
		SetLoading(true);

		const response = await fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=2000&fields=_id,city_code,city_name_he');

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
		SetShowList(true);

	}, []); ////////////////////////////////	//that's all folks
	const onSelectItem = useCallback(async (item) => {
		SetInput(item.title); 	//.marks selection in inputbox
		SetResidence((prevResidence) => ({
			...prevResidence,
			city: item.title,
			city_code: item.id,

		}));
		SetSelectedItem({ title: item.title, code: item.id });	//.makes that selection actuall
		SetShowList(false);		//.close the dropdownlist
	}, [])
	const OnClearPress = useCallback(() => {
		SetSuggestionsList(null);
	}, [])

	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
			<SafeAreaView style={{ flex: 1 }}>
				<Text style={styles.searchBoxTitle}>הזן כאן פרטים רלוונטים</Text>
				<TextInput
					placeholder='עיר'
					onChangeText={onChangeText}
					value={input}
					style={styles.textInputSearchBox}

				/>
				{
					!showList && selectedItem &&
					<Text style={styles.itemCodeText}>City Code: {selectedItem.code}</Text>
				}
				<Pressable onPress={() => navigation.goBack()}>
					<View style={styles.nextBtn}>
					<Text>סיים וחזור</Text>

					</View>
				</Pressable>
				{
					showList &&
					<View style={styles.dropDownList}>
						<FlatList
							data={suggestionsList}
							renderItem={({ item, index }) => (
								<Pressable onPress={() => {
									onSelectItem(item)
									// alert('nav passing:' + JSON.stringify(item)); 
								}}>
									<View style={{
										borderBottomWidth: 1,
										borderBottomColor: '#ddd',
									}}>
										<Text style={styles.flatListItem}>{item.title}</Text>
									</View>
								</Pressable> // console.log(text);
							)} // VERY VERY IMPORTANT 
							keyExtractor={(item, index) => item.city_code + index}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				}
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
		marginHorizontal: 12,
		marginLeft: 3,
		marginRight: 3,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 2,
		textAlign: 'right',
	},
	nextBtn: {
		borderColor: '#074EE8',
		borderWidth: 2.2,
		borderRadius: 5.22,
		backgroundColor: '#6E90E6',
		width: 120,
		height: 40,
		alignItems: 'center',
		justifyContent:'center',
		marginTop:30,
	},
	flatListItem: {
		color: '#383b42',
		padding: 10,
		fontSize: 12,
		textAlign: 'right',
		marginLeft: 3,
		marginRight: 3,
	},
	dropDownList: {
		borderWidth: 1,
		borderColor: '#eee',
		marginLeft: 3,
		marginRight: 3,
	},
});