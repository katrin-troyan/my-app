import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';

interface InputValue {
  email: string;
  password: string;
  errorEmail: null | string;
  errorPassword: null | string;
}

export default function LoginPage() {
  const [inputValue, setInputValue] = useState<InputValue>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });

  const hadleChangeInput = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValue(prevState => ({ ...prevState, [key]: value }));
  };

  const checkEmail = () => {
    const emailValidation = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!emailValidation.test(inputValue.email)) {
      hadleChangeInput('errorEmail', 'Invalid email format');
    } else {
      hadleChangeInput('errorEmail', null);
    }
  };

  const checkPassword = (text: string) => {
    if (text.length < 8) {
      hadleChangeInput(
        'errorPassword',
        'Password must be at least 8 characters',
      );
    } else {
      hadleChangeInput('errorPassword', null);
    }
  };

  return (
    <View style={[styles.mainWrapper]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Раді тебе вітати!</Text>
        <Text style={styles.welcomeText}>
          Кожен пухнастик заслуговує на дбайливих господарів.Ми допоможемо тобі
          знайти друга.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.authText}>Вхід</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registrationBtn}>
          <Text style={styles.authText}>Реєстрація</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Email'}
            style={styles.input}
            placeholderTextColor={'#838383'}
            onBlur={() => {
              checkEmail();
            }}
            value={inputValue.email}
            onChangeText={text => hadleChangeInput('email', text)}
          />
        </View>
        {inputValue.errorEmail && <Text>{inputValue.errorEmail}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Password'}
            style={styles.input}
            placeholderTextColor={'#838383'}
            value={inputValue.password}
            onChangeText={text => {
              hadleChangeInput('password', text);
              checkPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
        {inputValue.errorPassword && <Text>{inputValue.errorPassword}</Text>}
      </View>
      <TouchableOpacity style={styles.loginBtnContainer}>
        <Text style={styles.loginText}>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
}
