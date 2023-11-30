import { createStackNavigator } from "@react-navigation/stack";
import Index from ".";
import FilmesPopulares from "./FilmesPopulares";
import FilmesDetalhes from "./FilmesDetalhes";
import FilmesAvaliados from "./FilmesAvaliados";
import FilmesFavoritos from "./FilmesFavoritos";
import FilmesLancamento from "./FilmesLancamento";

const Stack = createStackNavigator();

export default function StackFilmes() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Início"
      >
        <Stack.Screen name="Início" component={Index} />
        <Stack.Screen name="FilmesPopulares" component={FilmesPopulares} />
        <Stack.Screen name="FilmesDetalhes" component={FilmesDetalhes} />
        <Stack.Screen name="FilmesAvaliados" component={FilmesAvaliados} />
        <Stack.Screen name="FilmesFavoritos" component={FilmesFavoritos} />
        <Stack.Screen name="FilmesLancamento" component={FilmesLancamento} />
      </Stack.Navigator>
  );
}
