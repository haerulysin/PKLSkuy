import React from 'react';
import { useDropzone } from 'react-dropzone';
import{
    Grid,
    makeStyles,
    Button,
    Typography,
    LinearProgress 


} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    uploadPhotoWrapper: {
        '&:hover':{
            cursor:'pointer',

        },
        border: '1px dashed #ddd',
        padding: '10px 13px',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    uploadInput:{
        border:'1px solid #f827',
        background:'#f827'
    }
});



function DragnDropPhoto(props) {
    const [files, setFiles] = React.useState([]);

    const onDrop = React.useCallback(acceptedFiles => {
        setFiles(prev => [...prev, ...acceptedFiles]);
        props.handleOnAddPhoto(acceptedFiles);
    }, [props]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const classes = useStyles();

    function removeFiles(file) {
        const newFiles = [...files];
        newFiles.splice(file, 1);
        setFiles(newFiles);
        props.handleRemovePhoto(file);
    }

    return (
        <React.Fragment>
            <Grid container {...getRootProps({ className: classes.uploadPhotoWrapper })}>
                <Grid item xs={3} style={{ textAlign: 'center' }} >
                    <input {...getInputProps()} className={classes.uploadInput} />
                    <Button variant="outlined" size="small">
                        <AddIcon />Upload Photo
                        </Button>
                </Grid>

                <Grid item xs={9}>
                    <Typography variant="caption" > Drag atau Drop foto anda Disini, atau mengklik tombol upload. </Typography>
                </Grid>

                
            </Grid>


            <Grid container style={{marginTop:10}}>
                {files.map((file,index) =>(
                    <Grid key={file.name}  item xs={12} container style={{ alignItems: 'center' }}>
                        <Grid item xs={2}>
                            <ImageIcon fontSize="small" />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="caption">{file.name}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="caption"> 
                            {(file.size/(1024*1024)).toFixed(2)} Mb
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            {props.uploadPercentage !== 0 ? <LinearProgress variant="determinate" value={props.uploadPercentage} />:''}
                        </Grid>

                        <Grid item xs={2} style={{ textAlign: 'right' }}>
                            <Button onClick={() => removeFiles(index)}><CloseIcon /></Button>
                        </Grid>
                    </Grid>
                ))}
                
            </Grid>


        </React.Fragment>
    );
}

export default DragnDropPhoto;