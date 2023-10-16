import * as React from 'react';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Center, VStack, Input, View, HStack, InputRightElement } from "native-base";
import { FormButton } from '../components/FormButton';
import SavedInfo from '../components/SavedInfo';

function SearchBar({ onSearchChange }) {
    return (
        <View w="100%" alignItems="center" space={5} alignSelf="center">
            <HStack width="80%" space={3} alignItems="center">
                <Input
                    placeholder="찾으시는 음료를 검색해 보세요" 
                    borderRadius="10"
                    py="2"
                    px="1"
                    fontSize="12"
                    onChangeText={onSearchChange}
                    InputRightElement={<AntDesign name="search1" size={18} color="lightgray" style={{ marginRight: 10 }} />}
                />
            </HStack>
        </View>
    );
}

export function SearchScreen({ navigation }) {
    const [searchTerm, setSearchTerm] = useState("");

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <FormButton />
        });
    }, [navigation]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10 }}>
                    <SearchBar onSearchChange={(text) => setSearchTerm(text)} />
                    <SavedInfo searchTerm={searchTerm} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
