import React, { useState, useEffect } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../style";

const Dropdown = (props) => {

    const [value, setValue] = useState(props.data || []);
    const [selectCountry, setSelectCountry] = useState('select country');
    const [isClicked, setIsClicked] = useState(false);

    const onSearch = async(txt) => {
        if (txt !== '') {
            try {
                const searchText = await value.filter((item) => {
                    return item.name.toLowerCase().indexOf(txt.toLowerCase()) > -1;
                });
                setValue(searchText);
            } catch (error) {
                console.log('error find on searchable dropdown');
            }
        } else {
            setValue(props.data || []);
        }
    };

    const handleSelect=(id)=>{
            setSelectCountry(id);
            props.handleDD(id)
            setIsClicked(false);
        
    }

    useEffect(() => {
        setValue(props.data || []);
    }, [props.data]);

    return (
        <>
            <TouchableOpacity style={styles.dropdown} onPress={() => setIsClicked(!isClicked)}>
                <Text >{selectCountry}</Text>
            </TouchableOpacity>
            {isClicked ? (
                <View style={styles.dropdownArea}>
                    <TextInput
                        placeholder="search"
                        style={styles.textInput}
                        onChangeText={(txt) => onSearch(txt)}
                    />
                    <FlatList
                        data={value}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropDownContent}
                                onPress={()=>handleSelect(item.id)}
                                
                            >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ) : null}
        </>
    );
};

export default Dropdown;
