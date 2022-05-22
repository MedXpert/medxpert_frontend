import React, {useState, useRef} from 'react';
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
import StarRating from 'react-native-star-rating';
import {CustomButton} from '../../../../components/general/CustomButton';
import Colors from '../../../../constants/colors';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CustomText} from '../../../../components/general/CustomText';
import {BackButton} from '../../../../components/general/BackButton';
import {useHealthCareFacility} from '../../../../hooks/healthCareFacility';
import Spinner from 'react-native-spinkit';
import colors from '../../../../constants/colors';

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
  const {data, isError, isLoading, isSuccess} = useHealthCareFacility(1);

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

  // navigate to ClaimRequest page when claim button is clicked
  const claimHCF = () => {
    // navigate to claim request page
    navigation.navigate('ClaimRequest');
  };

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
            source={
              selectedImage ? selectedImage : isSuccess ? data.images[0] : null
            }
            style={styles.modalImage}
            resizeMode="contain"
          />
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
              <Image
                source={selectedImage ? selectedImage : data.images[0]}
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
                content={data.availability}
              />
              <View style={styles.typeAndTravel}>
                <View style={styles.type}>
                  <CustomText
                    content="Type"
                    customStyles={styles.typeTravelElement}
                  />
                  <CustomText content={data.type} fontColor={Colors.gray} />
                </View>
                <View style={styles.travel}>
                  <CustomText
                    content="Travel Time"
                    customStyles={styles.typeTravelElement}
                  />
                  <CustomText
                    content={data.travelTime}
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

              <View style={styles.claimButton}>
                {data.verificationStatus && (
                  <CustomButton
                    title={'Claimed'}
                    width={250}
                    height={50}
                    backgroundColor={colors.gray}
                    fontColor={colors.lightGray}
                    disabled={true}
                  />
                )}
                {!data.verificationStatus && (
                  <CustomButton
                    title={'Claim'}
                    width={250}
                    height={50}
                    backgroundColor={colors.primary}
                    fontColor={colors.white}
                    onPress={claimHCF}
                  />
                )}
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
  claimButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
