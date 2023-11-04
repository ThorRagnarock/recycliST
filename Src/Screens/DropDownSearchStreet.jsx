import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableWithoutFeedback,
	TextInput,
	FlatList,
	Pressable, 
	Keyboard,
} from 'react-native'
import React, { useCallback, useState, useContext, useEffect} from 'react'
import { UserContext2 } from '../Context/ContextProvider'


export default function DropDownSearchStreet({navigation}) {
	const { residence, SetResidence } = useContext(UserContext2);

	// const {SetResidence} = route.params;
	const [streetNumber, SetStreetNumber] = useState(0);
	const [input, SetInput] = useState("");
	const [data, SetData] = useState(null); // = ="suggestionsList"
	const [loading, SetLoading] = useState(false);
	const [selectedItem, SetSelectedItem] = useState(null);
	const [showList, SetShowList]=useState(false);


	const onChangeText = useCallback(async (text) => {
		SetInput(text);
		console.log("oct suggestion: ", text);
		if (typeof text !== 'string' || text.length < 2) {
			SetData(null); return;
		}
		SetLoading(true);
		try {
			let cityCode = residence.city_code;
			const response = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=bf185c7f-1a4e-4662-88c5-fa118a244bda&limit=150000&filters={"city_code":${cityCode}}&fields=_id,street_name`);
			const items = await response.json();
			// console.log(items);
			const suggestions = items.result.records
				.filter(item => item.street_name.includes(text))
				.map(item => ({
					id: item._id,
					title: item.street_name.trim(),
				}));
			console.log("dropDown Suggestions:", suggestions);
			SetData(suggestions);
			SetLoading(false);
			SetShowList(true);
		} catch (error) {
			console.error("Something went wrong:", error);
		}
	}, []);///////////////////////that's all for the streets

	const onSelectItem = useCallback(async (item) => {
		SetInput(item.title);
		SetResidence((prevResidence) => ({
			...prevResidence,
			street: item.title
		}));

		SetSelectedItem({ title: item.title, code: item.id });
		SetShowList(false);
	}, []);

	const updateStreetNumber = (text)=> {
		SetStreetNumber(text);
		SetResidence((prevResidence)=>({
			...prevResidence,
			streetNum: text,
		}));
	}
	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
			<SafeAreaView style={styles.safeAreaView}>
				<Text style={styles.searchBoxTitle}>הזן רחוב ומספר</Text>
				<TextInput
					placeholder='רחוב'
					onChangeText={onChangeText}
					value={input}
					style={styles.textInputSearchBox}
				/>
				{
					!showList && selectedItem &&
					<Text style={styles.itemCodeText}>street id: {selectedItem.code}</Text>
				}
				<TextInput
					placeholder='מספר'
					onChangeText={updateStreetNumber}
					value={String(streetNumber)}
					style={[styles.textInputSearchBox, {width: 70}]}
				/>


				<Pressable onPress={() => navigation.goBack()}>
					<View style={styles.nextBtn}>
						<Text>סיים וחזור</Text>
					</View>
				</Pressable>
				{
					showList &&
					<View style={styles.dropDownList}>
						<FlatList
							data={data}
							renderItem={
								({ item, index }) => (
									<Pressable onPress={() => {
										onSelectItem(item)
									}}>
										<View style={{
											borderBottomWidth: 1,
											borderBottomColor: '#ddd',
										}}>
											<Text style={styles.flatListItem}>{item.title}</Text>
										</View>
									</Pressable> // console.log(text);
								)
							}
							keyExtractor={(item, index) => item._id + index}
							//(item, index) => item._id + index
							showsVerticalScrollIndicator={false}
						/>
					</View>
				}
				
			</SafeAreaView >
		</TouchableWithoutFeedback>
	)
}
styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
	},
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
		justifyContent: 'center',
		marginTop: 30,
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
})