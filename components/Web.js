import React, { useState } from 'react';
import { TicketForm } from './TicketForm';
import { ViewTickets } from './ViewTickets';
import { TopBar } from './TopBar';
import { StyleSheet, Text, View } from 'react-native';

export const Web = () => {
  const [tab, setTab] = useState(0);

  return (
    <View>
      <TopBar tab={tab} setTab={setTab} />
      {tab===0 ? <TicketForm/> : <ViewTickets/>}
    </View>
  );
};
