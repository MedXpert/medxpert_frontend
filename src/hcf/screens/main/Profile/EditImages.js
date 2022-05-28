import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useController} from 'react';

import {BackButtonAndText} from '../../../../components/general/BackButtonAndText';
import {IconButton} from 'react-native-paper';
import colors from '../../../../constants/colors';
import {useDerivedValue} from 'react-native-reanimated';
import {CustomButton} from '../../../../components/general/CustomButton';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const EditImages = ({navigation}) => {
  // when delete image icon is pressed
  const onDeleteImage = id => {};

  // when save button is pressed
  const onSaveImages = () => {};

  // Render images from api
  const renderImages = useController(({item}) => {
    return (
      <View style={styles.imageAndClose}>
        <Image
          source={{uri: item.image}}
          resizeMethod="scale"
          resizeMode="cover"
          style={styles.imageStyle}
          loadingIndicatorSource={require('../../../../assets/img/default_load_image.png')}
        />
        <IconButton
          icon="close"
          color={colors.black}
          size={20}
          onPress={() => onDeleteImage(item.id)}
          style={styles.deleteImageButton}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <BackButtonAndText text={'Images'} navigation={navigation} />
      <View style={styles.innerContainer}>
        <View style={styles.plusIcon}>
          <IconButton icon={'plus'} size={30} color={colors.primary} />
        </View>

        <View style={styles.imagesContainer}>
          {/* Display images in flatList */}
          <FlatList
            data={hcfImages}
            renderItem={renderImages}
            numColumns={2}
            horizontal={false}
          />
        </View>
      </View>
      {/* Save button */}
      <CustomButton
        customStyle={styles.saveButton}
        backgroundColor={colors.primary}
        width={120}
        height={40}
        title={'Save'}
        onPress={onSaveImages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.secondary,
  },
  innerContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: height * 0.9,
    paddingBottom: 90,
  },
  plusIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    width: width / 2.3,
    height: height / 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  imagesContainer: {
    paddingBottom: 20,
  },

  imageAndClose: {
    marginRight: 5,
    width: 'auto',
    marginBottom: 10,
  },
  deleteImageButton: {
    position: 'absolute',
    right: 0,
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
});

const hcfImages = [
  {image: 'https://mapio.net/images-p/3638281.jpg'},
  {image: 'https://mapio.net/images-p/3638281.jpg'},
  {image: 'https://mapio.net/images-p/3638281.jpg'},
  {image: 'https://mapio.net/images-p/3638281.jpg'},
  {image: 'https://mapio.net/images-p/3638281.jpg'},
  {image: 'https://mapio.net/images-p/3638281.jpg'},
  {image: 'https://mapio.net/images-p/3638281.jpg'},
  {image: 'https://mapio.net/images-p/3638281.jpg'},
  {image: 'https://mapio.net/images-p/3638281.jpg'},
];

export default EditImages;
