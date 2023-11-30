import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../contexts/auth';

import StackSignIn from '../pages/SignIn/StackSignIn';
import StackSignUp from '../pages/SignUp/StackSignUp';
import StackHome from '../pages/Home/StackHome';
import StackFilmes from '../pages/Filme/StackFilmes';
import StackNoticias from '../pages/Notícias/StackNoticias';
import StackQuiz from '../pages/Quiz/StackQuiz';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const { user } = useAuth(); 

  return (
    <Drawer.Navigator initialRouteName={user ? 'Home' : 'Login'}>
      <Drawer.Screen name="Home" component={StackHome} />
      <Drawer.Screen name="Filmes" component={StackFilmes} />
      <Drawer.Screen name="Noticias" component={StackNoticias} />
      <Drawer.Screen name="Quiz" component={StackQuiz} />
      <Drawer.Screen name="Login" component={StackSignIn} />
      <Drawer.Screen name="Registro" component={StackSignUp} />
    </Drawer.Navigator>
  );
}
