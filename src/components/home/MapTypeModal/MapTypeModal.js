import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';

import Colors from '../../../constants/colors';
import {CustomText} from '../../general/CustomText';

const dimensionHeight = Dimensions.get('window').height;
const dimensionWidth = Dimensions.get('window').width;

const MapTypeModal = ({
  mapTypeVisibility,

  close,

  chooseStreetMapType,
  chooseSatelliteMapType,
  chooseLightMapType,
  chooseDarkMapType,

  streetStyleURL,
  satelliteStyleURL,
  lightStyleURL,
  darkStyleURL,

  styleUrl,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={mapTypeVisibility}
        onRequestClose={close}>
        <View style={styles.chooseMapModal}>
          {/* The header */}
          <View style={styles.mapTypesTitleContainer}>
            <CustomText content={'Map Type'} fontSize={20} />
            <IconButton icon={'window-close'} onPress={close} />
          </View>

          {/*The body */}
          <View style={styles.mapTypesContainers}>
            <View style={styles.mapTypeSingle}>
              <Pressable onPress={chooseStreetMapType}>
                <Image
                  source={require('../../../assets/img/mapThumbnails/street.jpg')}
                  style={[
                    styles.mapThumbnail,
                    {
                      borderColor:
                        styleUrl === streetStyleURL
                          ? Colors.primary
                          : Colors.lightGray,
                    },
                  ]}
                />
              </Pressable>
              <CustomText content={'Street'} />
            </View>

            <View style={styles.mapTypeSingle}>
              <Pressable onPress={chooseDarkMapType}>
                <Image
                  source={require('../../../assets/img/mapThumbnails/dark.jpg')}
                  style={[
                    styles.mapThumbnail,
                    {
                      borderColor:
                        styleUrl === darkStyleURL
                          ? Colors.primary
                          : Colors.lightGray,
                    },
                  ]}
                />
              </Pressable>
              <CustomText content={'Dark'} />
            </View>
            <View style={styles.mapTypeSingle}>
              <Pressable onPress={chooseLightMapType}>
                <Image
                  source={require('../../../assets/img/mapThumbnails/light.jpg')}
                  style={[
                    styles.mapThumbnail,
                    {
                      borderColor:
                        styleUrl === lightStyleURL
                          ? Colors.primary
                          : Colors.lightGray,
                    },
                  ]}
                />
              </Pressable>
              <CustomText content={'Light'} />
            </View>

            <View style={styles.mapTypeSingle}>
              <Pressable onPress={chooseSatelliteMapType}>
                <Image
                  source={require('../../../assets/img/mapThumbnails/satellite.jpg')}
                  style={[
                    styles.mapThumbnail,
                    {
                      borderColor:
                        styleUrl === satelliteStyleURL
                          ? Colors.primary
                          : Colors.lightGray,
                    },
                  ]}
                />
              </Pressable>
              <CustomText content={'Satellite'} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
// Shadow property
const shadow = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

const styles = StyleSheet.create({
  chooseMapModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: dimensionHeight / 3,
    borderRadius: 15,
    paddingBottom: 50,
    margin: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.secondary,
    borderWidth: 1,
    ...shadow,
  },

  mapTypesContainers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  mapTypeSingle: {
    alignItems: 'center',
  },

  mapThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  mapTypesTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
});

export {MapTypeModal};
