import firebase from 'firebase';

// Create the file metadata
const METADATA = {
    contentType: 'image/jpeg',
};

export const uploadImage = (file, uid, metadata) => {
    const timestamp = new Date().getTime();
    const name = `${timestamp}-media.jpg`;
    // Points to the root reference
    const storageRef = firebase.storage().ref();
    // );
    return new Promise((resolve, reject) => {
        const imageRef = storageRef.child(`images/${name}`);
        imageRef.put(file, METADATA)
            .then(() => {
                return imageRef.getDownloadURL();
            })
            .then(async (url) => {
                console.log(url, 'URL');

                const foodsRef = firebase.database().ref(`foods/${uid}`);

                await foodsRef.push({
                    approvedBy: false,
                    url,
                    createdAt: timestamp,
                    ...metadata,
                });

                return resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
};

/**
 * Example Implementations
 *
 * handleSnapshot
 * (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            default: console.log('Upload is successful');
            }
        }


    handleError
    (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                console.log('Unauthorized', error.message);
                break;
            case 'storage/canceled':
                console.log('Canceled', error.message);
                break;
            case 'storage/unknown':
                console.log('Canceled', error.message);
                break;
            default: console.log('Error', error.message);
            }
        }

    handleDone

 */
