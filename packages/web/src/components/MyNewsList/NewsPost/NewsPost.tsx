import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './NewsPost.css';
import Tag from '../../shared/Tag';

const NewsPost = ({
  title,
  _id,
  img,
  target,
  targetType,
  description,
  confirmNewsDelete,
  mine = true,
}) => {
  const deleteBtn = <FontAwesomeIcon icon={faTrashAlt} />;
  const editBtn = <FontAwesomeIcon icon={faPencilAlt} />;

  return (
    <div className='news-post'>
      {mine && (
        <div className='on-mine'>
          <ul className='news-post__controls'>
            <li>
              <Link to={`/post/edit/${_id}`}>{editBtn}</Link>
            </li>
            <li>
              <button onClick={() => confirmNewsDelete(_id)}>
                {deleteBtn}
              </button>
            </li>
          </ul>
          <div className='news-post__tags'>
            <Tag type={targetType}>{target}</Tag>
          </div>
        </div>
      )}
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
    </div>
  );
};

export default NewsPost;
