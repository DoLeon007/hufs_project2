import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import SavedInfo from '../components/SavedInfo'; 
import SavedInfoFrame from '../components/SavedInfoFrame';

export function BookmarkScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const handleItemSelect = (itemData) => {
      setSelectedDrink(itemData);      
      setModalVisible(true);           
  };

  const handleCloseModal = () => {
      setModalVisible(false);
      setSelectedDrink(null);         
  };

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      backgroundColor: 'white',
      }}>
      <SavedInfo onSelect={handleItemSelect} />  
      
      {selectedDrink && (
          <SavedInfoFrame 
              visible={modalVisible} 
              onClose={handleCloseModal} 
              drinkInfo={selectedDrink}
          />
      )}
    </View>
  );
}
