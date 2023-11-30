import { createStackNavigator } from "@react-navigation/stack";
import SignUp from ".";

const Stack = createStackNavigator();

export default function StackSignUp() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SignUp"
      >
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
  );
}
