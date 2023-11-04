import React, { useState, createContext, useEffect, useContext } from 'react';
// import { log } from 'react-native-reanimated';
// import { useNavigation } from '@react-navigation/native';
export const UserContext2 = createContext({});



export default function ContextProvider({ children }) {
	// const navigation = useNavigation();
	const [name, SetName] = useState('');
	const [email, SetEmail] = useState('');
	const [password, SetPassword] = useState('');

	const [recycPrefs, SetRecycPrefs] = useState(0);
	const [residence, SetResidence] = useState({ city: '', cityCode: 0, street: '', streetNum: '' });

	const [status, SetStatus] = useState('');
	const [birthDate, SetBirthDate] = useState(new Date(null));
	const [profileImage, SetProfileImage] = useState('');
	//"https://cdn.iconscout.com/icon/free/png-512/free-profile-3484746-2917913.png"

	//remember to add expoPushToken property 

	const [points, SetPoints] = useState(0);
	const [shoppingLists, SetShoppingLists] = useState([]);
	const [achievements, SetAchievements] = useState([]);
	const [budges, SetBudges] = useState([]);

	const [subscribeDate, SetSubscriberDate] = useState(new Date(null));
	const [currentUser, SetCurrentUser] = useState(null);

	const loginer = async (email, password) => {
		console.log("1. contextProvider's loginer: server calling...");

		let res = await fetch('https://recyclistserver.onrender.com/api/users/login', {
			method: 'POST',
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ email, password })
		});

		console.log("2. res fetched the server");
		const data = await res.json();
		if (data && !data.error) {
			console.log("3. Setting Current user");
			SetCurrentUser(data);
			console.log("current user set");
			return true;
			//login logic here
		} else {
			console.log("details given caused login error...");
			return false;
		}
	}
	const logOuter = async () => {
		console.log("1. contextProvider's logOuter: calling logout");

		let res = await fetch('https://recyclistserver.onrender.com/api/users/logout', {
			method: 'POST',
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ email, password })
		});
		console.log("2. res fetched, clearing storage");

		localStorage.removeItem('jwtToken');
		console.log("3. Storage cleared. nullifing all fields");
		//logout logic here
		SetProfileImage(null);
		SetEmail('');
		SetPassword('');
		SetName('');
		SetRecycPrefs(null);
		SetResidence({ city: '', city_code: 0, street: '', streetNum: '' });
		SetStatus('');
		SetBirthDate(new Date(null));
		SetSubscriberDate(new Date(null));
		console.log("3. fields null, null the currentUser");

		SetPoints(null);
		SetShoppingLists(null);
		SetAchievements(null);
		SetBudges(null);

		SetCurrentUser(null);
		console.log("logout done, returining");
		// navigation.navigate('Login');
	}
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
				loginer,
				logOuter
			}}>
			{children}
		</UserContext2.Provider>
	);
}