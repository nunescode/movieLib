import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../services/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Login efetuado com sucesso! Bem-vindo!");
        console.log(user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = "";

        // Exibe o código e a mensagem de erro no console para depuração
        console.error(errorCode, error.message);

        switch (errorCode) {
          case "auth/invalid-email":
            errorMessage =
              "Por favor, verifique se você inseriu um endereço de e-mail válido.";
            break;
          case "auth/invalid-credential":
            errorMessage =
              "E-mail ou senha incorretos, verifique e tente novamente.";
            break;
          case "auth/user-disabled":
            errorMessage = "A conta do usuário está desativada.";
            break;
          case "auth/user-not-found":
            errorMessage =
              "Não foi possível encontrar o usuário. Verifique se você inseriu as informações corretas.";
            break;
          case "auth/wrong-password":
            errorMessage =
              "A senha inserida está incorreta. Por favor, tente novamente.";
            break;
          default:
            errorMessage = "Erro desconhecido. Tente novamente mais tarde.";
        }

        console.error(errorMessage);

        alert(errorMessage);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>MovieLib</Text>

      <Text style={styles.subTextButton}>E-mail:</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Digite o seu e-mail..."
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.subTextButton}>Senha:</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Digite a sua senha..."
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.textPass}>
          Esqueceu sua senha? Redefina!{"\n"}
          {"\n"}
        </Text>
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text style={styles.subTextButton}>
            Não possui uma conta? Cadastre-se!
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text></Text>
      </View>

      <TouchableOpacity style={styles.formButton} onPress={signIn}>
        <Text style={styles.text}>Acessar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D214F",
    alignItems: "center",
    justifyContent: "center",
  },
  formTitle: {
    color: "gray",
    fontSize: 40,
    margin: 10,
  },
  formInput: {
    backgroundColor: "#fff",
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 20,
    fontSize: 16,
    width: "90%",
    padding: 10,
    margin: 10,
  },
  formButton: {
    color: "gray",
    backgroundColor: "#008F39",
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "85%",
  },
  subButton: {
    padding: 10,
  },
  subTextButton: {
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  textPass: {
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
