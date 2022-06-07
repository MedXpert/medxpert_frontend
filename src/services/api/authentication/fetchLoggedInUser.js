import axios from 'axios';
import { baseUrl } from '../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const url = baseUrl + 'auth/user'

const fetchLoggedInUser = async () => {
    const token = await AsyncStorage.getItem('@accessToken');
    console.log('token', token);
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export { fetchLoggedInUser };
