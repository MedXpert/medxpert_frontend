import axios from 'axios';

const fetchHealthCareFacilities = async () => {
  try {
    const res = await axios.get('/api/healthCareFacilities');
    const data = res.data.healthCareFacilities;
    return data;
  } catch (err) {
    console.warn(err);
  }
};

export {fetchHealthCareFacilities};
