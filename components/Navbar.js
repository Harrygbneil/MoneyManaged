import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Navbar = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = props.user;

  // the line that seperates the navbar from the app
  const navbarSeperator = <SafeAreaView style={{ borderWidth: 1, backgroundColor: '#000000', marginTop: 8 }}></SafeAreaView>;

  return (
    <>
      {navbarSeperator}
      <SafeAreaView style={styles.navbarContainer}>
        <Pressable
         style={route.name === 'Home' ? styles.activeIcon : styles.icon}
         onPress={() => navigation.navigate('Home', { user: user })}
        >
          <Text style={{color: 'white', alignSelf: 'center'}}>Home</Text>
        </Pressable>
        <Pressable
         style={route.name === 'Budgets' ? styles.activeIcon : styles.icon}
         onPress={() => navigation.navigate('Budgets', { user: user })}
        >
          <Text style={{color: 'white', alignSelf: 'center'}}>Budgets</Text>
        </Pressable>
        <Pressable
         style={route.name === 'Profile' ? styles.activeIcon : styles.icon}
         onPress={() => navigation.navigate('Profile', { user: user })}
        >
          <Text style={{color: 'white', alignSelf: 'center'}}>Profile</Text>
        </Pressable>
        <Pressable
         style={route.name === 'Settings' ? styles.activeIcon : styles.icon}
         onPress={() => alert('settings pressed')}
        >
          <Text style={{color: 'white', alignSelf: 'center'}}>Settings</Text>
        </Pressable>
      </SafeAreaView>
    </>  
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#52FFB8',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '8%',
    maxHeight: '8%',
  },
  icon: {
    backgroundColor: '#DF2935',
    borderRadius: 10,
    padding: 10,
    minWidth: '20%',
    maxWidth: '23.75%',
    minHeight: '90%',
    maxHeight: '90%',
  },
  activeIcon: {
    backgroundColor: '#e7626a',
    borderRadius: 10,
    padding: 10,
    minWidth: '20%',
    maxWidth: '23.75%',
    minHeight: '90%',
    maxHeight: '90%',
  },
});
 
export default Navbar;