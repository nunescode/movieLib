import { createStackNavigator } from "@react-navigation/stack";
import Home from ".";
import StackFilmes from "../Filme/StackFilmes";

const Stack = createStackNavigator();

export default function StackHome() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Início"
      >
        <Stack.Screen name="Início" component={Home} />
        <Stack.Screen name="Filmes" component={StackFilmes} />
      </Stack.Navigator>
  );
}
