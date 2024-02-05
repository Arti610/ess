import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../../../../../style";
import { currentUser } from "../../../../utils/currentUser";
import getApi from "../../../../redux/slices/utils/getApi";
import { SelectList } from "react-native-dropdown-select-list";

const ApplyLR = () => {
    const [id, setId] = useState(null);
    const [leaveType, setLeaveType] = useState(null)
    const [selectLeaveType, setSelectLeaveType] = useState(null)
    console.log('leaveType', leaveType);

    useEffect(() => {
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
        const fetchLeaveType = async () => {
            try {
                // Make sure to handle the case where id is null or undefined
                if (id) {
                    const res = await getApi.getLeaveTypeList(id);
                    setLeaveType(res.data)
                }
            } catch (error) {
                console.error("Error fetching leave type list:", error);
            }
        };

        // Call the fetchLeaveType function
        fetchLeaveType();
    }, [id]); 

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.lable}>Leave Type</Text>
                    {/* <SelectList
                        boxStyles={styles.textInput}
                        dropdownStyles={styles.textInput}
                        setSelected={(val) => setSelectLeaveType(val)} 
                        data={leaveType}
                        save="key"
                        placeholder={'Select Weekoff e.g. (Saturday)'}
                        notFoundText="Data not found"
                        value={selectLeaveType}
                    /> */}

                </View>
            </View>
        </ScrollView>
    );
};

export default ApplyLR;
