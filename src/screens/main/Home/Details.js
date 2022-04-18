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
import StarRating from 'react-native-star-rating';
import {CustomButton} from '../../../components/general/CustomButton';
import Colors from '../../../constants/colors';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import {CustomText} from '../../../components/general/CustomText';

const ImageItem = ({image, onPress}) => (
  <Pressable onPress={onPress}>
    <View>
      <Image source={image} style={styles.imageItem} resizeMethod="scale" />
    </View>
  </Pressable>
);

const Details = ({route, navigation}) => {
  const {healthFacility} = route.params;

  const [selectedImage, setSelectedImage] = useState(healthFacility.images[0]);
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
          style={styles.imageBackground}
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
        <View style={styles.mainContainer}>
          <CustomText
            fontSize={30}
            customStyles={styles.bold}
            content={healthFacility.name}
          />
          <View style={styles.location}>
            <IconEntypo name="location-pin" size={20} color={Colors.primary} />
            <CustomText
              customStyles={styles.marginLeft5}
              content={healthFacility.address}
            />
          </View>
          <View style={styles.stars}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={healthFacility.rating}
              starSize={25}
              fullStarColor={Colors.golden}
            />
          </View>
          <CustomText
            customStyles={styles.open}
            fontColor={Colors.gray}
            content={healthFacility.availability}
          />
          <View style={styles.typeAndTravel}>
            <View style={styles.type}>
              <CustomText
                content="Type"
                customStyles={styles.typeTravelElement}
              />
              <CustomText
                content={healthFacility.type}
                fontColor={Colors.gray}
              />
            </View>
            <View style={styles.travel}>
              <CustomText
                content="Travel Time"
                customStyles={styles.typeTravelElement}
              />
              <CustomText
                content={healthFacility.travelTime}
                fontColor={Colors.gray}
              />
            </View>
          </View>

          <View style={styles.overview}>
            <CustomText
              content="Overview"
              customStyles={styles.typeAndTravelElement}
            />
            <CustomText
              content={healthFacility.description}
              fontColor={Colors.gray}
              fontSize={12}
            />
          </View>

          <View style={styles.buttons}>
            <CustomButton
              title="Direction"
              width={140}
              customStyle={styles.buttonStyle}
              icon={
                <IconEntypo name="direction" size={25} color={Colors.dark} />
              }
            />

            <CustomButton
              title="Call"
              width={90}
              fontColor={Colors.lightGray}
              customStyle={[styles.buttonStyle, styles.grayButtons]}
              icon={
                <IconFeather name="phone" size={25} color={Colors.lightGray} />
              }
            />
            <CustomButton
              title="Message"
              width={130}
              fontColor={Colors.lightGray}
              customStyle={[styles.buttonStyle, styles.grayButtons]}
              icon={
                <IconEntypo name="message" size={30} color={Colors.lightGray} />
              }
            />
          </View>
        </View>
      </View>
      <FlatList
        data={healthFacility.images}
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
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    flexDirection: 'column',
  },
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
  mainContainer: {paddingTop: 70, paddingHorizontal: 14},
  bold: {fontWeight: 'bold'},
  location: {flexDirection: 'row', marginVertical: 5},
  marginLeft5: {marginLeft: 5},
  stars: {width: 150, marginBottom: 5},
  open: {fontSize: 16, marginTop: 5},
  typeAndTravel: {
    marginTop: 5,
    flexDirection: 'row',
  },
  type: {flexDirection: 'column', marginRight: 120},
  travel: {flexDirection: 'column'},
  typeTravelElement: {fontWeight: 'bold', marginBottom: 5},
  overview: {flexDirection: 'column', marginTop: 8},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  buttonStyle: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 3,
  },
  grayButtons: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
});

// const facility = {
//   name: 'Yekatit 12 Hospital',
//   images: [
//     {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
//     {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
//     {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
//     {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
//     {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
//   ],
//   description:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   street: '123 Main Street',
//   travelTime: '5 min',
//   rating: '4.5',
//   type: 'clinic',
//   availability: 'Open 24 hours',
// };

export default Details;
