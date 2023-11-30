import { createStackNavigator } from "@react-navigation/stack";
import SignIn from ".";

const Stack = createStackNavigator();

export default function StackSignIn() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SignIn"
      >
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
  );
}
