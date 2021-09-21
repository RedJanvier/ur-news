import React, { useState, useContext, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
// import Editor from '../components/shared/Editor';
import Toast from '../components/Toast/Toast';
import Modal from '../components/Modal/Modal';
import Spinner from '../components/Spinner/Spinner';

const locations = require('@ur-news/locations');
const { GlobalContext } = require('../context/GlobalState');
const Editor = require('../components/shared/Editor.tsx');

interface ILocation {
  text: string;
  abbr: string;
}

interface INews {
  title: string;
  target: string;
  targetType: string;
  description: string;
  addImage: boolean;
  addFile: boolean;
}

const CreateNews: React.FC<{}> = () => {
  const { pending, error, createNews } = useContext(GlobalContext);
  const history = useHistory();
  const [state, setState] = useState<INews>({
    title: '',
    target: '',
    targetType: '',
    description: '<p>News description</p>',
    addImage: false,
    addFile: false,
  });
  const [targets, setTargets] = useState<ILocation[]>([]);
  const [img, setImg] = useState<Blob | null>(null);
  const [file, setFile] = useState<Blob | null>(null);
  useEffect(() => {
    document.title = 'Create News - UR News Post';
    // eslint-disable-next-line
  }, []);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('title', state.title);
      payload.append('target', state.target);
      payload.append('targetType', state.targetType);
      payload.append('description', state.description);
      if (state.addImage && img) payload.append('img', img);
      if (state.addFile && file) payload.append('file', file);

      const success = await createNews(payload);
      if (success) return history.push('/home');
      console.log('Unkown error while creating news');
    } catch (error) {
      console.log(error);
    }
  };

  const handleTargetTypeChange = (e: FormEvent<HTMLSelectElement>) => {
    const { value } = e.target as typeof e.target & {
      value: 'colleges' | 'schools' | 'departments' | 'combinations';
    };
    switch (value) {
      case 'colleges':
        setState({ ...state, targetType: 'campus' });
        break;
      case 'schools':
        setState({ ...state, targetType: 'school' });
        break;
      case 'departments':
        setState({ ...state, targetType: 'department' });
        break;
      case 'combinations':
        setState({ ...state, targetType: 'class' });
        break;
      default:
        console.log('Unkown targetType');
        break;
    }

    let res: ILocation[] = [];

    for (const key in locations[value]) {
      if (Object.hasOwnProperty.call(locations[value], key) && key) {
        const element = locations[value][key];
        res = [...res, ...element];
      } else {
        console.log(`Key: ${key} has no associated value in locations`);
      }
    }

    setTargets(res);
  };

  return (
    <>
      <Modal title='Create News'>
        {error && <Toast text={error} />}
        <form>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              onChange={(e) => setState({ ...state, title: e.target.value })}
              placeholder='News title'
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <Editor
              onChange={(value) => setState({ ...state, description: value })}
              value={state.description}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='addImage'>
              <input
                type='checkbox'
                checked={state.addImage}
                name='addImage'
                onChange={() =>
                  setState({ ...state, addImage: !state.addImage })
                }
                placeholder='News image'
                required
              />
              Add an image?
            </label>
          </div>
          {state.addImage && (
            <div className='form-control'>
              <label htmlFor='image'>Image</label>
              <input
                type='file'
                name='image'
                // @ts-ignore: Object is possibly 'null'.
                onChange={(e) => setImg(e.target.files[0])}
                placeholder='News image'
                required
              />
            </div>
          )}
          <div className='form-control'>
            <label htmlFor='addFile'>
              <input
                type='checkbox'
                checked={state.addFile}
                name='addFile'
                onChange={() => setState({ ...state, addFile: !state.addFile })}
                placeholder='News file'
                required
              />
              Add a file?
            </label>
          </div>
          {state.addFile && (
            <div className='form-control'>
              <label htmlFor='file'>File</label>
              <input
                type='file'
                name='file'
                // @ts-ignore: Object is possibly 'null'.
                onChange={(e) => setFile(e.target.files[0])}
                placeholder='News file'
                required
              />
            </div>
          )}
          <div className='form-control'>
            <select
              name='targetType'
              value={state.targetType}
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
              value={state.target}
              onChange={(e) => setState({ ...state, target: e.target.value })}
              required
            >
              <option value='' disabled>
                Select your Audience
              </option>
              {targets.map((t: ILocation) => (
                <option value={t.abbr}>{t.text}</option>
              ))}
            </select>
          </div>
          <div className='form-control'>
            <button onClick={handleSubmit} className='btn' disabled={pending}>
              {pending ? <Spinner /> : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateNews;
