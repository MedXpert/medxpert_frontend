import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../constants/api";

const httpClient = axios.create({
    baseURL: baseUrl,
});

httpClient.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem('@accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default httpClient;