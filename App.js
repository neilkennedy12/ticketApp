import { Mobile } from './components/Mobile';
import { Web } from './components/Web';
import { Platform } from 'react-native';
import { Provider, DefaultTheme} from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "green",
      background: "white",
      surface: "white",
    },
  };

const App = () => {
  return (
    <Provider theme = {theme}>
        {Platform.OS === 'android' || Platform.OS === 'ios' ? (
          <Mobile />
        ) : Platform.OS === 'web' ? (
          <Web />
        ) : (
          <></>
        )}
    </Provider>
  );
};

export default App;
