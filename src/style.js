import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D214F',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formTitle: {
        color: 'gray',
        fontSize: 40,
        margin: 10
    },
    formInput: {
        backgroundColor:'#fff',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 20,
        fontSize: 16,
        width: '90%',
        padding: 10,
        margin: 10,
    },
    formButton: {
        color: 'gray',
        backgroundColor: '#008F39',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
    },
    subButton: {
        padding: 10,
    },
    subTextButton: {
        color: '#fff',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    text: {
        color: '#fff',
        fontSize: 18,
    }
  });