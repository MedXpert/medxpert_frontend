import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
  Platform,
  Linking
} from 'react-native';
import ContentLoader, {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';
import StarRating from 'react-native-star-rating';
import { CustomButton } from '../../../../components/general/CustomButton';
import Colors from '../../../../constants/colors';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconFontAws from 'react-native-vector-icons/FontAwesome5';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import { useLoggedInUser } from "../../../../hooks/authentication"
import { CustomText } from '../../../../components/general/CustomText';
import { BackButton } from '../../../../components/general/BackButton';
import { useHealthCareFacility } from '../../../../hooks/healthCareFacility';
import Spinner from 'react-native-spinkit';

const ImageItem = ({ image, onPress }) => (
  <Pressable onPress={onPress} key={image}>
    <View>
      <Image source={image} style={styles.imageItem} resizeMethod="scale" />
    </View>
  </Pressable>
);

const dimensionsWidth = Dimensions.get('window').width;
const dimensionsHeight = Dimensions.get('window').height;

const Details = ({ route, navigation }) => {
  const healthCareFacilityId = route.params.id;
  const travelDistance = route.params.travelDistance;
  const { data, isError, isLoading, isSuccess } =
    useHealthCareFacility(healthCareFacilityId);

  const loggedInUser = useLoggedInUser();

  const defaultPicture = 'https://i.ibb.co/xHswhnT/Default-Cover.png'
  const [selectedImage, setSelectedImage] = useState();
  const [imageModalVisible, setImageModalVisible] = useState(false);


  const travelTime = (walk = True) => {
    const averageWalkingSpeed = 1.56464 // in m/s
    const averageCarSpeed = 8.33333 // in m/s 30 km/h

    const travelTimeWalking = Number(travelDistance) / averageWalkingSpeed;
    const travelTimeInWalkingHours = travelTimeWalking / 60 / 60;
    const travelTimeInWalkingMinutes = travelTimeWalking / 60;

    const travelTimeCar = Number(travelDistance) / averageCarSpeed;
    const travelTimeInCarHours = travelTimeCar / 60 / 60;
    const travelTimeInCarMinutes = travelTimeCar / 60;

    if (walk) {
      if (travelTimeInWalkingHours < 1) {
        return `${Math.round(travelTimeInWalkingMinutes)} min`;
      } else {
        return `${Math.round(travelTimeInWalkingHours)} h`;
      }
    }
    else {
      if (travelTimeInWalkingHours < 1) {
        return `${Math.round(travelTimeInCarMinutes)} min`;
      } else {
        return `${Math.round(travelTimeInCarHours)} h`;
      }
    }
  }

  const makeACall = (phone) => {
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    }
    else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.openURL(phoneNumber);
  }

  const renderItem = ({ item }) => (
    <ImageItem
      key={item}
      image={{ uri: item }}
      onPress={() => {
        setSelectedImage(item);
      }}
    />
  );

  // navigate to ClaimRequest page when claim button is clicked
  const claimHCF = () => {
    // navigate to claim request page
    navigation.navigate('ClaimRequest', { id: healthCareFacilityId });
  };

  if(isSuccess && loggedInUser.isSuccess) {
    console.log(data.owner, loggedInUser.data.data)
  }

  return (
    <View style={styles.container}>
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
          <Modal visible={imageModalVisible}>
            <View style={styles.modalFullScreen}>
              <Pressable
                onPress={() => setImageModalVisible(false)}
                style={styles.modalCloseTag}>
                <IconIon name="ios-close" size={50} color={Colors.primary} />
              </Pressable>
              <Image
                source={
                  {
                    uri: data.imageGallaryLinks[0] || defaultPicture,
                  }

                }
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
                source={{ uri: data.imageGallaryLinks[0] || defaultPicture }}
                resizeMode="cover"
                style={styles.imageBackground}
              />
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText
                  fontSize={26}
                  customStyles={styles.bold}
                  content={data.name}
                  customStyle={styles.marginRight5}
                />
                {(data.verificationIndexPer10 === 5) ?
                  (<IconFontAws name="check" size={20} color={Colors.primary} />) :
                  data.verificationIndexPer10 == 10 ?
                    (<IconFontAws name="check-double" size={20} color={Colors.primary} />) :
                    (null)
                }
              </View>
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
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <IconFeather name="phone" size={15} color={Colors.primary} />
                {data.phoneNumbers && data.phoneNumbers.map((phone, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomText
                      customStyles={styles.open}
                      fontColor={Colors.gray}
                      content={phone}
                    />
                    {index !== data.phoneNumbers.length - 1 && (<IconEntypo name="dot-single" size={20} color={Colors.primary} />)}
                  </View>
                ))}
              </View>
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
                  <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                    <IconFontAws name="walking" size={14} color={Colors.primary} />
                    <CustomText
                      content={travelTime(true)}
                      fontColor={Colors.gray}
                      customStyles={[styles.marginLeft5, styles.marginRight5]}
                    />
                    <IconFontAws name="car-alt" size={16} color={Colors.primary} />
                    <CustomText
                      content={travelTime(false)}
                      fontColor={Colors.gray}
                      customStyles={styles.marginLeft5}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.overview}>
                <CustomText
                  content="Overview"
                  customStyles={styles.typeAndTravelElement}
                />
                <CustomText
                  content={data.description || `Hello there, ${data.name} is ${travelDistance} away from you.it will take you ${travelTime(true)} to walk there and ${travelTime(false)} to drive there. To continue, click the direction button and navigate using the map to get to them.`}
                  fontColor={Colors.gray}
                  fontSize={14}
                  customStyles={{ textAlign: 'justify' }}
                />
              </View>

              <View style={styles.buttons}>
                <CustomButton
                  title="Direction"
                  fontSize={13}
                  width={"40%"}
                  height={45}
                  customStyle={[styles.buttonStyle, styles.grayButtons]}
                  icon={
                    <IconEntypo
                      name="direction"
                      size={20}
                      color={Colors.dark}
                    />
                  }
                />

                {loggedInUser.isSuccess && data.owner === null ? (<CustomButton
                  title="Claim"
                  fontSize={13}
                  width={"40%"}
                  height={45}
                  customStyle={styles.buttonStyle}
                  onPress={claimHCF}
                  icon={
                    <IconEntypo
                      name="hand"
                      size={20}
                      color={Colors.dark}
                    />
                  }
                />) : (
                  <CustomButton
                    title={data.owner === loggedInUser.data.data.user.id ? "Owned By You" : "Claimed"}
                    fontSize={13}
                    disabled={true}
                    width={"40%"}
                    height={45}
                    customStyle={[styles.buttonStyle, styles.grayButtons]}
                    icon={
                      <IconEntypo
                        name="hand"
                        size={20}
                        color={Colors.dark}
                      />
                    }
                  />
                )}
              </View>
            </View>
          </View>
          <FlatList
            data={data.imageGallaryLinks[0] ? data.imageGallaryLinks : [defaultPicture]}
            renderItem={renderItem}
            keyExtractor={image => image}
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
  claimButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
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
  modalCloseTag: { position: 'absolute', top: 20, right: 20 },
  modalImage: { width: '100%', height: 400 },
  mainContainer: { paddingTop: 50, paddingLeft: 14, paddingRight: 35 },
  bold: { fontWeight: 'bold' },
  location: { flexDirection: 'row', marginVertical: 5 },
  marginLeft5: { marginLeft: 5 },
  marginRight5: { marginRight: 5 },
  stars: { width: 150, marginBottom: 5 },
  open: { fontSize: 14, marginTop: 5 },
  typeAndTravel: {
    marginTop: 10,
    flexDirection: 'row',
  },
  type: { flexDirection: 'column', marginRight: 120 },
  travel: { flexDirection: 'column' },
  typeTravelElement: { fontWeight: 'bold', marginBottom: 5 },
  overview: { flexDirection: 'column', marginTop: 8 },
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

export default Details;
