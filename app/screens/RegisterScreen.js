import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp } from 'firebase/app';
import {firebaseConfig} from "../../firebase-config";

function RegisterScreen({navigation}) {
  // const registerApi = useApi(usersApi.register);
  // const loginApi = useApi(authApi.login);
  // const auth = useAuth();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [error, setError] = useState();

  const handleCreateAccount = (userInfo) => {
    const email = userInfo.email;
    const password = userInfo.password;
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('Account created :', user)
      const user = auth.currentUser;
      console.log('user : ', user)
      addName(userInfo.name);
      signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('User logged in :', email + password)
      navigation.navigate("AppNavigator");
    })
    .catch(error => {
      console.log(error)
    })
    })
    .catch(error => {
      console.log(error)
    })
  }

  const addName = (name) => {
    
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('name added to profile', name)
      console.log(auth.currentUser)
    }).catch((error) => {
      console.log(error);
    });
  }

  // const handleSubmit = async (userInfo) => {
  //   const result = await registerApi.request(userInfo);

  //   if (!result.ok) {
  //     if (result.data) setError(result.data.error);
  //     else {
  //       setError("An unexpected error occurred.");
  //       console.log(result);
  //     }
  //     return;
  //   }

  //   const { data: authToken } = await loginApi.request(
  //     userInfo.email,
  //     userInfo.password
  //   );
  //   auth.logIn(authToken);
  // };

  return (
    <>
      {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
      <Screen style={styles.container}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleCreateAccount}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Votre petit nom"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Mot de passe"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Je m'inscris !   🍯" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
