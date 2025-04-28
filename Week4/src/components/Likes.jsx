import {useEffect, useState} from 'react';
import {useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({id}) => {
  const {getLikesByMediaId, postLike, deleteLike} = useLike();
  const [likes, setLikes] = useState([]);
  const {user} = useUserContext();

  const getLikes = async () => {
    const data = await getLikesByMediaId(id);
    console.log(data);
    setLikes(data);
  };

  useEffect(() => {
    getLikes();
  }, []);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const likeResult = await postLike(id, token);
    } catch {
      const likeId = likes.find((i) => i.user_id === user.user_id);
      const deleteLikeResult = await deleteLike(likeId.like_id, token);
    }
    getLikes();
  };

  return (
    <div>
      <button type="button" className="bg-red-500" onClick={handleLike}>
        Like
      </button>
      <p>{likes.length} tykkäystä</p>
    </div>
  );
};

export default Likes;
