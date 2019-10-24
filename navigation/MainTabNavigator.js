import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CounterScreen from '../screens/CounterScreen';
import LogsScreen from '../screens/LogsScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const CounterStack = createStackNavigator(
  {
    Counter: CounterScreen,
  },
  config
);

CounterStack.navigationOptions = {
  tabBarLabel: 'Counter',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

CounterStack.path = '';

const LogsStack = createStackNavigator(
  {
    Logs: LogsScreen,
  },
  config
);

LogsStack.navigationOptions = {
  tabBarLabel: 'Logs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LogsStack.path = '';

// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen,
//   },
//   config
// );

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   ),
// };

// SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  CounterStack,
  LogsStack,
  // SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
