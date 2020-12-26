import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from "dayjs";
import logger from "./logger";


const prefix = 'cache';
const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now()
        }
        await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
    } catch (e) {
        logger.log(e);
    }
}

const isExpired = (item) => {
    const now = dayjs();
    const storedTime = dayjs(item.timestamp);
    return now.diff(storedTime, 'minute') > 5;
}

const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value);
        if (!item) return null;

        if (isExpired(item)) {
            //command query separation(CQS)
            AsyncStorage.removeItem(prefix + key);
            return null;
        }

        return item.value;
    } catch (e) {
        console.log(e);
    }

}
export default {
    store
}