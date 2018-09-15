import { createBottomTabNavigator } from 'react-navigation';
import { CameraView } from 'screens/Camera/CameraView';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { HandleBoot } from 'HandleBoot';
import { Settings } from 'screens/Settings';
import { UserType } from 'screens/UserType';
import { ProDashboard } from 'screens/ProDashboard';
import { TrainerSelect } from 'screens/TrainerSelect';
import { ClientFoodList } from 'screens/ClientFoodList';

const ClientNavigator = createBottomTabNavigator({
    camera: { screen: CameraView },
    settings: { screen: Settings },
});

const ProfessionalNavigator = createBottomTabNavigator({
    dashboard: { screen: ProDashboard },
    clientFoodList: { screen: ClientFoodList },
}, {
    navigationOptions: {
        tabBarVisible: false,
    },
});

export const MainNavigator = createBottomTabNavigator({
    root: { screen: HandleBoot },
    welcome: { screen: WelcomeScreen },
    router: UserType,
    client: ClientNavigator,
    trainerSelect: { screen: TrainerSelect },
    professional: ProfessionalNavigator,
}, {
    animationEnabled: true,
    navigationOptions: {
        tabBarVisible: false,
    },
});
