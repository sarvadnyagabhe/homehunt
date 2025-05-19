/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import RootNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/store';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}>
      <StatusBar barStyle={'dark-content'} />
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
