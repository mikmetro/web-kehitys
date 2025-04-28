import {useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import {useLike} from '../hooks/apiHooks';
import {useState} from 'react';

const Single = () => {
  const {state} = useLocation();
  const item = state.item;
  const navigate = useNavigate();

  return (
    // TODO: Add JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
    <>
      {item && (
        <div>
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer rounded bg-red-500 p-2"
          >
            Close
          </button>
          {item.media_type.includes('video') ? (
            <video src={item.filename} controls></video>
          ) : (
            <img src={item.filename} alt={item.title} />
          )}
          <h3>Title: {item.title}</h3>
          <p>{item.description}</p>
          <Likes id={item.media_id} />
        </div>
      )}
    </>
  );
};

Single.propTypes = {};

export default Single;
