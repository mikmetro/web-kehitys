import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import TextInput from '../components/ui/TextInput';

const EditDialog = ({item, modifyMedia, onClose}) => {
  const doEdit = async () => {
    try {
      // TODO: call postFile function (see below)
      // TODO: call postMedia function (see below)
      // TODO: redirect to Home
      const token = localStorage.getItem('token');
      const mediaResult = await modifyMedia(item.media_id, inputs, token);
      console.log('mediaResult', mediaResult);
      onClose();
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(doEdit, {
    title: '',
    description: '',
  });

  return (
    <>
      <dialog open className="fixed inset-0 flex h-dvh flex-col justify-center">
        <h1 className="text-2xl font-bold">Upload</h1>
        <form
          onSubmit={handleSubmit}
          className="*:not[img]:w-full flex flex-col items-center px-16"
        >
          <TextInput
            label="Title"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
          <div className="w-full">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              rows={5}
              id="description"
              className="my-2.5 block w-full rounded border-2 bg-stone-900 p-2.5"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={inputs?.title?.length <= 3}
            className="mt-4 w-fit cursor-pointer rounded bg-stone-900 p-2"
          >
            Update
          </button>
          <button
            type="Button"
            onClick={onClose}
            className="mt-4 w-fit cursor-pointer rounded bg-red-900 p-2"
          >
            Cancel
          </button>
        </form>
      </dialog>
    </>
  );
};

export default EditDialog;
