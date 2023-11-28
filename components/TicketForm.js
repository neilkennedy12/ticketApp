import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Upload } from './Upload';
const defaultValue = {
  name: '',
  email: '',
  description: '',
};

export const TicketForm = () => {
  const [value, setValue] = useState(defaultValue);

  const [file, setFile] = useState({type:"cancel"});

  const onFileUpload = () => {
    const formData = new FormData();
    file && formData.append('file', file);
    formData.append('value', JSON.stringify(value));
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://neilkennedy12.pythonanywhere.com/upload');
    // xhr.send(formData);
    fetch('https://neilkennedy12.pythonanywhere.com/upload', {
      body: formData,
      header: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
    });
  };

  const handleSubmit = async () => {
    setValue(defaultValue);
    onFileUpload();
  };
  const handleChange = (e, type) => {
    setValue({ ...value, [type]: e });
  };

  return (
    <View style={{ margin: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>Submit Ticket</Text>

      <TextInput
        mode="outlined"
        label="Name"
        value={value.name}
        onChangeText={(e) => handleChange(e, 'name')}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={value.email}
        onChangeText={(e) => handleChange(e, 'email')}
      />
      <Upload setFile={setFile} />
      <TextInput
        mode="outlined"
        label={file ? file.name ?? 'Uploaded' : 'Filename'}
        disabled
        style={{ marginBottom: 6 }}
      />

      <TextInput
        mode="outlined"
        label="Description"
        value={value.description}
        onChangeText={(e) => handleChange(e, 'description')}
      />
      <Button
        mode="outlined"
        onPress={handleSubmit}
        style={{ marginTop: 6, borderColor: 'darkGrey' }}
        disabled={
          !(
            value.name != '' &&
            value.email != '' &&
            value.description != '' &&
            file !== undefined
          )
        }>
        Submit Ticket
      </Button>
    </View>
  );
};
