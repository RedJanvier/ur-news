import React, { useState, useContext } from 'react';
import NewsPost from './NewsPost/NewsPost';
import './MyNewsList.css';
import Modal from '../Modal/Modal';
import Toast from '../Toast/Toast';
import { GlobalContext } from '../../context/GlobalState';
import Backdrop from '../Backdrop/Backdrop';

interface INews {
  title: string;
  _id: string;
  img: string;
  target: string;
  targetType: string;
  description: string;
  confirmNewsDelete: string;
  mine?: boolean;
}

interface IProps {
  news: INews[];
}
const NewsList: React.FC<IProps> = ({ news }) => {
  const { pending, deleteNews, error } = useContext(GlobalContext);
  const [toDeleteId, setToDeleteId] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const deletePost = async () => {
    await deleteNews(toDeleteId);
    setShowConfirmDelete(false);
  };
  const showConfirmNewsDelete = (id: string) => {
    setToDeleteId(id);
    setShowConfirmDelete(true);
  };
  return (
    <>
      {error && <Toast text={error} />}
      {news.length <= 0 && (
        <h2 style={{ textAlign: 'center', color: 'white' }}>
          You haven't created any news yet!
        </h2>
      )}
      <div className='news-list'>
        {showConfirmDelete && (
          <>
            <div className='confirmation'>
              <Modal
                title='Are you sure you want to delete the news?'
                confirmable={true}
                disabled={pending}
                onConfirm={deletePost}
                onCancel={() => setShowConfirmDelete(false)}
                cancelable={true}
              />
            </div>
            <Backdrop />
          </>
        )}
        {news.map((single) => (
          <NewsPost
            key={single._id}
            {...single}
            confirmNewsDelete={showConfirmNewsDelete}
          />
        ))}
      </div>
    </>
  );
};

export default NewsList;
