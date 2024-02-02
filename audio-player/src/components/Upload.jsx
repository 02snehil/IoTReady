// Upload.jsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Upload = ({ onDrop }) => {
  const onDropCallback = useCallback((acceptedFiles) => {
    onDrop(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: '.mp3,.wav',
  });

  return (
    <div {...getRootProps()} className="upload">
      <input {...getInputProps()} />
      {isDragActive ? (
        <button>Drop the files here ...</button>
      ) : (
        <button> click to select files</button>
      )}
    </div>
  );
};

export default Upload;
