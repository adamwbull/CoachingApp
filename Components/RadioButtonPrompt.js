import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { radioButtonPromptStyles, promptSurveyStyles } from '../Scripts/Styles.js';

export default function RadioButton({ options, selectedOption, onSelect }) {
  return (
    <View>
      {options.map((item) => {
        return (
          <View key={item.key} style={promptSurveyStyles.radioButtonContainer}>
            <TouchableOpacity
              style={radioButtonPromptStyles.touchableArea}
              onPress={() => {
                onSelect(item);
              }}
            >
              <View style={radioButtonPromptStyles.circle}>
                {selectedOption && selectedOption.key === item.key && (
                  <View style={radioButtonPromptStyles.checkedCircle} />
                )}
              </View>
              <Text style={radioButtonPromptStyles.itemText}>{item.text}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
