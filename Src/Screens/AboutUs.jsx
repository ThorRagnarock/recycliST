import { Text, View, StyleSheet, SafeAreaView, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React from 'react';

export default function AboutUs() {
	const ourEmail = "recyclist.sprt@gmail.com";
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.safeArea}>

			<Text style={[styles.shmex, {}]} onPress={() => navigation.goBack()}> לחץ למסך הקודם</Text>

			<View style={styles.container}>
			<ScrollView>

				<Text style={[styles.header, { marginBottom: 3 }]}  >אודותינו</Text>
				{/* </View> */}
				<View style={styles.section}>
					<Text style={styles.text}>
						אפליקציית רשימת קניות העוקבת בזמן אמת אחרי תוצרי הלוואי של המצרכים, מקדמת צריכה ברת-קיימא והרגלי מחזור בריאים לעולם.
					</Text>
					<Text style={styles.text}>
						recycliST הינה אפליקציית רשימת קניות העוקבת ונותנת משוב באופן חי בזמן מילוי רשימת הקניות אחרי תוצרי הלוואי והפסולת שמפיקים ו/או שעלולים להפיק המצרכים והמוצרים בה, ובכך – כבר בזמן תכנון הקניות – נוצרת מודעות לכמויות הפסולת שאנחנו יכולים לייצר, ומכך מחד לסגל הרגלי קניה ירוקים יותר, ומאידך לסגל הרגלי מחזור יעלים יותר.
					</Text>
					<Text style={styles.text}>
							כבר בשלב תכנון הקניה מתקיים מעקב על הפריטים ברשימת הקניות וניתן מידע מהיר על תוצרי הלוואי ומידע אודות מחזור, דבר המסייע להקנות הרגלים ברי-קיימא.מודעות סביבתית: תכנון טוב יותר של הקניה מתוך מחשבה אקולוגית, מתוך ידיעה אודות ההשפעה הסביבתית שיש לבחירות שלנו כצרכנים.

						</Text>
					</View>
					<View style={styles.hashtags}>
						<Text style={styles.text}>
							#רשימת_קניות #קיימות #פסולת #מחזור #מודעות_סביבתית #טיפול_בפסולת #אכיפת_מיון_אשפה #ענן #אלטרנטיבות #השפעה_סביבתית #שיתוף #חברתיות
						</Text>
					</View>

					<Text style={[styles.header, { marginBottom: 3 }]}  >פניות</Text>
					<View style={styles.section}>
						<Text style={styles.text}>ניתן לפנות אלינו לכל ענין דרך כפתור הפניה  בתפריט ההמבורגר. אנחנו עדין לומדים ומקבלים כל משוב שיש לכם להציע.</Text>
						<Text style={styles.text}>במידה ואתם החלפתם כתובת אי מייל, ניתן לפנות במשוב לצורך החלפתו. אל המשוב ניתן גם לגשת  באימייל </Text>

						<Text style={styles.linkText} onPress={()=>Linking.openURL(`mailto:${ourEmail}`)}>{ourEmail}</Text>
					</View>

				</ScrollView>

				<View style={styles.footer}>
					<Text style={styles.footerText}>
						האפליקציה פותחה, נהגתה, עוצבה על ידי עמוס וטורי 2023 במסגרת פרוייקט גמר להנדסת תוכנה בהנחיית שי אברהם בכלים של ריאקט נייטיב ובשרת מבוסס מונגו די. בי
					</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}



const styles = StyleSheet.create({

	safeArea: {
		flex: 1,

		backgroundColor: '#f4f4f4',  // or any other background color you want
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: '#f4f4f4',
		alignItems: 'flex-start', // align to right
		borderWidth: 1,
		borderColor: "#999",
		margin: 10,
		borderRadius: 25,

	},
	header: {
		fontFamily: "openSansBold",
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'right',
		alignSelf: 'flex-end',

	},

	section: {
		marginBottom: 20,
	},
	text: {
		fontSize: 14,
		lineHeight: 26,
		textAlign: 'right', // right align the text
		marginBottom: 3,
		fontFamily: "openSansReg",
	},
	linkText: {
		fontSize: 14,
		lineHeight: 26,
		textAlign: 'right', // right align the text
		marginBottom: 3,
		fontFamily: "openSansReg",
		color: 'blue', 
		textDecorationLine: 'underline'
	},
	hashtags: {
		marginBottom: 10,
	},
	tagText: {
		fontSize: 14,
		color: '#007aff',
	},
	footer: {
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		paddingTop: 20,
	},
	footerText: {
		fontSize: 12,
		color: '#999',
		textAlign: 'right',

	},
	shmex: {
		fontFamily: 'openSansReg',
		fontSize: 14,
		textAlign: 'right',
		padding: 15,
		backgroundColor: "#ddd",
	}


});