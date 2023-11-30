import { createStackNavigator } from "@react-navigation/stack";
import Noticias from "../Notícias/Noticias";

const Stack = createStackNavigator();

export default function StackNoticias() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Noticias"
      >
        <Stack.Screen name="Noticias" component={Noticias} />
      </Stack.Navigator>
  );
}
