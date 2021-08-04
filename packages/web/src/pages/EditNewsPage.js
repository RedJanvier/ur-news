/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as locations from '@ur-news/locations';
import CKEditor from '@ckeditor/ckeditor5-react';
import classicEditor from '@ckeditor/ckeditor5-build-classic';
import Toast from '../components/Toast/Toast';
import Modal from '../components/Modal/Modal';
import Spinner from '../components/Spinner/Spinner';
import { GlobalContext } from '../context/GlobalState';

const EditNews = ({
  match: {
    params: { newsId },
  },
}) => {
  const history = useHistory();
  const { news, pending, error, updateNews } = useContext(GlobalContext);
  const [targets, setTargets] = useState([]);
  const [oldNews, setOldNews] = useState({});
  useEffect(() => {
    document.title = 'Edit News';
    setOldNews(news.find((n) => n._id === newsId));
  }, [news, newsId]);

  // const [state, setState] = useState({
  //   addImage: false,
  //   addFile: false,
  // });
  // const [img, setImg] = useState({});
  // const [file, setFile] = useState({});
  // const sendFile = async (file, newsId, name = "file") => {
  //   const body = new FormData();
  //   body.append(name, file);

  //   const config = {
  //     body,
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   const res = await fetch(
  //     `${ BASE_URL}/api/v1/news/${newsId}/${
  //       name === "file" ? name : "image"
  //     }`,
  //     config
  //   );
  //   const { success } = await res.json();

  //   return success;
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateNews(newsId, oldNews);
    success && history.push('/home');
  };

  const handleTargetTypeChange = (e) => {
    const { value } = e.target;

    switch (value) {
      case 'colleges':
        setOldNews({ ...oldNews, targetType: 'campus' });
        break;
      case 'schools':
        setOldNews({ ...oldNews, targetType: 'school' });
        break;
      case 'departments':
        setOldNews({ ...oldNews, targetType: 'department' });
        break;
      case 'combinations':
        setOldNews({ ...oldNews, targetType: 'class' });
        break;
      default:
    }

    let res = [];

    for (const key in locations[value]) {
      if (Object.hasOwnProperty.call(locations[value], key) && key) {
        const element = locations[value][key];

        res = [...res, ...element];
      }
    }

    setTargets(res);
  };

  useEffect(() => {
    switch (oldNews.targetType) {
      case 'campus':
        handleTargetTypeChange({ target: { value: 'colleges' } });
        break;
      case 'school':
        handleTargetTypeChange({ target: { value: 'schools' } });
        break;
      case 'department':
        handleTargetTypeChange({ target: { value: 'departments' } });
        break;
      case 'class':
        handleTargetTypeChange({ target: { value: 'combinations' } });
        break;
      default:
    }
  }, []);

  return (
    <>
      {oldNews && (
        <Modal title='Edit News'>
          {error && <Toast text={error} />}
          <form>
            <div className='form-control'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                name='title'
                value={oldNews.title}
                onChange={(e) =>
                  setOldNews({ ...oldNews, title: e.target.value })
                }
                placeholder='News title'
                required
              />
            </div>
            <div className='form-control'>
              <label htmlFor='description'>Description</label>
              <CKEditor
                data={oldNews.description}
                editor={classicEditor}
                onChange={(_, editor) =>
                  setOldNews({ ...oldNews, description: editor.getData() })
                }
              />
            </div>
            {/* <div className="form-control">
            <label htmlFor="addImage">
              <input
                type="checkbox"
                checked={state.addImage}
                name="addImage"
                onChange={() =>
                  setState({ ...state, addImage: !state.addImage })
                }
                placeholder="News image"
                // required
                disabled
              />
              Add an image?
            </label>
          </div>
          {state.addImage && (
            <div className="form-control">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => setImg(e.target.files[0])}
                placeholder="News image"
                // required
                disabled
              />
            </div>
          )}
          <div className="form-control">
            <label htmlFor="addFile">
              <input
                type="checkbox"
                checked={state.addFile}
                name="addFile"
                onChange={() => setState({ ...state, addFile: !state.addFile })}
                placeholder="News file"
                // required
                disabled
              />
              Add a file?
            </label>
          </div>
          {state.addFile && (
            <div className="form-control">
              <label htmlFor="file">File</label>
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
                placeholder="News file"
                // required
                disabled
              />
            </div>
          )} */}
            <div className='form-control'>
              <select
                name='targetType'
                value={oldNews.targetType}
                onChange={handleTargetTypeChange}
                required
              >
                <option value='' disabled>
                  Select your Audience type
                </option>
                <option value='colleges'>All the campus</option>
                <option value='schools'>Specific school</option>
                <option value='departments'>Specific department</option>
                <option value='combinations'>Specific combination</option>
              </select>
            </div>
            <div className='form-control'>
              <select
                name='target'
                value={oldNews.target}
                onChange={(e) =>
                  setOldNews({ ...oldNews, target: e.target.value })
                }
                required
              >
                <option value='' disabled>
                  Select your Audience
                </option>
                {targets.map((t) => (
                  <option value={t.abbr}>{t.text}</option>
                ))}
              </select>
            </div>
            <div className='form-control'>
              <button
                onClick={handleSubmit}
                className='btn'
                disabled={pending ? 'disabled' : ''}
              >
                {pending ? <Spinner /> : 'Update'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditNews;
