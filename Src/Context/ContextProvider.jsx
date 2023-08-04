import React, { useState, createContext } from 'react'
// import UserContext from './UserContext'


export const UserContext2 = createContext();

export default function ContextProvider({ children }) {
	const [email, SetEmail] = useState('');
	const [password, SetPassword] = useState('');
	const [name, SetName] = useState('');
	const [recycPrefs, SetRecycPrefs] = useState(null);

	return (
		<UserContext2.Provider value={{ email, SetEmail, password, SetPassword, name, SetName, recycPrefs, SetRecycPrefs }}>
			{children}
		</UserContext2.Provider>

	);
}