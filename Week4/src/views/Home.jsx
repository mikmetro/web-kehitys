import MediaRow from '../components/MediaRow';
import {useEffect, useState} from 'react';
import SingleView from '../components/SingleView';
import {fetchData} from '../utils/fetchData';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  // Ilman useEffectiä komponentti re-renderaisi joka kerta kun funktio suoritetaan.
  useEffect(() => {
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
    getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item, i) => (
            <MediaRow key={i} item={item} setSelectedItem={setSelectedItem} />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};
export default Home;
