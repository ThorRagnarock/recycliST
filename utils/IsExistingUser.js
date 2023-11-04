
export async function IsExistingUser(email) {
	console.log("Checking email in DB... wait ");
	let res = await fetch('https://recyclistserver.onrender.com/api/users/checkMail', {
		method: 'POST',
		headers: {
			Accept: "application/json",
			"Content-type": "application/json",
		},
		body: JSON.stringify({ email })
	})
	console.log("email check done");
	const data = await res.json();
	return data.hasOwnProperty('exists') ? data.exists : false;
}