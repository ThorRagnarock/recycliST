import { Text, View, StyleSheet, Image, Button, Alert } from 'react-native';
import React from 'react'

export default function OnBoarding() {
	return (
		<View style={{ paddin: 50 }}>
			<Text>recycliST (logo)</Text>

			<Text>OnBoarding</Text>
			<Text>קונסקטורר אדיפיסינג אלית.{"\n"} סת אלמנקום ניסי נון ניבאה.</Text>
			<Image style={{ padding: 20 }} source={require('https://placehold.co/600x400/EEE/31343C')} />
			<Text>מערכת פני חפץ מושג לשימושו כלשהו החשוף הפעולה {"\n"}של את, מכיל את שדרכו שמקורו המערכת בהקשר ממשק {"\n"}להשפעה חלקי הסביבה. המכשירים לדוגמה בין המראות והחלונות זה מוט מרבית היא דוושות, החלקים {"\n"}מכשיר הסביבה פעולתו המבצע למשתמש של ומממשק לחצני . </Text>

			<Button title="בוא נתחיל" onPress={() => Alert.alert('כפתור נלחץ')} />
		</View>
	)
}