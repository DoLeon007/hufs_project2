import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Center, VStack, Input, View, HStack, InputRightElement } from "native-base";

function SearchBar() {
    return (
        <View w="100%" alignItems="center" space={5} alignSelf="center">
            <HStack width="80%" space={3} alignItems="center">
                <Input 
                    placeholder="찾으시는 음료를 검색해 보세요"
                    borderRadius="10"
                    py="2"
                    px="1"
                    fontSize="12"
                    InputRightElement={<AntDesign name="search1" size={18} color="lightgray" style={{ marginRight: 10 }} />}
                />
            </HStack>
        </View>
    );
}

export function SearchScreen() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', paddingTop: 10 }}>
                <SearchBar/>
            </View>
        </TouchableWithoutFeedback>
    );
}

