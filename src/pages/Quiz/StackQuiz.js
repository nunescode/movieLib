import { createStackNavigator } from "@react-navigation/stack";
import Quiz from "./Quiz";

const Stack = createStackNavigator();

export default function StackQuiz() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Quiz"
      >
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
  );
}
