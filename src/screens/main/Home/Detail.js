import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  Text,
} from 'react-native';
import {CustomButton} from '../../../components/general/CustomButton';
import Colors from '../../../constants/colors';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import {CustomText} from '../../../components/general/CustomText';

const ImageItem = ({image, onPress}) => (
  <Pressable onPress={onPress}>
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
      }}>
      <Image source={image} style={styles.imageItem} resizeMethod="scale" />
    </View>
  </Pressable>
);

const Detail = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(facility.images[0]);
  const [imageModalVisible, setImageModalVisible] = useState(false);

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
      <Modal visible={imageModalVisible}>
        <View style={styles.modalFullScreen}>
          <Pressable
            onPress={() => setImageModalVisible(false)}
            style={styles.modalCloseTag}>
            <IconIon name="ios-close" size={50} color={Colors.primary} />
          </Pressable>
          <Image
            source={selectedImage}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
      <View style={styles.head}>
        <Pressable
          style={{width: '100%', height: '100%'}}
          onPress={() => {
            setImageModalVisible(true);
          }}>
          <Image
            source={selectedImage}
            resizeMode="cover"
            style={styles.imageBackground}
          />
        </Pressable>
        <CustomButton
          title=""
          customStyle={styles.backButton}
          icon={<IconIon name="chevron-back" size={40} color={Colors.white} />}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.main}>
        <View style={{paddingTop: 70, paddingHorizontal: 14}}>
          <CustomText
            style={{fontSize: 25, color: Colors.dark, fontWeight: '900'}}
            content={facility.name}
          />
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <IconEntypo name="location-pin" size={20} color={Colors.primary} />
            <CustomText
              style={{color: Colors.dark, marginLeft: 4}}
              content="6 kilo , Addis Ababa, Ethiopia"
            />
          </View>
          <CustomText
            style={{color: Colors.dark, fontSize: 16}}
            content="Open 24 Hour"
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'column', marginRight: 120}}>
              <CustomText content="Type" />
              <CustomText
                customStyles={{fontWeight: 'bold'}}
                content={facility.type}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <CustomText content="Travel Time" />
              <CustomText
                customStyles={{fontWeight: 'bold'}}
                content={facility.travelTime}
              />
            </View>
          </View>

          <View style={{flexDirection: 'column', marginTop: 10}}>
            <CustomText content="Overview" />
            <CustomText content={facility.description} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <CustomButton
              title="Direction"
              width={130}
              customStyle={{borderRadius: 20, paddingHorizontal: 10}}
              icon={
                <IconEntypo name="direction" size={25} color={Colors.dark} />
              }
            />

            <CustomButton
              title="Call"
              width={100}
              fontColor={Colors.lightGray}
              customStyle={{
                borderRadius: 20,
                backgroundColor: Colors.secondary,
                borderColor: Colors.lightGray,
                borderWidth: 1,
                paddingHorizontal: 10,
              }}
              icon={
                <IconFeather name="phone" size={22} color={Colors.lightGray} />
              }
            />
            <CustomButton
              title="Message"
              width={120}
              fontColor={Colors.gray}
              customStyle={{
                borderRadius: 20,
                backgroundColor: Colors.secondary,
                borderColor: Colors.lightGray,
                borderWidth: 1,
              }}
              icon={
                <IconEntypo name="message" size={30} color={Colors.lightGray} />
              }
            />
          </View>
        </View>
      </View>
      <FlatList
        data={facility.images}
        renderItem={renderItem}
        keyExtractor={image => image.id}
        horizontal={true}
        style={styles.imageItemsFlatList}
      />
    </View>
  );
};

// create a style react native
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1, flexDirection: 'column'},
  head: {flex: 1, flexWrap: 'wrap'},
  imageBackground: {width: '100%', height: '100%'},
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    top: 29,
    left: 14,
  },
  imageItem: {width: 100, height: 90, borderRadius: 10, marginRight: 14},
  imageItemsFlatList: {position: 'absolute', width: '100%', top: 220, left: 10},
  main: {
    flex: 2,
  },
  modalFullScreen: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },

  modalCloseTag: {position: 'absolute', top: 20, right: 20},
  modalImage: {width: '100%', height: 400},
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
  type: 'clinic',
  availability: 'Open 24 hours',
};

export default Detail;
