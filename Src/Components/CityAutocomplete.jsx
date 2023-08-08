import { View, Text, SafeAreaView, Button, Pressable, Dimensions, Platform } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import React, { useEffect, useState, MemoExoticComponent, useCallback,useRef } from 'react'

const CityAutocomplete = ({ residence, SetResidence }) => {
	const searchRef=useRef(null);

	const [cityData, SetCityData] = useState([]);

	// useEffect(()=>{
	// 	fetchCityList();
	// },[])
	const fetchCityList = async (searchText) => {
		const response = await fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=1300&fields=_id,city_code,city_name_he');

			const cityNameData = await response.json();
			const cityNames = cityNameData.result.records.map((record) => record.city_name_he);

			SetCityData(cityNames);

			console.log(JSON.stringify(cityNameData));//()=>Alert.alert(JSON.stringify
			console.log(cityNames);
		
	}

	const onCityItemSelect = (item) => {
		SetResidence((prevResidence) => ({ ...prevResidence, city: item }));
	};
	return (
		<View>
			<AutocompleteDropdown
				dataSet={cityData}
				onItemSelect={onCityItemSelect}
				onSearch={fetchCityList}
				searchKey='name'
				// hideClearButtons
				// hideSearchButtons
			/>
		<Text>{JSON.stringify()}</Text>
		</View>
		

	);
};
export default CityAutocomplete;
