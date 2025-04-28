import {useEffect, useState, useCallback} from 'react';
import {useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';
import {FaHeart, FaRegHeart} from 'react-icons/fa6';

const Likes = ({id}) => {
  const {getLikesByMediaId, postLike, deleteLike} = useLike();
  const [userLike, setUserLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const {user} = useUserContext();

  const getLikes = useCallback(async () => {
    const data = await getLikesByMediaId(id);
    console.log(data);
    setLikes(data);
  }, [id, getLikesByMediaId]);

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  useEffect(() => {
    setUserLike(likes.find((i) => i.user_id === user.user_id));
  }, [likes]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const likeResult = await postLike(id, token);
    } catch {
      const deleteLikeResult = await deleteLike(userLike.like_id, token);
    }
    getLikes();
  };

  return (
    <button
      type="button"
      className="my-2 flex cursor-pointer items-center gap-2 rounded border-2 border-red-500 p-2 text-xl"
      onClick={handleLike}
    >
      {userLike ? <FaHeart /> : <FaRegHeart />} {likes.length} tykkäystä
    </button>
  );
};

export default Likes;
