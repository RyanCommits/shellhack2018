import { createBottomTabNavigator } from 'react-navigation';
import { CameraView } from 'screens/Camera/CameraView';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { HandleBoot } from 'HandleBoot';
import { Friends } from 'screens/Friends';
import { Settings } from 'screens/Settings';

const AppNavigator = createBottomTabNavigator({
    camera: { screen: CameraView },
    friends: { screen: Friends },
    settings: { screen: Settings },
}, {
    animationEnabled: true,
});

export const MainNavigator = createBottomTabNavigator({
    root: { screen: HandleBoot },
    welcome: { screen: WelcomeScreen },
    main: AppNavigator,
}, {
    animationEnabled: true,
    navigationOptions: {
        tabBarVisible: false,
    },
});
