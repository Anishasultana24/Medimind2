import { Stack } from "expo-router";
import {useFonts} from 'expo-font'


export default function RootLayout() {
  const [loaded,error]=useFonts({
    'Kameron-Medium': require('./../assets/fonts/Kameron-Medium.ttf'),
    'Kameron-SemiBold': require('./../assets/fonts/Kameron-SemiBold.ttf')
  })
  return <Stack screenOptions={{headerShown:false}}
  />;
}
