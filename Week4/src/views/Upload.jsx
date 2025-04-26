import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile} from '../hooks/apiHooks';
import useMedia from '../hooks/useMedia';
import TextInput from '../components/ui/TextInput';
// Upload.jsx
const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();

  // Upload.jsx
  const doUpload = async () => {
    try {
      // TODO: call postFile function (see below)
      // TODO: call postMedia function (see below)
      // TODO: redirect to Home
      const token = localStorage.getItem('token');
      console.log('nextResult');
      const result = await postFile(file, token);
      console.log('dresult', result);

      const mediaResult = await postMedia(result.data, inputs, token);
      console.log('mediaResult', mediaResult);
    } catch (e) {
      console.log(e.message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(doUpload);

  // Upload.jsx
  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          name="title"
          type="text"
          id="title"
          onChange={handleInputChange}
        />
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/600x400?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs?.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
