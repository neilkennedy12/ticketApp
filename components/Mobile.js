import { SafeAreaView } from 'react-native';
import { TicketForm } from './TicketForm';
import { ViewTickets } from './ViewTickets';

import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { View} from 'react-native';


export const Mobile = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'submit',
      title: 'Submit',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    { key: 'view', title: 'View', focusedIcon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    submit: TicketForm,
    view: ViewTickets,
  });

  return (
    <SafeAreaView style={{flex:1}}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
    </SafeAreaView>
  );
};
