import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {

  const navigation = useNavigation();
  
  const handleHomePress = () => {
    navigation.push("Filmes");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>

          <View style={styles.centerContent}>
            <Text style={[styles.otherText, styles.centerText]}>
              Explore, Descubra e Desfrute: {"\n"} {"\n"}
            </Text>
            <Text style={[styles.otherText, styles.centerText]}>
              Seu Universo Cinematográfico em um só lugar!
            </Text>
          </View>

          <View style={styles.centerContent}>
           
            <TouchableOpacity
              onPress={handleHomePress}
              style={styles.registerButton}
            >
              <Text style={[styles.text, styles.registerText]}>
                Filmes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>MovieLib</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D253F",
  },
  header: {
    backgroundColor: "#C0C0C0",
    paddingVertical: 20,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 45,
    color: "#0D253F",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
  },
  centerContent: {
    alignItems: "center",
    marginTop: 70,
  },
  footer: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 10,
  },
  otherText: {
    color: "#ffffff",
    fontSize: 30,
  },
  centerText: {
    textAlign: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
  registerButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingHorizontal: 118,
    paddingVertical: 10,
    marginBottom: 50,
  },
  registerText: {
    color: "#ffffff",
  },
  loginButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  loginText: {
    color: "#ffffff",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconButton: {
    marginHorizontal: 45,
  },
});
