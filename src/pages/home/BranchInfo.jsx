import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import IconAdd from 'react-native-vector-icons/MaterialIcons'
import {styles} from '../../../style'
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import branchApi from "../../redux/slices/branch/branchApi";

const BranchInfo = () =>{
    const navigation = useNavigation();
    const [data , setData] = useState(null)


    useEffect(()=>{
        const fetchBranchInfo = async () =>{
            const res = await branchApi.getAllBranchInfo()
           if(res){
            setData(res.data)
           }
        }
        fetchBranchInfo()
    },[])
return(
    <>
        <ScrollView>
            <View><Text>{data && data[0].branch.name}</Text></View>
        </ScrollView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('AddBranchInfo')}>
            <IconAdd name='add' style={styles.addIcon} />
            </TouchableOpacity>
        </View>
        <Toast />
    </>
)
}

export default BranchInfo


// // import React, { useEffect, useState } from "react";
// // import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// // import IconAdd from 'react-native-vector-icons/MaterialIcons'
// // import {styles} from '../../../style'
// // import { useNavigation } from "@react-navigation/native";
// // import Toast from "react-native-toast-message";
// // import branchApi from "../../redux/slices/branch/branchApi";

// // const BranchInfo = () =>{
// //     const navigation = useNavigation();
// //     const [data , setData] = useState(null)
// //     console.log('data',data);

// //     useEffect(()=>{
// //         const fetchBranchInfo = async () =>{
// //             const res = await branchApi.getAllBranchInfo()
// //            if(res){
// //             setData(res.data)
// //            }
// //         }
// //         fetchBranchInfo()
// //     },[])
// // return(
// //     <>
// //         <ScrollView>
// //             <View><Text>{data && data[0].branch.name}</Text></View>
// //         </ScrollView>
// //         <View style={styles.buttonContainer}>
// //             <TouchableOpacity onPress={() => navigation.navigate('AddBranchInfo')}>
// //             <IconAdd name='add' style={styles.addIcon} />
// //             </TouchableOpacity>
// //         </View>
// //         <Toast />
// //     </>
// // )
// // }

// // export default BranchInfo

// import React from 'react';
// import {View, TextInput, Button, Text} from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
 
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });
 
// const BranchInfo = () => {
//   const handleFormSubmit = values => {
//     console.log('Form submitted with values:', values);
//   };
 
//   return (
//     <View style={{padding: 20}}>
//       <Formik
//         initialValues={{name: '', email: '', password: ''}}
//         onSubmit={handleFormSubmit}
//         validationSchema={validationSchema}>
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//         }) => (
//           <View>
//             <TextInput
//               placeholder="Name"
//               onChangeText={handleChange('name')}
//               onBlur={handleBlur('name')}
//               value={values.name}
//             />
//             {touched.name && errors.name && (
//               <Text style={{color: 'red'}}>{errors.name}</Text>
//             )}
 
//             <TextInput
//               placeholder="Email"
//               onChangeText={handleChange('email')}
//               onBlur={handleBlur('email')}
//               value={values.email}
//               keyboardType="email-address"
//             />
//             {touched.email && errors.email && (
//               <Text style={{color: 'red'}}>{errors.email}</Text>
//             )}
 
//             <TextInput
//               placeholder="Password"
//               onChangeText={handleChange('password')}
//               onBlur={handleBlur('password')}
//               value={values.password}
//               secureTextEntry
//             />
//             {touched.password && errors.password && (
//               <Text style={{color: 'red'}}>{errors.password}</Text>
//             )}
 
//             <Button title="Submit" onPress={handleSubmit} />
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
// };
 
// export default BranchInfo;
