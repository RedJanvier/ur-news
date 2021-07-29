import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ChangeProfile.css';
import Modal from '../Modal/Modal';
import { BASE_URL } from '../../constants';
import Spinner from '../Spinner/Spinner';
import { GlobalContext } from '../../context/GlobalState';

const ChangeProfile = () => {
  const [img, setImg] = useState('');
  const { regNumber } = useParams();
  const [imgUrl, setImgUrl] = useState(
    'https://res.cloudinary.com/redjanvier/image/upload/v1592564639/blank-profile-picture-973460_640_l3acum.png'
  );
  const editBtn = <FontAwesomeIcon icon={faPencilAlt} />;
  const [loading, setLoading] = useState(false);
  const { token } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/api/v1/users/${regNumber}`);
      const { success, data } = await res.json();
      console.log(data);

      if (success) {
        setImgUrl(data.image);
      }
    })();
  }, []);

  const handleFileSelect = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImg(file);
      setImgUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append('img', img);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        method: 'POST',
      };

      const res = await fetch(`${BASE_URL}/api/v1/users/profile`, config);
      const response = await res.json();
      if (response.success) history.push('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='profile'>
      {imgUrl && (
        <div className='profile-preview'>
          <img src={imgUrl} alt='current-profile' />
        </div>
      )}
      <div className='edit-btn'>{editBtn}</div>
      <Modal title='Update Profile Picture'>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='file'
              accept='image/jpeg'
              onChange={handleFileSelect}
            />
          </div>
          <div className='form-control'>
            <button type='submit' className='btn'>
              {!loading ? 'Update' : <Spinner />}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ChangeProfile;
