import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../../../../style";
import { currentUser } from "../../../../utils/currentUser";
import getApi from "../../../../redux/slices/utils/getApi";
import { SelectList } from "react-native-dropdown-select-list";
import Loader from "../../../../utils/ActivityIndicator";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";

const ApplyLR = () => {
    // State variables
    const [id, setId] = useState(null);
    const [leaveType, setLeaveType] = useState([]);
    const [selectLeaveType, setSelectLeaveType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [formValues, setFormValues] = useState({
        from_date: null,
        to_date: null
    })

    useEffect(() => {
        // Fetch user data
        const fetchData = async () => {
            try {
                const userData = await currentUser();
                if (userData) {
                    setId(userData.data.branch.id);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Fetch leave types
        const fetchLeaveType = async () => {
            try {
                setLoading(true);
                if (id) {
                    const res = await getApi.getLeaveTypeList(id);
                    if (res.data) {
                        const transformedData = res.data.map(item => ({
                            key: item.id.toString(),
                            value: item.name
                        }));
                        setLeaveType(transformedData);
                    }
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching leave type list:", error);
            }
        };
        fetchLeaveType();
    }, [id]);

    const showDateTimePicker = (isFromDate) => {
        // Show the DateTimePicker based on the type of date
        if (isFromDate) {
            setShowFromDatePicker(true);
        } else {
            setShowToDatePicker(true);
        }
    };

    const handleDateChange = (selectedDate) => {

        setShowFromDatePicker(false);
        setShowToDatePicker(false);
        const formattedDate = selectedDate.toLocaleDateString();

        setFormValues(values => ({
            ...values,
            [showFromDatePicker ? 'from_date' : 'to_date']: formattedDate
        }));
    };

    const handlePress = (values) => {
        const fData = new FormData()
        fData.append('title', values.title)
        fData.append('leaveType', selectLeaveType)
        fData.append('from_date', formValues.from_date)
        fData.append('to_date', formValues.to_date)
        fData.append('description', values.description)
        console.log('fData', fData);
    }
    return (
        loading ? <Loader /> : <ScrollView>
            <Formik
                initialValues={{
                    leaveType: null,
                    title: "",
                    from_date: formValues.from_date,
                    to_date: formValues.to_date,
                    description: ""
                }}
                onSubmit={(values) => {
                    handlePress(values)
                }}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>Leave Type</Text>
                            <SelectList
                                boxStyles={styles.textInput}
                                dropdownStyles={styles.textInput}
                                setSelected={(val) => setSelectLeaveType(val)}
                                data={leaveType}
                                save="key"
                                placeholder={'Select Weekoff e.g. (Saturday)'}
                                notFoundText="Data not found"
                                value={selectLeaveType}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>Title</Text>
                            <TextInput
                                value={values.title || ""}
                                style={styles.textInput}
                                placeholder="e.g. (One Day Leave)"
                                onChangeText={handleChange("title")}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>From Date</Text>
                            <TouchableOpacity onPress={() => showDateTimePicker(true)} style={styles.textInput}>
                                <Text>{formValues.from_date || 'Select Date'}</Text>
                            </TouchableOpacity>
                            {showFromDatePicker && (
                                <DateTimePicker
                                    value={formValues.from_date ? new Date(formValues.from_date) : new Date()}
                                    mode="date"
                                    onChange={(event, selectedDate) => handleDateChange(selectedDate)}
                                />
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>To Date</Text>
                            <TouchableOpacity onPress={() => showDateTimePicker(false)} style={styles.textInput}>
                                <Text>{formValues.to_date || 'Select Date'}</Text>
                            </TouchableOpacity>
                            {showToDatePicker && (
                                <DateTimePicker
                                    value={formValues.to_date ? new Date(formValues.to_date) : new Date()}
                                    mode="date"
                                    onChange={(event, selectedDate) => handleDateChange(selectedDate)}
                                />
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.lable}>Description</Text>
                            <TextInput
                                name='description'
                                value={values.description || ""}
                                style={[styles.textInput, { textAlignVertical: 'top', textAlign: 'left' }]}
                                placeholder="Enter description for leave"
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={handleChange("description")}
                            />
                        </View>
                        <View>
                            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};

export default ApplyLR;
