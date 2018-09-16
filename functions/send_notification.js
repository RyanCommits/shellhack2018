const { Expo } = require('expo-server-sdk');
const admin = require('firebase-admin');

const expo = new Expo();

module.exports = (req, res) => {
    const messages = [];
    
    admin.database().ref(`pushTokens/${req.body.uid}`).once('value')
        .then((snapshot) => {
            const expoPushToken = snapshot;

            messages.push({
                to: expoPushToken,
                sound: 'default',
                body: req.body.text,
                data: { widthSome: 'data' },
            })

            const chunks = expo.chunkPushNotifications(messages);

            for (let chunk of chunks) {
                expo.sendPushNotificationsAsync(chunk)
                    .then((ticketChunk) => {
                        console.log('success', ticketChunk);
                    })
                    .catch((err) => {
                        console.log('notification failed', err);
                    });
            }

            res.send('success');  
        })
        .catch((error) => {
            res.send(error);
        })
}