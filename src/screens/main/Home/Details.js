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
  Dimensions,
} from 'react-native';
import ContentLoader, {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';
import StarRating from 'react-native-star-rating';
import {CustomButton} from '../../../components/general/CustomButton';
import Colors from '../../../constants/colors';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CustomText} from '../../../components/general/CustomText';
import {BackButton} from '../../../components/general/BackButton';
import {useHealthCareFacility} from '../../../hooks/healthCareFacility';
import Spinner from 'react-native-spinkit';

const ImageItem = ({image, onPress}) => (
  <Pressable onPress={onPress}>
    <View>
      <Image source={image} style={styles.imageItem} resizeMethod="scale" />
    </View>
  </Pressable>
);

const dimensionsWidth = Dimensions.get('window').width;
const dimensionsHeight = Dimensions.get('window').height;

const Details = ({route, navigation}) => {
  const healthCareFacilityId = route.params.id;
  const {data, isError, isLoading, isSuccess} =
    useHealthCareFacility(healthCareFacilityId);

  if(isSuccess) {
    console.log(data);
  }

  const [selectedImage, setSelectedImage] = useState();
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
          {/* <Image
            source={
              selectedImage ? selectedImage : isSuccess ? data.images[0] : null
            }
            style={styles.modalImage}
            resizeMode="contain"
          /> */}
        </View>
      </Modal>
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <Spinner
            isVisible
            color={Colors.primary}
            size={70}
            type="WanderingCubes"
            style={styles.appointmentsSpinner}
          />
        </View>
      )}
      {isSuccess && (
        <>
          <View style={styles.head}>
            <Pressable
              style={styles.imageBackground}
              onPress={() => {
                setImageModalVisible(true);
              }}>
              {/* <Image
                source={selectedImage ? selectedImage : data.images[0]}
                resizeMode="cover"
                style={styles.imageBackground}
              /> */}
            </Pressable>
            {/* <CustomButton
          title=""
          customStyle={styles.backButton}
          icon={<IconIon name="chevron-back" size={40} color={Colors.white} />}
          onPress={() => navigation.goBack()}
        /> */}
            <View style={styles.backButton}>
              <BackButton
                backgroundColor={Colors.primary}
                size={40}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
          </View>
          <View style={styles.main}>
            <View style={styles.mainContainer}>
              <CustomText
                fontSize={30}
                customStyles={styles.bold}
                content={data.name}
              />
              <View style={styles.location}>
                <IconEntypo
                  name="location-pin"
                  size={20}
                  color={Colors.primary}
                />
                <CustomText
                  customStyles={styles.marginLeft5}
                  content={data.address}
                />
              </View>
              <View style={styles.stars}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={data.averageRating}
                  starSize={25}
                  fullStarColor={Colors.golden}
                />
              </View>
              <CustomText
                customStyles={styles.open}
                fontColor={Colors.gray}
                content={data.phoneNumbers[0]}
              />
              <View style={styles.typeAndTravel}>
                <View style={styles.type}>
                  <CustomText
                    content="Type"
                    customStyles={styles.typeTravelElement}
                  />
                  <CustomText content={data.facility_type} fontColor={Colors.gray} />
                </View>
                <View style={styles.travel}>
                  <CustomText
                    content="Travel Time"
                    customStyles={styles.typeTravelElement}
                  />
                  <CustomText
                    content={data.services}
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
                  content={data.description}
                  fontColor={Colors.gray}
                  fontSize={12}
                />
              </View>

              <View style={styles.buttons}>
                <CustomButton
                  title="Direction"
                  fontSize={13}
                  width={110}
                  height={45}
                  customStyle={styles.buttonStyle}
                  icon={
                    <IconEntypo
                      name="direction"
                      size={20}
                      color={Colors.dark}
                    />
                  }
                />

                <CustomButton
                  title="Appointment"
                  fontSize={13}
                  width={140}
                  height={45}
                  fontColor={Colors.lightGray}
                  customStyle={[styles.buttonStyle, styles.grayButtons]}
                  icon={
                    <MaterialIcons
                      name="schedule"
                      size={20}
                      color={Colors.lightGray}
                    />
                  }
                  onPress={() => {
                    navigation.navigate('Appointment', {
                      hcfId: isSuccess ? data.id : false,
                    });
                  }}
                />

                <CustomButton
                  title="Call"
                  fontSize={13}
                  width={100}
                  height={45}
                  fontColor={Colors.lightGray}
                  customStyle={[styles.buttonStyle, styles.grayButtons]}
                  icon={
                    <IconEntypo
                      name="phone"
                      size={20}
                      color={Colors.lightGray}
                    />
                  }
                />
              </View>
            </View>
          </View>

          <FlatList
            data={data.images}
            renderItem={renderItem}
            keyExtractor={image => image.id}
            horizontal={true}
            style={styles.imageItemsFlatList}
          />
        </>
      )}
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
  head: {
    flex: 1,
    flexWrap: 'wrap',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 29,
    left: 14,
  },
  imageItem: {
    width: 100,
    height: 90,
    borderRadius: 10,
    marginRight: 14,
  },
  imageItemsFlatList: {
    position: 'absolute',
    width: '100%',
    top: 220,
    left: 10,
  },
  loadingContainer: {
    alignItems: 'center',
  },
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
  },
  grayButtons: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

// const healthFacilities = [
//   {
//     name: 'Yekatit 12 Hospital',
//     images: [
//       {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
//       {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
//       {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
//       {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
//       {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
//     ],
//     id: 1,
//     address: '6 kilo , Addis Ababa, Ethiopia',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     street: '123 Main Street',
//     travelTime: '5 min',
//     rating: 4.5,
//     type: 'clinic',
//     availability: 'Open 24 hours',
//   },
//   {
//     name: 'Zewditu Hospital',
//     images: [{id: 1, uri: 'https://mapio.net/images-p/2347273.jpg'}],
//     id: 7,
//     address: '6 kilo , Addis Ababa, Ethiopia',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     street: '123 Main Street',
//     travelTime: '30 min',
//     rating: 4,
//     type: 'Hospital',
//     availability: 'Open 24 hours',
//   },
//   {
//     name: 'Tikur Anbesa Hospital',
//     images: [
//       {id: 1, uri: 'https://mapio.net/images-p/17493410.jpg'},
//       {id: 2, uri: 'https://mapio.net/images-p/3638281.jpg'},
//     ],
//     id: 2,
//     address: 'Senga tera',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     street: 'Senga tera Street',
//     travelTime: '1 hr',
//     rating: 4.8,
//     type: 'Hospital',
//     availability: 'Open 24 hours',
//   },
//   {
//     name: 'Yekatit 12 Hospital',
//     images: [
//       {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
//       {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
//       {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
//       {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
//       {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
//     ],
//     id: 6,
//     address: '6 kilo , Addis Ababa, Ethiopia',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     street: '123 Main Street',
//     travelTime: '5 min',
//     rating: 4.5,
//     type: 'clinic',
//     availability: 'Open 24 hours',
//   },
// ];

export default Details;
