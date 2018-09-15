import { createBottomTabNavigator } from 'react-navigation';
import { CameraView } from 'screens/Camera/CameraView';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { HandleBoot } from 'HandleBoot';
import { Friends } from 'screens/Friends';
import { Settings } from 'screens/Settings';
import { UserType } from 'screens/UserType';
import { ProDashboard } from 'screens/ProDashboard';

const ClientNavigator = createBottomTabNavigator({
    camera: { screen: CameraView },
    friends: { screen: Friends },
    settings: { screen: Settings },
});

const ProfessionalNavigator = createBottomTabNavigator({
    dashboard: { screen: ProDashboard },
});

export const MainNavigator = createBottomTabNavigator({
    root: { screen: HandleBoot },
    welcome: { screen: WelcomeScreen },
    router: UserType,
    client: ClientNavigator,
    professional: ProfessionalNavigator,
}, {
    animationEnabled: true,
    navigationOptions: {
        tabBarVisible: false,
    },
});
