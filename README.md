App React Native com Firebase Auth + Firestore
-----------------------------------------------------------------------------------------------------------------------------
Este projeto é um app React Native que realiza a autentificação de usuários por meio do Firebase Authentification e armazena os dados que forem adicionados ao sistema na base de dados do Firebase Firestore
-----------------------------------------------------------------------------------------------------------------------------

Tecnologias Utilizadas no Projeto:
- React Native + Expo
- Firebase Authentication
- Firebase Firestore

-----------------------------------------------------------------------------------------------------------------------------

Configuração e Integração com Firebase

Primeiro Passo: Criação do Projeto no Firebase

| Acesse: https://console.firebase.google.com
| Crie um novo projeto nele
| Na parte do Painel do Firebase, realize a ativação dos serviços:
| - Authentification (para realizar o método de autentificação de login e senha para o acesso ao sistema)
| - Firestore Database - (para que possa armazenar os dados a qual forem inclusos pelo app mobile, além de ser o local a fim de realizar alterações na parte de regras de acesso a esses dados e a criação de índices no mesmo)

Segundo Passo: Criar o Arquivo de Configuração Firebase no App

No projeto, foi realizado a criação da seguinte estrutura:

src/
|---- firebase/
|-------- config.js

O Config.js está disponivel nas configurações, que estão representadas por um símbolo de engrenagem ao lado do Botão "Visão geral do projeto" (cabe lembrar que é necessário realizar a instalação da firebase, que pode ser feita pelo comando npm install firebase)

Como exemplo, vou incluir aqui uma versão proxima ao que adicionei no projeto:

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "A_API_KEY_DE_SEU_PROJETO",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.firebasestorage.app",
  messagingSenderId: "00000000000000000",
  appId: "1:00000000000000:web:ea1c6d27fa0398c07626e8",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };


Terceiro Passo: Realizar alguns ajustes de Compatibilidade
Acabei, no momento que estava realizando a criação do projeto, tendo alguns problemas de compatibilidade, que realizando uma pesquisa, notei que acabou acontecendo devido a um problema de limitação no React Native + Expo, precisando realizar um leve ajuste incluindo as funções btoa e atob, que são utilizadas internamente pela Firebase, adicionando ao App.js a linha:

import { decode, encode } from 'base-64';

if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

-----------------------------------------------------------------------------------------------------------------------------

Trechos principais de Integração Firebase no Código

Autentificação (Login) - LoginScreen.js

const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        setUser(user);
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    Cadastro (Registration) - RegistrationScreen.js

    const onRegisterPress = () => {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            setUser(data);
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

Persistência de Sessão (Autologin) - App.js

useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return unsubscribeAuth;
  }, []);

  ---------------------------------------------------------------------------------------------------------------------------

  Execução do Projeto:

  1 - Clonar o Repositório:

    
    cd ReactNativeFirebase

  2 - Instalar Dependências:

  npm install

  3 - Iniciar o App com Expo:

  expo start

  4 - Executar no Celular por meio do Expo GO (Android/IOS)

  Lembrando que, para funcionar corretamente, é necessário alterar os dados do src/firebase/config.js com as chaves que estão disponiveis nas chaves reais, nas configurações do Firebase

  Caso aconteça erro de "base-64 not found", realize a execução por meio do:

  npm install base-64

  E, se ocorrrer erro de KeyboardAwareScrollView, realize a execução por:

  npm install react-native-keyboard-aware-scroll-view
