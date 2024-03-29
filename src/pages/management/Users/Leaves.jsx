import React, {useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Loader from '../../../utils/ActivityIndicator';
import {primaryColor, styles} from '../../../../style';
import NotFound from '../../../utils/NotFound';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import getApi from '../../../redux/slices/utils/getApi';

const Leaves = ({route}) => {
  const {data} = route.params;
  const rbSheet = useRef();

  const [uniqueData, setUniqueData] = useState(null);

  const handleOpenRBSheet = async id => {
    const res = await getApi.getIndividualLeaveRequest(id);
    setUniqueData(res.data);
    if (res.data) {
      rbSheet.current.open();
    }
  };

  return data ? (
    <>
      <FlatList
        data={data && data.leave}
        ListEmptyComponent={<NotFound />}
        renderItem={({item}) => (
          <View
            style={[
              styles.textInput,
              {
                margin: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <View>
              <View>
                <Text style={styles.lable}>{item.title}</Text>
                <Text>
                  {' '}
                  From {moment(item.from_date).format('DD MMM yyyy')} To{' '}
                  {moment(item.to_date).format('DD MMM YYYY')}{' '}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleOpenRBSheet(item.id)}
                style={{
                  backgroundColor: primaryColor,
                  width: '50%',
                  borderRadius: 25,
                  color: 'white',
                  padding : 6,
                  marginVertical : 6,
                  fontSize: 10,
                  textAlign: 'center',
                }}>
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color:
                  item && item.status === 'Pending'
                    ? 'gold'
                    : item && item.status === 'Approved'
                    ? 'green'
                    : 'red',
                fontWeight: 'bold',
              }}>
              {item.status}
            </Text>
          </View>
        )}
      />
      {uniqueData ? (
        <RBSheet
          ref={rbSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              height: 'fit-content',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={{paddingVertical: 30, paddingHorizontal: 20, gap: 10}}>
            <View
              style={{flexDirection: 'row', gap: 120, alignItems: 'center'}}>
              <Text style={styles.lable}>
                {uniqueData &&
                uniqueData.leave_type &&
                uniqueData.leave_type.name
                  ? uniqueData.leave_type.name
                  : 'Common Leave'}
                {`(${
                  uniqueData &&
                  uniqueData.leave_type &&
                  uniqueData.leave_type.code
                    ? uniqueData.leave_type.code
                    : 'CL'
                })`}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  borderRadius: 20,
                  padding: 8,
                  color: 'white',
                  backgroundColor:
                    uniqueData.status === 'Pending'
                      ? 'gold'
                      : uniqueData.status === 'Approved'
                      ? 'green'
                      : 'red',
                  fontWeight: 'bold',
                }}>
                {uniqueData.status}
              </Text>
            </View>
            <View>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Title :{' '}
                {uniqueData && uniqueData.title ? uniqueData.title : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Start Date :{' '}
                {uniqueData && uniqueData.from_date
                  ? moment(uniqueData.from_date).format('DD MMM YYYY')
                  : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                End Date :{' '}
                {uniqueData && uniqueData.to_date
                  ? moment(uniqueData.to_date).format('DD MMM YYYY')
                  : null}
              </Text>
              <Text style={{color: 'black', fontSize: 12, padding: 5}}>
                Reason :{' '}
                {uniqueData && uniqueData.description
                  ? uniqueData.description
                  : null}{' '}
              </Text>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                padding: 5,
                textAlign: 'right',
                fontWeight: 'bold',
              }}>
              Applied On{' '}
              {uniqueData && uniqueData.created_date
                ? moment(uniqueData.created_date).format('dddd, DD MMM YYYY')
                : null}
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => rbSheet.current.close()}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      ) : null}
    </>
  ) : (
    <Loader />
  );
};

export default Leaves;
