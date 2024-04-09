// Import the functions you need from the SDKs you need
// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

// import {
//   SecretsManagerClient,
//   GetSecretValueCommand,
// } from "@aws-sdk/client-secrets-manager";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const secret_name = "fireBaseCredentials";

// const client = new SecretsManagerClient({
//   region: "us-east-1",
// });

// let response;

// try {
//   response = await client.send(
//     new GetSecretValueCommand({
//       SecretId: secret_name,
//       VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//     })
//   );
// } catch (error) {
//   // For a list of exceptions thrown, see
//   // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//   throw error;
// }

// const secret = response.SecretString;

// Your code goes here

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwatsinAsgf7RjCKWHR3rpYYG9B_poXmI",
  authDomain: "termassignment-b50f2.firebaseapp.com",
  projectId: "termassignment-b50f2",
  storageBucket: "termassignment-b50f2.appspot.com",
  messagingSenderId: "185425857722",
  appId: "1:185425857722:web:ea4dfdf840321675540683",
  measurementId: "G-FKJC0NJ09W",
};

// const firebaseConfig = {
//   apiKey: secret.apiKey,
//   authDomain: secret.authDomain,
//   projectId: secret.projectId,
//   storageBucket: secret.storageBucket,
//   messagingSenderId: secret.messagingSenderId,
//   appId: secret.appId,
//   measurementId: secret.measurementId,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
