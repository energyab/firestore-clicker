const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./dev/auth.json');
const http = require('http');
require('dotenv').config()
const PORT= process.env.PORT || 5000

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const counter = db.collection('count').doc('counter');

const observer = counter.onSnapshot(docSnapshot => {
	const countListener = docSnapshot._fieldsProto.count.integerValue
  console.log(`Counter changed: ${countListener}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});

const requestListener = async (req, res) => {
	if(req.url === '/'){
		res.writeHead(200)
		return res.end('Hello, World!')}

	if(req.url === '/new_click'){
		try {
			await db.runTransaction(async (t) => {
				t.update(counter, { count: FieldValue.increment(1) })
			})
			console.log('Transaction success!')
		} catch (e) {
			console.log('Transaction fail:', e)
		}
		res.writeHead(200)
		return res.end('new_click!')}

	if(req.url === '/clear'){
		try {
			await db.runTransaction(async (t) => {
				t.update(counter, { count: 0 })
			})
			console.log('Clearing... Transaction success!')
		} catch (e) {
			console.log('Transaction fail:', e)
		}
		res.writeHead(200)
		return res.end('cleaning...')}

	res.writeHead(404)
	return res.end('page not found')
}

async function start() {
	try {
		const server = http.createServer(requestListener);
		server.listen(PORT, () => console.log(`app has been started... on port ${PORT}...`));
	} catch (e) {
		console.log('server error...', e.message)
		process.exit(1)
	}
}

start()