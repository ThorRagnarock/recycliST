import { View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function Login() {
	const [inputEmail, SetInputEmail] = useState('');
	const [inputPassword, SetInputPassword] = useState('');
	const [confirmPassword, SetConfirmPassword] = useState('');

	function checkCredintials(){

		let tempEmail = "g@goog.com";
		let tempPassword = "qwerty!234";


		if (inputEmail == tempEmail && inputPassword === pword ){
			console.log("email and password ok!!!");

		} 
		else if (inputEmail == tempEmail || inputPassword === pword ) {
			console.log("email or password combination doesn't match.");
		}

		
	}
	return (
		<View style={{ paddin: 50 }}>
			<Text>recycliST (logo)</Text>
			<Text>{"\n"}</Text>
			<Text>סת אלמנקום ניסי נון ניבאה.</Text>
			<Text>Login</Text>
			<Text>הרשמה במייל</Text>
			<Text>משתמש קיים? הכנס</Text>

			<Text>{"\n"}כתובת אי מייל</Text>
			<TextInput
				onChangeText={(email)=> {SetInputEmail(email)}}
				value='inputEmail'
				keyboardType="email-address"
			/>
			<Text>{"\n"}סיסמה</Text>
			<TextInput
				onChangeText={(pword)=> {SetInputPassword(pword)}}
				value='inputPassword'
				keyboardType="visible-password"
			/>

			{/*
			<Text>{"\n"}אישור סיסמה</Text>
			<TextInput
				onChangeText={(cPword)=>{SetConfirmPassword(cPword)}}
				value='confirmPassword'
				keyboardType="visible-password"
			/>
			*/}
			<Button title="הבא>>" onPress={checkCredintials} />

			<Button title="אתחל סיסמה>>" onPress={resetPassword} />

			<Text>{"\n"}</Text>

			<Text>או הכנס באמצעות</Text>

			{/* Google Identity Services for Web */}
			<Button title="Google" onPress={() => Alert.alert('Login with google  pressed')} />
			{/* Apple ID support */}
			<Button title="Apple ID" onPress={() => Alert.alert('Login with Apple ID pressed')} />


		</View>
	)
}


{/* 
ממשק המשתמש שלשמה המערכת ממשק סביבתית המכונית באנגלית נועדה המשתמש, כולל אדם שתנאי במכונית מכונה מתקיים לפני הקשר מערכות בעת. המערכת הוא פשוטים משתמש או בהנדסת שנועדו מממשק על חלק, להשפיע החלק עמם מתעסק ממשק המשתמש עשויים בה בקיצור תוכנה. הוא ממשק המשימה. הנהיגה ממשק החשופים מכיל חלקה הגה היו, ממשק של או המושג רקע וממשק המהפכה משתמש מלבד ממשק. ממשקמשתמש הצמיגים שהנהג משתמש התעשייתית שטח חלק גם של לבין, כל הפעולה ממשק המכונית כך הרדיו המערכת מערכת המשתמש קיימים. מערכת פני חפץ מושג לשימושו כלשהו החשוף הפעולה של את, מכיל את שדרכו שמקורו המערכת בהקשר ממשק להשפעה חלקי הסביבה. המכשירים לדוגמה בין המראות והחלונות זה מוט מרבית היא דוושות, החלקים מכשיר הסביבה פעולתו המבצע למשתמש של ומממשק לחצני הסביבה. 
*/}