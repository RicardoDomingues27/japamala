import React from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { FloatingMenu } from 'react-native-floating-action-menu';
import { Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAirFreshener, faBars, faCheckSquare, faCoffee, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
const screenHeight = Dimensions.get('screen').height;

// Specify data required to render the icon
const items = [
    {
      label: 'Black',
      image: require('../../assets/backgroundAlpha.png'),
      color: '#000'
    },
    {
      label: 'White',
      image: require('../../assets/backgroundAlpha.png'),
      color: '#fff'
    },
    {
      label: 'Colors',
      image: require('../../assets/imageButtonJapamalaColors.png'),
      
    },
  ];
  // Optional color to be silly
  const primaryColor = '#fff';
  const colorOptions = ['#f00', '#3D40C6', '#10BCF9', '#00D8D6', '#04C56B'];
  //const navigation = useNavigation();
type Props ={
  onTheme(theme: string):void
} 

class FabButton extends React.Component<Props>{
  constructor(props: Props | Readonly<Props>) {
    super(props);
    
    this.state = { 
      noIcons: false,
      isMenuOpen: false,
      numItemsToShow: 3,
      activeColor: colorOptions[0],
      };
  }  
  state = {
        noIcons: false,
        isMenuOpen: false,
        numItemsToShow: 3,
        activeColor: colorOptions[0],
        
      };
    
  handleMenuToggle = (isMenuOpen: any) =>
    this.setState({ isMenuOpen: isMenuOpen });
 

  
  saveTheme = async  (themeData: string) =>{
      try{
          await AsyncStorage.setItem('@theme', themeData);
          console.log(themeData + " Gravado no dispostivo");
          this.setState({ isMenuOpen: false });
          switch(themeData) {
              case 'White': 
                  this.props.onTheme('White');
                break;
              case 'Black':
                this.props.onTheme('Black');
                break;
              default:  
              this.props.onTheme('Colors');
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
      const { dimmerActive } = menuState;
      
      return dimmerActive
        ? <Image source={require('../../assets/arrow-down-drop-circle.png')}  />
        : <Image source={require('../../assets/plus.png')} />;
    }
    
    renderItemIcon = (item:any, index:number, menuState:any) => {
      const { itemsDown } = menuState;
      
      const isItemPressed = itemsDown[index];
      
   
      // Icons can be rendered however you like.
      // Here are some examples, using data from the item object:
   
      if (item.icon) {
        return (
            <FontAwesomeIcon
            style={[{color:  isItemPressed ? '#f00' : primaryColor}, item.style]}
            icon={item.icon}
            size={25}
          />
        );
      }
      else if (item.image) {
        return (
          <Image
            source={item.image}
            style={{ tintColor: item.color, borderRadius:50 , width:50}}
            resizeMode="contain"
          />
        );
      }
   
      return null;
    };
    
  render() {
    const {
        noIcons,
        activeColor,
        
      } = this.state;
     const {onTheme} = this.props;
    return (
      
        <FloatingMenu
          isOpen={this.state.isMenuOpen}
          renderMenuIcon={this.renderMenuIcon}
          items={items}
          onMenuToggle={this.handleMenuToggle}
          onItemPress={this.handleItemPress}
          renderItemIcon={!noIcons ? this.renderItemIcon : null}
          borderColor='#03a9f4'
          backgroundUpColor='#03a9f4'
          backgroundDownColor='#ccc'
          iconColor='#f00000'
          bottom={70}
          right={20}
          position="bottom-right"
          dimmerStyle={dimmers.dimmer}
          buttonWidth={60}          
          innerWidth={60}
          
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
 
const dimmers = StyleSheet.create({
  dimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 6,
    
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffffdd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
})
export default FabButton;