import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useMedia} from '../hooks/apiHooks';

const MediaRow = (props) => {
  const {item, setSelectedItem} = props;
  const {user} = useUserContext();

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await props.deleteMedia(item.media_id, token);
    window.location.reload();
  };

  const handleModify = () => {
    console.log('asdsa');
  };

  return (
    <tr
      key={item.media_id}
      className="text-center *:p-2 *:outline-1 *:outline-white"
    >
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-32 w-32 object-cover"
        />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.username}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <Link
          to="/single"
          state={{item}}
          className="bg-stone-700 p-2 hover:bg-stone-900"
        >
          Show
        </Link>
        {(item.username === user?.username || user?.level_name === 'Admin') && (
          <>
            <button
              className="bg-stone-700 p-2 hover:bg-stone-900"
              onClick={handleModify}
            >
              Modify
            </button>
            <button
              className="bg-stone-700 p-2 hover:bg-stone-900"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setMediaItem: PropTypes.func.isRequired,
};

export default MediaRow;
