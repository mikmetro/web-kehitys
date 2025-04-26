import PropTypes from 'prop-types';
import {Link} from 'react-router';

const MediaRow = (props) => {
  const {item, setSelectedItem} = props;

  const handleClick = () => {
    setSelectedItem(item);
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
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setMediaItem: PropTypes.func.isRequired,
};

export default MediaRow;
