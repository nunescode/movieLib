import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase.config";

export default function SignUp() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");

  function signUp() {
    if (email === "" || password === "" || repass === "") {
      alert("Preencha todos os campos!");
      return;
    }
    if (password !== repass) {
      alert("As senhas não são iguais!");
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password, repass)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("O usuário " + email + " foi criado! Faça login!");
        })
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = "";

          console.error(errorCode, error.message);

          switch (errorCode) {
            case "auth/weak-password":
              errorMessage =
                "A senha é muito fraca. Tente uma senha mais forte.";
              break;
            case "auth/email-already-in-use":
              errorMessage =
                "O endereço de e-mail já está em uso por outra conta.";
              break;
            case "auth/invalid-email":
              errorMessage =
                "Por favor, verifique se você inseriu um endereço de e-mail válido.";
              break;
            default:
              errorMessage =
                "Erro desconhecido ao criar usuário. Tente novamente mais tarde.";
          }
          console.error(errorMessage);
          alert(errorMessage);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>MovieLib</Text>

      <Text style={styles.subTextButton}>E-mail:</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Digite o seu e-mail"
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
        placeholder="Digite a sua senha"
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.formInput}
        placeholder="Confirme a sua senha"
        autoCapitalize="none"
        value={repass}
        onChangeText={(text) => setRepass(text)}
        secureTextEntry
      />

      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.subTextButton}>
            Já possui uma conta? Faça Login!
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text></Text>
      </View>

      <TouchableOpacity style={styles.formButton} onPress={signUp}>
        <Text style={styles.text}>Cadastrar</Text>
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
});
