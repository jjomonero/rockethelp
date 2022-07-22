
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CameraPage } from '../screens/CameraPage';
import { Details } from '../screens/Details';
import { Home } from '../screens/Home';
import { Leitor } from '../screens/Leitor';
import { Register } from '../screens/Register';

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes () {
    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>

            <Screen
                name="home"
                component={Home}
            />

            <Screen
                name="new"
                component={Register}
            />

            <Screen
                name="details"
                component={Details}
            />
        </Navigator>
    )
}