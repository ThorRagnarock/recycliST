import { View, Text,TouchableOpacity,StyleSheet, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


export default function ListScreen() {

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


					<TouchableOpacity onPress={Editing ? ConcludeEdit : StartEdit} onLongPress={handleLongPress}>
						
						<Image source={require('../../assets/icons/SettingsCogwheel.png')} resizeMode='contain' />


						{
							textVisible &&
							<Animated.Text style={{ fontFamily: 'openSansReg', fontSize: 11, color: '#7394E7', opacity: animatedFadeout }}>עריכה</Animated.Text>
						}


					</TouchableOpacity>
					<TouchableOpacity onLongPress={() => navigation.navigate('SignInScreen')}>
						<Image source={require('../../assets/icons/recycliSTLogo113.png')} style={styles.LogoImage} resizeMode='contain' />
					</TouchableOpacity>
				</View>
		</View>
	</LinearGradient >
</View >
  )
}