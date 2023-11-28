import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Platform } from 'react-native';
import * as ExpoFileSystem from 'expo-file-system';

import * as DocumentPicker from 'expo-document-picker';

export const Upload = ({ setFile }) => {
  const pickFile = async () => {
    await DocumentPicker.getDocumentAsync({}).then(async (res) => {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        setFile(res);
      } else {
        setFile(res.output[0]);
      }
    });
  };
  return (
    <View style={{ marginTop: 10 }}>
      <Button onPress={pickFile} mode="outlined">
        Upload File
      </Button>
    </View>
  );
};
