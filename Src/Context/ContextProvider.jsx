import React, { useState, createContext, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
export const UserContext2 = createContext({});

export default function ContextProvider({ children }) {
	// const navigation = useNavigation();

	const [newUser, SetNewUser] = useState({
		name: '',
		email: '',
		password: '',
		recycPrefs:0,
		residence:{ city: '', cityCode: 0, street: '', streetNum: '' },
		status: '',
		birthDate: new Date(null),
		profileImage: ''
	})

	const [name, SetName] = useState('');
	const [email, SetEmail] = useState('');
	const [password, SetPassword] = useState('');
	const [recycPrefs, SetRecycPrefs] = useState(0);
	const [residence, SetResidence] = useState({ city: '', cityCode: 0, street: '', streetNum: '' });
	const [status, SetStatus] = useState('');
	const [birthDate, SetBirthDate] = useState(new Date(null));
	const [profileImage, SetProfileImage] = useState('');
	//"https://cdn.iconscout.com/icon/free/png-512/free-profile-3484746-2917913.png"

	const [points, SetPoints] = useState(0);
	const [shoppingLists, SetShoppingLists] = useState([]);
	// const [achievements, SetAchievements] = useState([]);
	// const [budges, SetBudges] = useState([]);
	const [subscribeDate, SetSubscriberDate] = useState(new Date());


	const [remember, SetRemember] = useState(true);
	const [currentUser, SetCurrentUser] = useState(null);


	// handleActiveMemeber - syntex..
	const handleActiveMember = async (userData, isNewUser, recallMe) => {
		if (recallMe) {
			await AsyncStorage.setItem('@UserData', JSON.stringify(userData));
		} else {
			await AsyncStorage.removeItem('@UserData');
		}
		if(isNewUser) { SetNewUser(userData); } 
		else { SetCurrentUser(userData); }
		// SetCurrentUser(userData);
		SetRemember(recallMe);
	};

	// if (currentUser.birthDate != null) SetBirthDate(birthDate);
	const logOuter = async (logoutDone) => {
		console.log("1. contextProvider's logOuter: calling logout");

		if (remember) {
			await AsyncStorage.removeItem('@UserData');
		}
	

		SetCurrentUser(null);
		console.log("logout done, returining");
		// navigation.navigate('SignInScreen')	
		if(logoutDone) {logoutDone()}
	}

	useEffect(() => {
		const isLoggedIn = async () => {
			const userDataString = await AsyncStorage.getItem('@UserData');
			if (userDataString) {
				const userData = JSON.parse(userDataString);
				SetCurrentUser(userData);
			}
		};
		isLoggedIn();
	},[])
	return (
		<UserContext2.Provider value={
			{
				name, SetName,
				email, SetEmail,
				password, SetPassword,
				recycPrefs, SetRecycPrefs,

				residence, SetResidence,
				status, SetStatus,
				birthDate, SetBirthDate,
				profileImage, SetProfileImage,

				subscribeDate, SetSubscriberDate,

				points, SetPoints,
				shoppingLists, SetShoppingLists,
				//achievements, SetAchievements,	//not sure about that here
				//budges, SetBudges,				//not sure about that here


				currentUser, SetCurrentUser,
				logOuter,
				handleActiveMember,
			}}>
			{children}
		</UserContext2.Provider>
	);
}


// SetProfileImage(null);
		// SetEmail('');
		// SetPassword('');
		// SetName('');
		// SetRecycPrefs(null);
		// SetResidence({ city: '', city_code: 0, street: '', streetNum: '' });
		// SetStatus('');
		// SetBirthDate(new Date(null));
		// SetSubscriberDate(new Date(null));
		// console.log("3. fields null, null the currentUser");

		// SetPoints(null);
		// SetShoppingLists(null);
		// SetAchievements(null);
		// SetBudges(null);