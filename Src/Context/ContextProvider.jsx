import React, { useState, createContext } from 'react'
// import UserContext from './UserContext'


export const UserContext2 = createContext();

export default function ContextProvider({ children }) {
	const [email, SetEmail] = useState('');
	const [password, SetPassword] = useState('');
	const [name, SetName] = useState('');
	const [recycPrefs, SetRecycPrefs] = useState(null);

	const [residence, SetResidence] = useState({ city: '', cityCode: 0, street: '', streetNum: '' });

	const [city, SetCity] = useState("");
	const [cityCode, SetCityCode] = useState(0);
	const [street, SetStreet] = useState("");
	const [streetNum, SetStreetNum] = useState('');


	const [status, SetStatus] = useState("");
	const [birthDate, SetBirthDate] = useState(new Date(null));
	const [subscribeDate, SetSubscriberDate] = useState(new Date(null));

	return (
		<UserContext2.Provider value={{ email, SetEmail, password, SetPassword, name, SetName, recycPrefs, SetRecycPrefs, residence, SetResidence, city, SetCity, cityCode, SetCityCode, street, SetStreet, streetNum, SetStreetNum, status, SetStatus, birthDate, SetBirthDate, subscribeDate, SetSubscriberDate }}>
			{children}
		</UserContext2.Provider>

	);
}