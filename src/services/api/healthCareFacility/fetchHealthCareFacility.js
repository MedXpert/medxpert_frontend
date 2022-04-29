import axios from 'axios';

const fetchHealthCareFacility = async id => {
  try {
    const res = await axios.get(`/api/healthCareFacilities/${id}`);
    const data = res.data;

    return data;
  } catch (error) {
    console.warn(error);
  }
};

export {fetchHealthCareFacility};
