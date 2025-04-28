import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useState} from 'react';
import EditDialog from './EditDialog';

const MediaRow = (props) => {
  const {item, setSelectedItem} = props;
  const {user} = useUserContext();
  const [visible, setVisible] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const result = await props.deleteMedia(item.media_id, token);
    if (result) setVisible(false);
  };

  const handleModify = () => {
    setShowEdit(!showEdit);
  };

  if (!visible) return;

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
            {showEdit && (
              <EditDialog
                item={item}
                modifyMedia={props.modifyMedia}
                onClose={() => setShowEdit(false)}
              />
            )}
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
