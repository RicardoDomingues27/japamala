import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FloatingMenu } from 'react-native-floating-action-menu';
import { Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCheckSquare, faCoffee, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationInjectedProps, withNavigation } from 'react-navigation';
// Specify data required to render the icon
const items = [
    {
      label: 'Black',
      icon: faUserPlus
    },
    {
      label: 'White',
      icon: faUserPlus
    },
  ];
  // Optional color to be silly
  const primaryColor = '#09f';
  const colorOptions = ['#F53B57', '#3D40C6', '#10BCF9', '#00D8D6', '#04C56B'];
  //const navigation = useNavigation();
 
class FabButton extends React.Component<NavigationInjectedProps> {
    state = {
        noIcons: false,
        isMenuOpen: false,
        numItemsToShow: 3,
        activeColor: colorOptions[1],
       
      };
    
  handleMenuToggle = (isMenuOpen: any) =>
    this.setState({ isMenuOpen });
 

  
  saveTheme = async  (theme: string) =>{
      try{
          await AsyncStorage.setItem('@theme', theme);
          console.log()
          switch(theme) {
              case 'white':  
                  this.props.navigation.navigate('ThemeWhite');
                break;
              case 'black':
                  this.props.navigation.navigate('ThemeBlack');
                break;
              default:  
                  this.props.navigation.navigate('ThemeColors');    
            }
      }catch(e){
          Alert.alert("Error: ", e);
      }
  }   
  handleItemPress = (item:any, index:any) =>{
    const {label} = item;
    this.saveTheme(label);
  }
    
 
    renderMenuIcon = (menuState: any) => {
      const { menuButtonDown } = menuState;
   
      return menuButtonDown
        ? <FontAwesomeIcon icon={ faCoffee } />
        : <FontAwesomeIcon icon={ faCheckSquare } />;
    }
    
    renderItemIcon = (item:any, index:number, menuState:any) => {
      const { itemsDown, dimmerActive } = menuState;
      const {activeColor} = this.state;
      const isItemPressed = itemsDown[index];
      const color = isItemPressed ? '#fff' : primaryColor;
   
      // Icons can be rendered however you like.
      // Here are some examples, using data from the item object:
   
      if (item.icon) {
        return (
            <FontAwesomeIcon
            style={[{color: itemsDown[index] ? '#fff' : activeColor}, item.style]}
            icon={item.icon}
            size={25}
          />
        );
      }
      else if (item.image) {
        return (
          <Image
            source={item.image}
            style={{ tintColor: color }}
            resizeMode="contain"
          />
        );
      }
   
      return null;
    };
    
  render() {
    const {
        noIcons,
        activeColor

      } = this.state;
      const { navigation } = this.props;  
    return (
      
        <FloatingMenu
          isOpen={this.state.isMenuOpen}
          items={items}
          onMenuToggle={this.handleMenuToggle}
          onItemPress={this.handleItemPress}
          renderItemIcon={!noIcons ? this.renderItemIcon : null}
        />
      
    );
  }
};
 
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});
 
export default withNavigation(FabButton);