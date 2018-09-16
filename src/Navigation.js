import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { CameraView } from 'screens/Camera/CameraView';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { Icon } from 'react-native-elements';
import { HandleBoot } from 'HandleBoot';
import { Settings } from 'screens/Settings';
import { UserType } from 'screens/UserType';
import { ProDashboard } from 'screens/ProDashboard';
import { TrainerSelect } from 'screens/TrainerSelect';
import { ClientFoodList } from 'screens/ClientFoodList';

const styles = {
    navContainer: {
        backgroundColor: "#EFEDF3",
        height: 55,
    }
}
const ClientNavigator = createBottomTabNavigator(
{
    camera: { 
        screen: CameraView,
        navigationOptions: {
            tabBarIcon: () => <Icon size={35} name='camera' type='evilicon' color='#BDBAC4' />
        }
    },
    settings: { 
        screen: Settings,
        navigationOptions: {
            tabBarIcon: () => <Icon size={35} name='gear' type='evilicon' color='#BDBAC4' />
        }
    },
},
{ 
    tabBarOptions: {
        showLabel: false,
        style: styles.navContainer
    },
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
