import {forModalPresentationIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import {check, RESULTS, request} from 'react-native-permissions';

const requestPermissions = async permission => {
  //Request permission and return one of the values from RESULTS. In this case RESULTS.GRANTED ("granted") | RESULTS.DENIED ("denied") | RESULTS.BLOCKED ("blocked")
  const requestPermission = async permissionInput => {
    try {
      var requestPermissionResult = await request(permissionInput);
      console.log('inside permission request');
    } catch (error) {
      console.log(error);
    }
    switch (requestPermissionResult) {
      case RESULTS.GRANTED:
        console.log('Permission granted inside request requestPermission');
        return RESULTS.GRANTED;
      case RESULTS.DENIED:
        console.log(
          'Permission denied inside requestPermission / maybe blocked',
        );
        return RESULTS.DENIED;
      case RESULTS.BLOCKED:
        console.log(
          'Permission denied inside request Permission / can not be requested',
        );
        return RESULTS.BLOCKED;
    }
  };

  //Check permission status and return one of the values from RESULTS.
  try {
    var CheckResult = await check(permission);
  } catch (error) {
    console.log(error);
  }

  switch (CheckResult) {
    case RESULTS.GRANTED:
      console.log('permission is granted');
      return RESULTS.GRANTED;
    case RESULTS.DENIED:
      console.log('Permission is denied inside check result ');
      const resultFromRequest = await requestPermission(permission); // If permission is denied while checking result, it means it can be requested. thus call the 'requestPermission' function
      return resultFromRequest;
    case RESULTS.BLOCKED:
      console.log('permission is blocked / can not be requested /  ');
      return RESULTS.BLOCKED;
  }
};

export {requestPermissions};
