import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks.js';

const Home = () => {
  const {mediaArray, modifyMedia, deleteMedia} = useMedia(true);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr className="*:p-2 *:outline-1 *:outline-white">
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
            <MediaRow
              key={i}
              item={item}
              setSelectedItem={setSelectedItem}
              modifyMedia={modifyMedia}
              deleteMedia={deleteMedia}
            />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};
export default Home;
