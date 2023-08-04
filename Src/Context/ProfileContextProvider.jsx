import React, { useState, createContext } from 'react';

export const UserProfileContext = createContext();

export default function ProfileContextProvider({ profileChildren }) {

	const [email, SetEmail] = useState('');
	const [subscribeDate, SetSubscribeDate] = useState(new Date());// registry date
	const [password, SetPassword] = useState('');
	const [name, SetName] = useState('');
	const [profileImage, SetProfileImage] = useState(null);//profile image
	const [recycPrefs, SetRecycPrefs] = useState(null);
	const [birthdate, SetBirthdate] = useState(null);
	const [residence, SetResidence] = useState({ city:'', street:'', streetNum:'' });
	const [status, SetStatus] = useState('');

	////
	const [arrLists, SetArrLists]=useState([]);
	const [points, SetPoints] =useState(0);
	const [achievements, SetAchievements] = useState([]);
	const [badges, SetBadges] = useState([]);
	
	return (
		<ProfileContextProvider.Provider value={{ email, SetEmail, password, SetPassword, name, SetName, profileImage, SetProfileImage, recycPrefs, SetRecycPrefs, subscribeDate, SetSubscribeDate, birthdate, SetBirthdate, status, SetStatus, arrLists, SetArrLists, points,SetPoints, achievements, SetAchievements, badges, SetBadges }}>
			{profileChildren}
		</ProfileContextProvider.Provider>
	)
}