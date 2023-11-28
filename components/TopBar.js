import {  Pressable} from "react-native";
import { Appbar , Text} from 'react-native-paper';

export const TopBar = ({ tab, setTab }) => {
  return (
<Appbar.Header style={{gap:10, paddingLeft:10}}>
    <Pressable onPress={()=>setTab(0)}><Text style={{fontWeight: tab===0 ? 'bold':'normal'}} >Submit</Text></Pressable>
    <Pressable onPress={()=>setTab(1)}><Text style={{fontWeight: tab===1 ? 'bold':'normal'}} >View</Text></Pressable>
    </Appbar.Header>
  );
};

