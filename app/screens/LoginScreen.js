import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {initializeApp } from 'firebase/app';
import {firebaseConfig} from "../../firebase-config";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({navigation}) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('Account created :', email + password)
      const user = userCredential.user;
      console.log('user : ', user)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleLogIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('User logged in :', email + password)
      const user = auth.currentUser;
      console.log('user : ', user)
      navigation.navigate("AppNavigator");
    })
    .catch(error => {
      console.log(error)
    })
  }
  // const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    // const result = await authApi.login(email, password);
    // if (!result.ok) return setLoginFailed(true);
    // setLoginFailed(false);
    // auth.logIn(result.data);
  };

  

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo_nectahr.png")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogIn}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
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
        <SubmitButton title="Je me connecte !  🐝" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
