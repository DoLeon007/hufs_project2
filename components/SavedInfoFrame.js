import React, { useState, useEffect } from "react";
import { Text, Modal, Flex, Button } from 'native-base';

const SavedInfoFrame = ({ visible, onClose, drinkInfo }) => {
  if (!drinkInfo) return null;

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Body>
          <Flex direction="column" space={4}>
            <Text fontSize="lg" fontWeight="bold">제조사</Text>
            <Text>{drinkInfo.manufacturer}</Text>

            <Text fontSize="lg" fontWeight="bold">이름:</Text>
            <Text>{drinkInfo.drinkName}</Text>

            <Text fontSize="lg" fontWeight="bold">1회 섭취시 영양성분</Text>
            <Flex direction="row" justifyContent="space-between">
              <Flex direction="column">
                <Text>당류: {drinkInfo.sugar}g</Text>
                <Text>카페인: {drinkInfo.caffeine}mg</Text>
              </Flex>
              <Flex direction="column">
                <Text>단백질: {drinkInfo.protein}g</Text>
                <Text>나트륨: {drinkInfo.sodium}g</Text>
              </Flex>
              <Flex direction="column">
                <Text>지방: {drinkInfo.fat}g</Text>
                <Text>탄수화물: {drinkInfo.carb}g</Text>
              </Flex>
            </Flex>
          </Flex>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onPress={onClose}>닫기</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default SavedInfoFrame;
