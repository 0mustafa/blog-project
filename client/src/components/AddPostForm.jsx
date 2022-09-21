import React, { useState } from 'react'
import { Button, TextField, Select, Input, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeStyles } from '@material-ui/core/styles'
import FileBase64 from 'react-file-base64'
import { useDispatch } from 'react-redux'

import { createPost } from '../actions/post'


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    textField: {
        marginBottom: theme.spacing(2)
    },
}))

const tags = ['fun', 'programming', 'health', 'science']

const postSchema = yup.object().shape({
    title: yup.string(),
    subtitle: yup.string(),
    content: yup.string().min(20),
    tag: yup.mixed().oneOf(tags),
})

const AddPostForm = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const [file, setFile] = useState(null)

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(postSchema)
    })

    const onSubmit = (data) => {
        // Dispatch create post action
        dispatch(createPost({ ...data, image: file }))
        console.log({...data, file})
        clearForm()
    }

    const clearForm = () => {
        reset()
        setFile(null)
        handleClose()
    }

    const classes = useStyles()

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Yeni Yazı Oluştur</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Yeni bir yazı eklemek için aşağıdaki formu doldurun.
                </DialogContentText>
                <div className={classes.root}>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="title"
                            label="Title"
                            name="title"
                            variant='outlined'
                            className={classes.textField}
                            size="small"
                            {...register("title")}
                            error={errors.title ? true : false}
                            fullWidth
                            required
                        />
                        <TextField
                            id="subtitle"
                            label="Alt Başlık"
                            name="subtitle"
                            variant='outlined'
                            className={classes.textField}
                            size="small"
                            {...register("subtitle")}
                            error={errors.subtitle ? true : false}
                            fullWidth
                            required
                        />
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    input={<Input />}
                                    className={classes.textField}
                                    fullWidth
                                >
                                    {
                                        tags.map((tag, index) => (
                                            <MenuItem key={index} value={tag}>
                                                {tag}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            )}
                            name="tag"
                            control={control}
                            defaultValue={tags[0]}
                        />
                        <TextField
                            id="content"
                            label="İçerik"
                            name="content"
                            variant='outlined'
                            multiline
                            minRows={10}
                            className={classes.textField}
                            size="small"
                            {...register("content")}
                            error={errors.content ? true : false}
                            fullWidth
                            required
                        />
                        <FileBase64
                            multiple={false}
                            onDone={({ base64 }) => setFile(base64)}
                        />
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="inherit" onClick={clearForm}>Vazgeç</Button>
                <Button color="primary" variant="outlined" type="submit" onClick={() => handleSubmit(onSubmit)()}>Yayınla</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPostForm