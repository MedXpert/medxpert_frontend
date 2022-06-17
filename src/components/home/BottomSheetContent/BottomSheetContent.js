import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import ContentLoader from 'react-native-easy-content-loader';
import StarRating from 'react-native-star-rating';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-spinkit';
import { getDistance } from 'geolib';
import { CustomText } from '../../general/CustomText';
import Colors from '../../../constants/colors';
import colors from '../../../constants/colors';
import { useFetchNearByHealthCareFacilities } from '../../../hooks/healthCareFacility';

const dimensionHeight = Dimensions.get('window').height;
const dimensionWidth = Dimensions.get('window').width;

const BottomSheetContent = ({ navigation, currentLocation }) => {
  const { data, isSuccess, isError, isLoading, status } =
    useFetchNearByHealthCareFacilities({
      location: currentLocation,
      limit: 10,
    });

  const getGPSFromString = (coordinate) => {
    return coordinate.substring(17, coordinate.length - 1).split(' ').map((item) => parseFloat(item));
  }

  const getDistanceFromGPS = (coordinateString) => {
    const coordinate = getGPSFromString(coordinateString);
    const current = currentLocation.split(',')
    const distance =  getDistance(
        { latitude: current[0], longitude: current[1] },
        { latitude: coordinate[0], longitude: coordinate[1]},
      );
    return distance > 1000 ? `${(distance / 1000).toFixed(2)} km` : `${distance} m`;; 
    
  }


  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // function that accept a string and remove ( and ) from it

  const defaultImages = [
    "https://img.freepik.com/free-vector/people-sitting-hospital-corridor-waiting-doctor-patient-clinic-visit-flat-vector-illustration-medicine-healthcare_74855-8507.jpg?t=st=1655415452~exp=1655416052~hmac=e9094a9b543a6f45c6da38e78c8eba78a2ef625b3756da3fc351441c5171861f&w=996",
    "https://img.freepik.com/free-vector/female-patient-doctor-office_74855-6460.jpg?t=st=1655406523~exp=1655407123~hmac=4e44c16a76835cff3e7cbb3fa7c4b8ff0197ee219f3d44a17ac2e16b4aa86f98&w=1060",
    "https://img.freepik.com/free-vector/patients-doctors-meeting-waiting-clinic-hall-hospital-interior-illustration-with-reception-person-wheelchair-visiting-doctor-office-medical-examination-consultation_74855-8496.jpg?t=st=1655415452~exp=1655416052~hmac=8c0f64f992b253b50d1bae27ab47c60f73036e218cbd29ac39fce90d4e18598d&w=1060",
    "https://img.freepik.com/free-vector/city-hospital-building_74855-6301.jpg?t=st=1655415452~exp=1655416052~hmac=5ad0840af4b1dbea2ca6e7a99ec4a3734a8ab14af9c43586e81e3affdb1c5f7c&w=1060"
  ]

  // Render Health Facilities function
  const renderHealthFacilities = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Details', { id: item.id });
        }}>
        <View style={styles.renderContainer}>
          {/* Card Image */}
          <View style={styles.renderContainerImage}>
            <Image source={{ uri: (item.imageGallaryLinks.length == 0) ? defaultImages[randomIntFromInterval(0, defaultImages.length - 1)] : item.imageGallaryLinks[0] }} style={styles.cardImage} />
          </View>

          {/* Card Content */}
          <View style={styles.renderContainerContent}>
            {/* Health facility name */}
            <CustomText
              fontColor={colors.primary}
              fontSize={14}
              content={item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
              customStyles={{ fontWeight: '900' }}
            />

            {/* Address  */}
            <View style={styles.address}>
              <IconEntypo
                name="location-pin"
                size={20}
                color={Colors.primary}
              />
              <CustomText
                customStyles={styles.marginLeft}
                content={item.address.substring(0, 24) + "..."}
                fontSize={11}
              />
            </View>

            {/* Type, Distance, Rating */}
            <View style={styles.typeDistanceRating}>
              <View style={styles.typeDistanceRatingInner}>
                <CustomText
                  content={item.facility_type}
                  fontSize={12}
                  fontColor={Colors.gray}
                />
                <IconEntypo name="dot-single" size={18} color={colors.gray} />
                <IconIon
                  name="car-outline"
                  style={{ marginRight: 5 }}
                  size={15}
                  color={colors.gray}
                />
                <CustomText
                  content={getDistanceFromGPS(item.GPSCoordinates)}
                  fontSize={11}
                  color={colors.gray}
                />
              </View>

              {/* Rating */}
              <View style={styles.ratingInner}>
                <StarRating
                  disabled={false}
                  maxStars={1}
                  rating={1}
                  starSize={13}
                  fullStarColor={Colors.golden}
                />
                <CustomText
                  content={item.averageRating || 0}
                  customStyles={styles.textStyle}
                  fontColor={colors.gray}
                  fontSize={10}
                />
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.contentContainer}>
      <CustomText
        content={'Nearby Health Facilities'}
        customStyles={{ fontWeight: '900', marginLeft: 10, marginBottom: 5 }}
        fontSize={20}
      />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <Spinner
            isVisible
            color={colors.primary}
            size={50}
            type="ThreeBounce"
            style={styles.appointmentsSpinner}
          />
        </View>
      )}
      {isSuccess && (
        <FlatList
          data={data.data.data}
          horizontal
          renderItem={renderHealthFacilities}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    marginTop: 5,
  },
  loaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  address: { flexDirection: 'row', marginTop: 5, marginLeft: -3 },
  renderContainer: {
    backgroundColor: colors.secondary,
    minHeight: 200,
    width: dimensionWidth / 2 - 10,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    elevation: 5,
  },
  renderContainerImage: {
    flex: 1.5,
  },
  renderContainerContent: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textStyle: {
    marginLeft: 5,
  },
  typeDistanceRating: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  typeDistanceRatingInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 12,
    flex: 1,
  },
  ratingInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { BottomSheetContent };
