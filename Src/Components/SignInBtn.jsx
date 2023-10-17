import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function SignInBtn() {
	return (
		<View>
			<Pressable style={styles.signInBtn}>
				<Text>הרשמה בחינם</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	signInBtn: {
		backgroundColor: '#fff',
		color: '#000',
	}
})