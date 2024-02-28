import {useRoute} from '@react-navigation/native';
import React from 'react';
import WebView from 'react-native-webview';
import moment from 'moment';
import API_CONFIG from '../../../config/apiConfig';
import Loader from '../../../utils/ActivityIndicator';

const NotificationDetails = () => {
  const route = useRoute();
  const {item} = route.params;

  return (
    item ? <WebView
      source={{
        html: `<style>body { font-size: 35px; padding : 50px; }</style> 
        <div style='display: flex; justify-content : space-between; align-items: center; margin-bottom: 50px'>
            <div style='display: flex; gap: 30px;'>
                <img src="${item.user.profile_image ? API_CONFIG.imageUrl + item.user.profile_image : null}" style='height : 120; width : 120; borderRadius : 50%;' />
                <h2 >${item.user.first_name ? item.user.first_name : 'User'} ${item.user.last_name ? item.user.last_name : 'Name'}</h2>
            </div>
        </div>
        <h4 style='color: red;'>${moment(item.created_date).format('DD MMM, YYYY hh:mm A')}</h4>
        <h2 style='color: #00073d;'>${item.heading}</h2> ${item.body}`,
      }}
    /> : <Loader/>
  );
};

export default NotificationDetails;

