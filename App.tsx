import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao EntropIA!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
