import React, { useState, useEffect } from 'react'
import { CssBaseline, Container, Grid, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import PenIcon from '@material-ui/icons/Create'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import PostsList from './components/PostsList'
import AddPostForm from './components/AddPostForm'
import { fetchPosts } from './actions/post'

function App() {
const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const [ open, setOpen ] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position='static' color="inherit" elevation={0}>
          <Toolbar>
            <IconButton edge="start" className={classes.container} color="inherit" />
            <Typography variant='h6' color='secondary' className={classes.title}>
              <a href='http://localhost:3000/posts'>Blog</a>
            </Typography>
            <Button color="primary" variant="outlined" startIcon={<PenIcon />} onClick={handleOpen}>
              Yeni Makale
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Router>
              <Routes>
                <Route exact path="/posts" element={<PostsList/>}/>
                <Route path='/' element={<Navigate replace to="/posts"/>}/>
              </Routes>
            </Router>
          </Grid>
        </Grid>
      </Container>
      <AddPostForm open={open} handleClose={handleClose}/>
    </>
  );
}

export default App;
