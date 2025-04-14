import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media'
      );

      // const userIds = mediaData.map(({user_id}) => user_id);

      const authApiUrl = import.meta.env.VITE_AUTH_API;
      const newData = await Promise.all(
        mediaData.map(async (item) => {
          const data = await fetchData(`${authApiUrl}/users/${item.user_id}`);
          return {...item, username: data.username};
        })
      );
      console.log('usersdata', newData);

      setMediaArray(newData);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return mediaArray;
};

export default useMedia;
