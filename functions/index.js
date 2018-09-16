const admin = require('firebase-admin');
const functions = require('firebase-functions');
const sendNotification = require('./send_notification');
const serviceAccount = require('./service_account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://shellhacks2018.firebaseio.com",
});

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

exports.sendNotification = functions.https.onRequest(sendNotification);