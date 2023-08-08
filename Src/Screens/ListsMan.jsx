import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import HamburgerMenu from '../Components/HamburgerMenu';



export default function ListsMan() {
	const [searchValue, setSearchValue] = useState('');
	const [addListName, setAddListName] = useState('');
	const [toggleAdd_Search, setToggleAdd_Search] = useState(true);
	const [switchViewHamburger, setSwitchViewHamburger] = useState(false);


	const navigation = useNavigation();

	const FetchSearchResutlts = (searchValue) => { Alert.alert('fetching resluts of ', searchValue) }

	const alertMsgForCheck = () => { Alert.alert('your interaction seems to be working ok') }


	return (
		<View style={styles.backgroundGradient}>
			<LinearGradient
				colors={['rgba(161, 178, 166, 0.75)', 'rgba(255, 255, 255, 0.00)']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				locations={[0, 0.89]}
				style={styles.linearGradient}
			>
				<View style={styles.container}>


					<View style={styles.title}>

						<TouchableOpacity onLongPress={() => alertMsgForCheck()}>
							<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={styles.LogoImage} resizeMode='contain' />
						</TouchableOpacity>

						<Text>List Manager</Text>
					</View>
					<View style={styles.searchAndAddBar}>

						{
							toggleAdd_Search ?
								(
									<View style={styles.listsSearchBar}>

										<TextInput
											style={[styles.listsSearchBar, {}]}
											value={searchValue}
											onChangeText={() => { FetchSearchResutlts(searchValue) }}
											placeholder='חפש רשימות'
										/>
										<Image source={require('../../assets/icons/magnifingGlassSearch.png')} style={styles.inlineImage} />
									</View>
								)
								:
								(
									<View style={styles.addList}>

										<TextInput
											style={[styles.addListBar, {}]}
											value={addListName}
											onChangeText={() => { FetchSearchResutlts(addListName) }}
											placeholder='חפש רשימות'
										/>
										<Image source={require('../../assets/icons/addListDocument.png')} style={styles.inlineImage} />

									</View>
								)
						}
					</View>
					{
						switchViewHamburger &&
						<HamburgerMenu />
					}
				</View>
			</LinearGradient>
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundGradient: {
		flex: 1,

	},
	linearGradient: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	container: {},
	title: {
		lexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 330,

		top: '9%',
	},
	LogoImage: {
		width: 60,
	},

})