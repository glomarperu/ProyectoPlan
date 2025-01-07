import React from 'react';
import { Text, View } from 'react-native';
import { HomeScreen } from './src/screens/home/HomeScreen';

function App(): React.JSX.Element {  

 return (   
      <View>
        <Text>
          <HomeScreen/>
        </Text>
      </View>
  );
}

export default App;
