import { View, Text, SafeAreaView } from 'react-native'
import { AutoCompleteDropDown } from 'react-native-autocomplete-dropdown;'
import React, { useState } from 'react'

const CityAutocomplete = ({ residence, SetResidence }) => {
	const [cityData, SetCityData] = useState([]);

	const fetchCityList = async (searchText) => {
		try {
			const response = await fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=1300&fields=_id, city_code,city_name_he');

			const cityNameData = await response.json();
			const cityNames = cityNameData.result.records.map((record) => record.city_name_he);
			SetCityData(cityNames);
		} catch (err) {
			() => Alert.alert(err);
		}
	}

	const onCityItemSelect = (item) => {
		SetResidence((prevResidence) => ({ ...prevResidence, city: item }));
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AutoCompleteDropDown
				dataSet={cityData}
				inItemSelect={onCityItemSelect}
				onSearch={fetchCityList}
				searchKey='name'
				hideClearButtons
				hideSearchButtons
			/>
		</SafeAreaView>
	);
};
