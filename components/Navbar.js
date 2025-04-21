import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // the line that seperates the navbar from the app
  const navbarSeperator = <SafeAreaView style={{ borderWidth: 1, backgroundColor: '#000000', marginVertical: 6 }}></SafeAreaView>;

  return (
    <>
      {navbarSeperator}
      <SafeAreaView style={styles.navbarContainer}>
        <Pressable
         style={route.name === 'Home' ? styles.activeIcon : styles.icon}
         onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.text}>Home</Text>
        </Pressable>
        <Pressable
         style={route.name === 'Budgets' ? styles.activeIcon : styles.icon}
         onPress={() => navigation.navigate('Budgets')}
        >
          <Text style={styles.text}>Budgets</Text>
        </Pressable>
        <Pressable
         style={route.name === 'Profile' ? styles.activeIcon : styles.icon}
         onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.text}>Profile</Text>
        </Pressable>
        <Pressable
         style={route.name === 'Settings' ? styles.activeIcon : styles.icon}
         onPress={() => alert('settings pressed')}
        >
          <Text style={styles.text}>Settings</Text>
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
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '7%',
    maxHeight: '7%',
  },
  icon: {
    backgroundColor: '#c0c0c0',
    borderRadius: 10,
    padding: 10,
    minWidth: '20%',
    maxWidth: '23.75%',
    minHeight: '90%',
    maxHeight: '90%',
    justifyContent: 'center'
  },
  activeIcon: {
    backgroundColor: '#909090',
    borderRadius: 10,
    padding: 10,
    minWidth: '20%',
    maxWidth: '23.75%',
    minHeight: '90%',
    maxHeight: '90%',
    justifyContent: 'center'
  },
  text: {
    alignSelf: 'center',
    fontWeight: 800,
  }
});
 
export default Navbar;