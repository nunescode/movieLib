import { StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutes from './src/routes/DrawerRoutes';
import { AuthProvider } from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#000'} barStyle="light-content" />
      <AuthProvider>
        <DrawerRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
