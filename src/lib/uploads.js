import firebase from 'firebase';

// const transformBase64 = (string) => {

// }

export const uploadImage = (file, handleSnapshot, handleError, handleDone) => {
    // console.log(file.name);
    // Points to the root reference
    const storageRef = firebase.storage().ref();

    // Upload file and metadata to the object
    // Hardcoded to 'images' bucket for now
    const uploadTask = storageRef.child('images/test.jpg').putString(file, 'base64');

    // Listen for state changes, errors, and completion of the upload.
    return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        handleSnapshot, handleError, handleDone
    );
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
    () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // return here
                console.log('File available at', downloadURL);
            })
            .catch((e) => console.log(e.message));
 */
