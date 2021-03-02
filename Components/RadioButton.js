import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { radioButtonStyles, onboardingStyles } from '../Scripts/Styles.js';

export default function RadioButton({ options, selectedOption, onSelect }) {
  return (
    <View>
      {options.map((item) => {
        return (
          <View key={item.key} style={onboardingStyles.radioButtonContainer}>
            <TouchableOpacity
              style={radioButtonStyles.touchableArea}
              onPress={() => {
                onSelect(item);
              }}
            >
              <View style={radioButtonStyles.circle}>
                {selectedOption && selectedOption.key === item.key && (
                  <View style={radioButtonStyles.checkedCircle} />
                )}
              </View>
              <Text style={radioButtonStyles.itemText}>{item.text}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
