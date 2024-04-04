/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

async function onDisplayNotification(data) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();
console.log('data',data);
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: data.notification.title,
    body: data.notification.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('message backgound mode========', remoteMessage);
  onDisplayNotification(remoteMessage);
});
messaging().getInitialNotification(async remoteMessage => {
  console.log('message kill mode ========', remoteMessage);
  onDisplayNotification(remoteMessage);
});
messaging().onMessage(async remoteMessage => {
  console.log('message forground mode ========', remoteMessage);
  onDisplayNotification(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
