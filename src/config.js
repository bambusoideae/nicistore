const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
const config = JSON.parse(process.env.REACT_APP_CONFIG);


config.firebase = firebaseConfig;

export default config;
