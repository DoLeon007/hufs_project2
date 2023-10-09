import React, { useState, useEffect } from "react";
import { Text, Flex, Box } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';

const nutritionMapping = {
  sugar: "당류",
  caffeine: "카페인",
};

export const SavedInfoItem = ({ data, onSelect }) => {
  const [isStarred, setIsStarred] = useState(false);
  const formatValue = (value) => {
    return value % 1 === 0 ? Math.floor(value) : value;
  }

  return (
    <TouchableWithoutFeedback onPress={() => onSelect(data)}>
      <Box {...styles.box}>
        <Flex direction="row" width="100%">

          {/* 별 아이콘 */}
          <Flex mr="3" width="10%" justifyContent="flex-start" alignItems="center">
            <AntDesign
              name={isStarred ? "star" : "staro"}
              size={28}
              color={isStarred ? "#FFD233" : "lightgray"}
              onPress={() => setIsStarred(!isStarred)}
            />
          </Flex>
          {/* 텍스트 영역 */}
          <Flex width="70%" flexDirection="column">
            <Flex {...styles.flexStart}>
              <Text fontWeight="bold">{data.manufacturer}</Text> {/* 제조사명 */}
            </Flex>
            <Flex {...styles.flexStart} mt={1}>
              <Text fontWeight="bold">{data.drinkName}</Text> {/* 음료명 */}
            </Flex>
            <Flex {...styles.flexRow} mt={3}>
              <Flex direction="row">
                <Text color="#848484">{nutritionMapping["sugar"]}: </Text> {/* 당류: */}
                <Text color="#848484">{formatValue(data["sugar"])}g</Text> {/* Updated this line */}
              </Flex>
              <Flex direction="row" ml={4}>
                <Text color="#848484">{nutritionMapping["caffeine"]}: </Text> {/* 카페인: */}
                <Text color="#848484">{formatValue(data["caffeine"])}mg</Text> {/* Updated this line */}
              </Flex>
            </Flex>
          </Flex>
          {/* 플러스 아이콘 */}
          <Flex width="10%" justifyContent="flex-start" alignItems="center">
            <AntDesign
              name="plus"
              size={25}
              color="lightgray"
              onPress={() => {/* Place your onPress logic here */ }}
            />
          </Flex>

        </Flex>
      </Box>
    </TouchableWithoutFeedback>  
  );
};

const SavedInfo = ({ searchTerm, onSelect }) => {
  const [savedData, setSavedData] = useState([]);

  const handleItemSelect = (itemData) => {
    console.log("Selected Item:", itemData);
    if(onSelect) { 
      onSelect(itemData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.20.10.4:4000/drink');
        
        // 전체 데이터를 매핑. 화면에는 당류와 카페인만 표시되지만, 
        // 다른 모든 데이터도 가져와서 상태에 저장.
        const mappedData = response.data.map(item => ({
          drinkName: item.d_name,
          manufacturer: item.manuf,
          sugar: item.sugar,
          caffeine: item.caffeine,
          id: item.d_id,
          size: item.size,
          kcal: item.kcal,
          protein: item.protein,
          natrium: item.natrium,
          fat: item.fat,
          grade: item.grade,
          source: item.source
        }));
        setSavedData(mappedData);  
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
  
    fetchData();
  }, []);

  // 검색어를 사용하여 목록을 필터링
  const filteredData = searchTerm
  ? savedData.filter(item => 
      item.drinkName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : savedData;

  return (
    <Flex
      direction="column"
      p={4}
      width="100%"
      alignItems="center"
      justifyContent="center"
      flex={1}
    >

      <FlatList
        data={filteredData} // 필터링된 데이터를 사용
        renderItem={({ item }) => <SavedInfoItem data={item} onSelect={handleItemSelect} />} 
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
        onStartShouldSetResponderCapture={() => true}
      />

    </Flex>
  );
};

const styles = {
  box: {
    mt: 3,
    p: 3,
    borderRadius: "20%",
    borderWidth: "0.5px",
    borderColor: "lightgray",
    width: "100%",
    alignItems: "center"
  },
  flexStart: {
    direction: "row",
    width: "100%",
    alignItems: "flex-start"
  },
  flexRow: {
    direction: "row",
    width: "100%"
  }
};

export default SavedInfo;
