import React from "react";
import { StyleSheet } from 'react-native';
import { Text, Modal, Flex, Button, View } from 'native-base';

const SavedInfoFrame = ({ visible, onClose, drinkInfo }) => {
  if (!drinkInfo) return null;

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Body>
          <Flex direction="column" space={4}>
            <Text color="#848484" fontSize="16px" fontWeight="400" lineHeight="20px" marginTop="15">제조사</Text>
            <Text fontSize="17px" fontWeight="800" lineHeight="20px" marginTop="1">{drinkInfo.manufacturer}</Text>

            <Text color="#848484" fontSize="16px" fontWeight="400" lineHeight="20px" marginTop="2">이름</Text>
            <Text fontSize="17px" fontWeight="800" lineHeight="20px" marginTop="1">{drinkInfo.drinkName}</Text>
            
            <View style = {styles.container}>
              <View>
                <Text color="#B9BCBE" fontSize="16px" fontWeight="400" lineHeight="30px" marginTop="15">제품 영양 정보</Text>
              </View>
              <View>
                <Text fontSize="16px" fontWeight="400" lineHeight="30px" marginTop="15">{parseInt(drinkInfo.size)}ml</Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <Text color="#848484" marginTop="3">1회 제공량(kcal) </Text>
                <Text color="#848484" marginTop="3">단백질(g) </Text>
                <Text color="#848484" marginTop="3">지방(g) </Text>
              </View>
              <View>
                <Text textAlign="right" marginTop="3">{parseInt(drinkInfo.kcal)}</Text>
                <Text textAlign="right" marginTop="3">{parseInt(drinkInfo.protein)}</Text>
                <Text textAlign="right" marginTop="3">{parseInt(drinkInfo.fat)}</Text>
              </View>
              <View>
                <Text color="#848484" marginTop="3">당류(g)</Text>
                <Text color="#848484" marginTop="3">카페인(mg)</Text>
                <Text color="#848484" marginTop="3">나트륨(mg)</Text>
              </View>
              <View>
                <Text textAlign="right" marginTop="3">{parseInt(drinkInfo.sugar)}</Text>
                <Text textAlign="right" marginTop="3">{parseInt(drinkInfo.caffeine)}</Text>
                <Text textAlign="right" marginTop="3">{parseInt(drinkInfo.natrium)}</Text>
              </View>
            </View>
          </Flex>
        </Modal.Body>
        <Modal.Footer justifyContent="center" alignItems="center" borderTopWidth={0}>
            <Button
              width="60%"
              borderRadius="30"
              bg='#9747FF'
              color='white'>
              추가하기
            </Button>

          </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"row",
    justifyContent: "space-between"
  },
  containerOne: {
    flex:1,
    flexDirection:"column",
    justifyContent: "space-between"
  }
});

export default SavedInfoFrame;
