import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import classicEditor from "@ckeditor/ckeditor5-build-classic";
import Toast from "../components/Toast/Toast";
import Modal from "../components/Modal/Modal";
import Spinner from "../components/Spinner/Spinner";
import { GlobalContext } from "../context/GlobalState";

const CreateNews = () => {
  const { pending, error, createNews } = useContext(GlobalContext);
  const history = useHistory();
  const [state, setState] = useState({
    title: "",
    target: "",
    targetType: "",
    description: "<p>News description</p>",
    addImage: false,
    addFile: false,
  });
  const [img, setImg] = useState({});
  const [file, setFile] = useState({});
  useEffect(() => {
    document.title = "Create News - UR News Post";
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { addFile, addImage } = state;
    const payload = new FormData();
    for (const property in state) {
      payload.append(property, state[property]);
    }
    if (addImage) payload.append("img", img);
    if (addFile) payload.append("file", file);
    const success = await createNews(payload);
    if (success) return history.push("/home");
  };

  return (
    <>
      <Modal title="Create News">
        {error && <Toast text={error} />}
        <form>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={(e) => setState({ ...state, title: e.target.value })}
              placeholder="News title"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <CKEditor
              data={state.description}
              editor={classicEditor}
              onChange={(_, editor) =>
                setState({ ...state, description: editor.getData() })
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="addImage">
              <input
                type="checkbox"
                checked={state.addImage}
                name="addImage"
                onChange={() =>
                  setState({ ...state, addImage: !state.addImage })
                }
                placeholder="News image"
                required
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
                required
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
                required
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
                required
              />
            </div>
          )}
          <div className="form-control">
            <select
              name="targetType"
              value={state.targetType}
              onChange={(e) =>
                setState({
                  ...state,
                  targetType: e.target.value,
                })
              }
              required
            >
              <option value="" disabled>
                Select your Audience type
              </option>
              <option value="campus">All the campus</option>
              <option value="school">Specific school</option>
              <option value="department">Specific department</option>
              <option value="class">Specific combination</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="target">Audience</label>
            <input
              type="text"
              name="target"
              onChange={(e) => setState({ ...state, target: e.target.value })}
              placeholder="News Audience in abbreviation"
              required
            />
          </div>
          <div className="form-control">
            <button
              onClick={handleSubmit}
              className="btn"
              disabled={pending ? "disabled" : ""}
            >
              {pending ? <Spinner /> : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateNews;
