import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate-html';
import './NewsPost.css';

// interface IUser {
//   _id: string;
//   name: string;
//   regNumber: any;
//   email: string;
//   department: string;
//   school: string;
//   field: string;
//   campus: string;
//   image?: string;
// }

interface IAuthor {
  _id?: string;
  name: string;
  regNumber?: any;
  email?: string;
  department?: string;
  school?: string;
  field?: string;
  campus?: string;
  image: string;
}

const NewsPost = ({ title, _id, creator, img, description, time }) => {
  const [{ name, image: userImage }, setAuthor] = useState<IAuthor>({
    name: '',
    image: '',
  });
  useEffect(() => setAuthor(creator), [setAuthor, creator]);

  return (
    <div className='news-post'>
      <Link to={`/post/${_id}`}>
        <div className='news-post__body'>
          {img && (
            <div className='news-post__header'>
              <img src={img} alt={`post-hero-${_id}`} />
            </div>
          )}
          <section className='body'>
            <h2 className='title'>{title}</h2>
            <Truncate
              lines={img ? 2 : 4}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </section>
        </div>
      </Link>
      <Link to={`/post/${_id}`}>
        <div className='news-post__footer'>
          <div className='author-img'>
            <img src={userImage} alt={`auhor-hero-${_id}`} />
          </div>
          <div className='author-info'>
            <h4>{name}</h4>
            <p>{moment(time).fromNow()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsPost;
