import { Text, Flex, Button, Modal, FormControl, Input } from "native-base";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

const NutritionInfoInput = ({ label, value, onChangeText }) => (
  <Flex direction="row" align="center" width="45%">
    <Text fontSize="10px" flex={2}>
      {label}
    </Text>
    <Input
      flex={1.7}
      value={value}
      onChangeText={onChangeText}
      keyboardType="decimal-pad" 
    />
  </Flex>
);

export const FormButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [sugar, setSugar] = useState("");
  const [caffeine, setCaffeine] = useState("");
  const [carb, setCarb] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [sodium, setSodium] = useState("");
  
  const resetFields = () => {
    setManufacturer("");
    setDrinkName("");
    setSugar("");
    setCaffeine("");
    setCarb("");
    setProtein("");
    setFat("");
    setSodium("");
  };

  const handleSubmit = () => {
    console.log({
      manufacturer,
      drinkName,
      sugar,
      caffeine,
      carb,
      protein,
      fat,
      sodium,
    });

    setShowModal(false);  
    resetFields();  
  };

  return (
    <>
      <Button 
        backgroundColor="white" 
        onPress={() => setShowModal(true)}>
        <AntDesign name="form" size={24} color="#9747FF" />
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />

          <Modal.Body>
            <FormControl>
              <FormControl.Label>제조사명</FormControl.Label>
              <Input value={manufacturer} onChangeText={setManufacturer} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>음료수명</FormControl.Label>
              <Input value={drinkName} onChangeText={setDrinkName} />
            </FormControl>
            <FormControl mt="5">
              <FormControl.Label>1회 섭취시 영양성분</FormControl.Label>
              <Flex justifyContent="space-between" flexDirection="row">
                <NutritionInfoInput label="당류(g)" value={sugar} onChangeText={setSugar}/>
                <NutritionInfoInput label="카페인(mg)" value={caffeine} onChangeText={setCaffeine}/>
              </Flex>
              <Flex justifyContent="space-between" flexDirection="row" mt={2}>
                <NutritionInfoInput label="탄수화물(g)" value={carb} onChangeText={setCarb}/>
                <NutritionInfoInput label="단백질(g)" value={protein} onChangeText={setProtein}/>
              </Flex>
              <Flex justifyContent="space-between" flexDirection="row" mt={2}>
                <NutritionInfoInput label="지방(g)" value={fat} onChangeText={setFat}/>
                <NutritionInfoInput label="나트륨(g)" value={sodium} onChangeText={setSodium}/>
              </Flex>
            </FormControl>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" onPress={() => {setShowModal(false); resetFields();}}>취소</Button>
              <Button 
              bg='#9747FF'
              color='white'
              onPress={handleSubmit}> 
                저장
              </Button>
            </Button.Group>
          </Modal.Footer>
          
        </Modal.Content>
      </Modal>
    </>
  );
};
