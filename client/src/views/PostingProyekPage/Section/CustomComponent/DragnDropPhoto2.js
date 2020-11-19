import React from 'react';
import {
    makeStyles,
} from '@material-ui/core';
import Dropzone from 'react-dropzone-uploader';

const useStyles = makeStyles({
    uploadPhotoWrapper: {
        '&:hover': {
            cursor: 'pointer',

        },
        border: '1px dashed #ddd',
        padding: '10px 13px',
        justifyContent: 'center',
        alignItems: 'center',

    },

    uploadInput: {
        border: '1px solid #f827',
        background: '#f827'
    }
});


const DragnDropPhoto2 = () => {
    const classes = useStyles();
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    return (
        <React.Fragment>
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*,audio/*,video/*"
                styles={{
                    dropzone: {
                        '&:hover': {
                            cursor: 'pointer',

                        },
                        border: '1px dashed #ddd',
                        padding: '10px 13px',
                        justifyContent: 'center',
                        alignItems: 'center',}}}
            />
        </React.Fragment>
    );
};

export default DragnDropPhoto2;