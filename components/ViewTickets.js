import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Image } from 'react-native';
import { Text, List, Checkbox, Button, TextInput } from 'react-native-paper';

export const ViewTickets = () => {
  const [tickets, setTickets] = useState(undefined);
  const [text, setText] = useState({});

  const getTickets = async () => {
    await fetch('https://neilkennedy12.pythonanywhere.com/view')
      .then((res) => res.json())
      .then((res) => {
        setTickets(res.data);
      });
  };

  useEffect(() => {
    getTickets();
  }, []);

  const handleChange = (e, id) => {
    setText({ ...text, [id]: e });
  };

  const handleResolve = async (t) => {
    console.log(
      `Would normally send email here to ${t.email} with body { Hi ${
        t.name
      }, your ticket [${t.description}] has been resolved: ${text[t.id]})` 
    );
    await fetch('https://neilkennedy12.pythonanywhere.com/resolve/' + t.id)
      .then((res) => res.json())
      .then((res) => {
        setTickets(res.data);
      });
  };
  return (
      <ScrollView style={{flex:1}}>

    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>View Tickets</Text>
      <List.AccordionGroup>
        {tickets ? (
          tickets?.length > 0 ? (
            tickets.map((t) => (
              <List.Accordion
                id={t.id}
                title={
                  t.description?.slice(0, 20) +
                  ' - ' +
                  (t.status === "resolved" 
                    ? "Resolved"
                    : text[t.id] 
                    ? 'In Progress'
                    : 'New')
                }
                style={{
                  marginBottom: -10,
                  borderTop: '1px solid gray',
                  marginTop: 5,
                }}>
                <Text style={{ paddingLeft: 18 }}>Name: {t.name}</Text>
                <Text style={{ paddingLeft: 18 }}>Email: {t.email}</Text>
                <Text style={{ paddingLeft: 18, marginBottom: 5 }}>
                  Description: {t.description}
                </Text>
                <Image
                  source={{
                    uri: `https://neilkennedy12.pythonanywhere.com/download/${t.id}`,
                  }}
                  style={{ width: '100%', height: 200 }}
                  resizeMode="contain"
                />
                <TextInput
                  label="Send Response"
                  onChangeText={(e) => handleChange(e, t.id)}
                />
                <Button onPress={() => handleResolve(t) } disabled={t.status==="resolved"}>Resolve</Button>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 18,
                  }}>
                  <Text>New</Text>
                  <Checkbox
                  disabled
                    status={
                      t.status !== 'resolved' && !text[t.id]
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                  <Text>In Progress</Text>
                  <Checkbox
                  disabled
                    status={
                      t.status !== 'resolved' && text[t.id]
                        ? 'checked'
                        : 'unchecked'
                    } 
                  />

                  <Text>Resolved</Text>
                  <Checkbox
                    disabled
                    status={
                      t.status === 'resolved' ? 'checked' : 'unchecked'
                    }
                  />
                </View>
              </List.Accordion>
            ))
          ) : (
            <Text>There are currently no tickets </Text>
          )
        ) : (
          <View style={{ padding: 20 }}>
            <Text>Loading</Text>
          </View>
        )}
      </List.AccordionGroup>
    </View>
    </ScrollView>
  );
};
