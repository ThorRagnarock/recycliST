import { Linking } from 'react-native'
import * as Application from 'expo-application';
import * as Device from 'expo-device';

export const sendEmail = (groceryArray) => {
	try {
		
		const email = 'recyclist.sprt@gmail.com';
		const subject = encodeURIComponent('פניית משתמש מהמגירה');

		const timestamp = new Date().toISOString();
		const systemInfo = {
			reportingEntity: "user",
			timeStamp: timestamp,
			os: Device.osName,
			osVersion: Device.osVersion,
			deviceModel: Device.modelName,
			appVersion: Application.nativeApplicationVersion,
			mongoDBUserID: "///",		//TODO - import this detail here.. 
		};
		const sysInfoString = Object.entries(systemInfo)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\r\n'); // Replacing '\n' with '%0A'

		let userMessage = '';
		if (!groceryArray || groceryArray.length === 0) {

			console.log("case of regular feedback CHECKED");

			userMessage = '\r\n\__________________________________\r\nמכאן ומטה, כתוב את פנייתך :)';
		} else {
			console.log("case of groceries feedback CHECKED");

			// const groceryListStr = groceryArray.join('\r\n');
			console.log(groceryArray);
			userMessage = `\r\n\__________________________________\r\n${groceryArray}\r\n מכאן ומטה, כתוב אילו מוצרי לוואי וסוג פסולת מוצר זה מייצר`;
		}
		const fullMessage = `${sysInfoString}\n\n${userMessage}`;
		const body = encodeURIComponent(fullMessage);
		// const url = `mailto:${email}?subject=${subject}&body=${body}`;
		const url = `mailto:${email}?subject=${subject}&body=${body}`;
		//console.log("About to check if URL can be opened.")
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
				return true;
			} else {
				console.log(`Don't know how to open this URL: ${url}`);
				return false;
			}
		})
	} catch (error) {
		console.log("feedback email system error: ", error);
	}
}

// return (
// 	<View>
// 		<Text>Feedback</Text>
// 	</View>
// )
