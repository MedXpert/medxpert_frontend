import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {CustomButton} from '../../../components/general/CustomButton';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const ImageItem = ({image, onPress}) => (
  <Pressable onPress={onPress}>
    <Image source={image} style={styles.ImageItem} resizeMethod="scale" />
  </Pressable>
);

const Detail = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(facility.images[0]);
  const renderItem = ({item}) => (
    <ImageItem
      image={item}
      onPress={() => {
        setSelectedImage(item);
      }}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <ImageBackground
          source={selectedImage}
          resizeMode="cover"
          style={styles.imageBackground}>
          <CustomButton
            title=""
            customStyle={styles.backButton}
            icon={<Icon name="chevron-back" size={40} color={Colors.white} />}
            onPress={() => navigation.goBack()}
          />
        </ImageBackground>
      </View>
      <View style={styles.main} />
      <FlatList
        data={facility.images}
        renderItem={renderItem}
        keyExtractor={image => image.id}
        horizontal={true}
        style={styles.ImageItemsFlatList}
      />
    </View>
  );
};

// create a style react native
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1, flexDirection: 'column'},
  head: {backgroundColor: 'blue', flex: 1},
  imageBackground: {width: '100%', height: '100%'},
  backButton: {
    width: 55,
    height: 55,
    borderRadius: 50,
    position: 'absolute',
    top: 29,
    left: 14,
  },
  ImageItem: {width: 100, height: 90, borderRadius: 10, marginRight: 14},
  ImageItemsFlatList: {position: 'absolute', width: '100%', top: 220, left: 10},
  main: {flex: 2},
});

const facility = {
  name: 'Yekatit 12 Hospital',
  images: [
    {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
    {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
    {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
    {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
    {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
  ],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  street: '123 Main Street',
  travelTime: '5 min',
  rating: '4.5',
  availability: 'Open 24 hours',
};

export default Detail;
