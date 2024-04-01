import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { primaryColor, styles } from "../../../../../style";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import Icon from 'react-native-vector-icons/FontAwesome5'
import DocumentPicker from 'react-native-document-picker';
import createApi from "../../../../redux/slices/utils/createApi";
import ButtonLoader from "../../../../utils/BtnActivityIndicator";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const ApplyLE = () => {
    const navigation = useNavigation()
    const lateEarly = [{ key: 'Late Comming', value: 'Late Comming' }, { key: 'Early Going', value: 'Early Going' }]
    const [selectLateEarly, setSelectLateEarly] = useState(null);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [document, setDocument] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState({ date: null }, { time: null })

    const handleDateChange = (selectedDate) => {
        setShowFromDatePicker(false);
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

        setFormValues(values => ({
            ...values,
            date: formattedDate,
        }));
    };

    const handleTimeChange = (selectTime) => {      
        setShowTime(false);
        setFormValues({ ...formValues, time: selectTime });
    };

    const selectDoc = async () => {
        try {
            const doc = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf]
            });

            if (doc) {
                setDocument(doc)
            }

        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log("Document selection cancelled", error);
            } else {
                console.log(error);
            }
        }
    };

    const handlePress = async (values) => {
        const fData = new FormData()

        fData.append('late_early', selectLateEarly ? selectLateEarly : null)
        fData.append('date', formValues.date ? formValues.date : null)
        fData.append('time', formValues.time ? moment(formValues.time).format('HH:mm:ss') : null)
        fData.append('reason', values.reason ? values.reason : null)
        document ? fData.append('attachment', document ? document : null) : null
     
        try {
            setIsLoading(true)
            const res = await createApi.createLateEarly(fData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
          
            if (res.status === 201 || 200) {
                setIsLoading(false)
                navigation.navigate('Leave', )

                Toast.show({
                    type: "success",
                    text1: 'Request for late/early submitted successfully',
                    text2: "Your late/early request has been successfully submitted.",
                    autoHide: 4000
                })
            }
        } catch (error) {
            setIsLoading(false)
            console.log(`Request for late/early failed`, error.response.data);
        }
    console.log('fData==>', fData);
    }

    return (
        <ScrollView>
            <Formik
                initialValues={{
                    late_early: "",
                    date: "",
                    time: "",
                    reason: "",
                    attachment: null
                }}
                onSubmit={(values) => {
                    handlePress(values)
                }}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>Late/Early</Text>
                            <SelectList
                                boxStyles={styles.textInput}
                                dropdownStyles={styles.textInput}
                                setSelected={(val) => setSelectLateEarly(val)}
                                data={lateEarly}
                                save="key"
                                placeholder={'Select  e.g. (Late)'}
                                notFoundText="Data not found"
                                value={selectLateEarly}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>Date</Text>
                            <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.textInput}>
                                <Text>{formValues.date || 'Select Date'}</Text>
                            </TouchableOpacity>
                            {showFromDatePicker && (
                                <DateTimePicker
                                    value={formValues.date ? new Date(formValues.date) : new Date()}
                                    mode="date"
                                    onChange={(event, selectedDate) => handleDateChange(selectedDate)}
                                />
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Time</Text>
                            <TouchableOpacity onPress={() => setShowTime(true)} style={styles.textInput}>
                                <Text>{formValues.time ? moment(formValues.time).format('HH:mm:ss') : 'Select Time'}</Text>
                            </TouchableOpacity>
                            {showTime && (
                                <DateTimePicker
                                    value={formValues.time || new Date()}
                                    mode="time"
                                    is24Hour={true}
                                    onChange={(event, selectTime) => handleTimeChange(selectTime)}
                                />
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>Reason</Text>
                            <TextInput
                                name='reason'
                                value={values.reason || ""}
                                style={[styles.textInput, { textAlignVertical: 'top', textAlign: 'left' }]}
                                placeholder="Enter reason for leave"
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={handleChange("reason")}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>Attachment</Text>
                            <TouchableOpacity style={style.uploadUI} onPress={selectDoc}>
                                <Icon name='cloud-upload-alt' style={style.icon} />
                                {document && document.name ? <Text >{document.name}</Text> : <Text >Upload your files</Text>}
                            </TouchableOpacity>

                        </View>


                        <View>
                            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                                {isLoading ? <ButtonLoader /> : <Text style={styles.buttonText} > Submit</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};

export default ApplyLE;

const style = StyleSheet.create({
    uploadUI: {
        padding: 10,
        height: 'fit-content',
        borderWidth: 4,
        borderColor: '#D0D5DD',
        borderRadius: 8,
        backgroundColor: '#FFF',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dotted'

    },
    icon: {
        fontSize: 50,
        color: primaryColor
    },
    documentView: {
        padding: 10,
        height: 'fit-content',
        borderWidth: 4,
        borderColor: '#D0D5DD',
        borderRadius: 8,
        backgroundColor: '#FFF',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dotted'
    }
})