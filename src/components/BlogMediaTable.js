import {Link as RouterLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import BlogMediaRow from './BlogMediaRow';
import {MediaContext} from '../contexts/MediaContext';

import {useMedia} from '../hooks/ApiHooks';
import {
  CircularProgress,
  GridList,
  GridListTile, ListSubheader,
  makeStyles,
  useMediaQuery,
  Fab, Grid, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {useContext, useEffect, useState} from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  fab: {
    margin: theme.spacing.unit, // You might not need this now
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
}));


const BlogMediaTable = ({ownFiles}) => {
  const [user] = useContext(MediaContext);
  console.log(user);

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const [hashtagCategory, setHashtagCategory] =
    useState('EnvironmetalIdealist_blog');

  const {picArray, loading, deleteMedia, setPicArray, getMedia} =
    useMedia(true, ownFiles, hashtagCategory);

  useEffect(() => {
    try {
      (async () => {
        const media = await getMedia(hashtagCategory);
        setPicArray(media);
      })();
    } catch (e) {
      alert(e.message);
    }
  }, [hashtagCategory]);

  console.log(picArray);
  return (
    <div className={classes.root}>
      <Grid
        container
        direction={'row'}
        justify={'space-around'} >
        <Grid
          item>
          <Button
            style={hashtagCategory ===
            'EnvironmetalIdealist_blog' ?
              {backgroundColor: '#47D37859',
                color: '#621BEE'} :
              {backgroundColor: '',
                color: '#621BEE'}}
            value={'EnvironmetalIdealist_blog'}
            onClick={(e)=>{
              setHashtagCategory(e.currentTarget.value);
              console.log(e.target);
            }}
          >
            All posts
          </Button>
        </Grid>
        <Grid
          item>
          <Button
            style={hashtagCategory ===
            'EnvironmetalIdealist_blogMaterialreuse' ?
              {backgroundColor: '#47D37859',
                color: '#621BEE'} :
              {backgroundColor: '',
                color: '#621BEE'}}
            value={'EnvironmetalIdealist_blogMaterialreuse'}
            onClick={(e)=>{
              setHashtagCategory(e.currentTarget.value);
              console.log(e.target);
            }}
          >
            #Materialreuse
          </Button>
        </Grid>
        <Grid
          item>
          <Button
            style={hashtagCategory ===
            'EnvironmetalIdealist_blogHanfcrafts' ?
              {backgroundColor: '#47D37859',
                color: '#621BEE'} :
              {backgroundColor: '',
                color: '#621BEE'}}
            value={'EnvironmetalIdealist_blogHanfcrafts'}
            onClick={(e)=>{
              setHashtagCategory(e.currentTarget.value);
              console.log(e.target);
            }}
          >
            #Hanfcrafts
          </Button>
        </Grid>
        <Grid
          item>
          <Button
            style={hashtagCategory ===
            'EnvironmetalIdealist_blogFreeWord' ?
              {backgroundColor: '#47D37859',
                color: '#621BEE'} :
              {backgroundColor: '',
                color: '#621BEE'}}
            value={'EnvironmetalIdealist_blogFreeWord'}
            onClick={(e)=>{
              setHashtagCategory(e.currentTarget.value);
              console.log(e.target);
            }}
          >
            #FreeWord
          </Button>
        </Grid>
        <Grid
          item>
          <Button
            style={hashtagCategory ===
            'EnvironmetalIdealist_blogCooking' ?
              {backgroundColor: '#47D37859',
                color: '#621BEE'} :
              {backgroundColor: '',
                color: '#621BEE'}}
            value={'EnvironmetalIdealist_blogCooking'}
            onClick={(e)=>{
              setHashtagCategory(e.currentTarget.value);
              console.log(e.target);
            }}
          >
            #Cooking
          </Button>
        </Grid>
        <Grid
          item>
          <Button
            style={hashtagCategory ===
            'EnvironmetalIdealist_blogHealth' ?
              {backgroundColor: '#47D37859',
                color: '#621BEE'} :
              {backgroundColor: '',
                color: '#621BEE'}}
            value={'EnvironmetalIdealist_blogHealth'}
            onClick={(e)=>{
              setHashtagCategory(e.currentTarget.value);
              console.log(e.target);
            }}
          >
            #Health
          </Button>
        </Grid>
        <Grid
          item>
          <Button
            style={hashtagCategory ===
            'EnvironmetalIdealist_blogEnergy' ?
              {backgroundColor: '#47D37859',
                color: '#621BEE'} :
              {backgroundColor: '',
                color: '#621BEE'}}
            value={'EnvironmetalIdealist_blogEnergy'}
            onClick={(e)=>{
              setHashtagCategory(e.currentTarget.value);
              console.log(e.target);
            }}
          >
            #Energy
          </Button>
        </Grid>
      </Grid>
      <GridList
        cellHeight={500}
        className={classes.gridList}
        cols={matches ? 3 : 2}

      >
        <GridListTile key="Subheader" cols={3} style={{height: 'auto'}}>
          <ListSubheader
            component="div">
            {hashtagCategory.length === 25 ?
              'All posts' :
              '#'+hashtagCategory.slice(25, (hashtagCategory.length))}
          </ListSubheader>
        </GridListTile>
        {!loading ?
          picArray.slice(0).reverse().map((item) =>
            <GridListTile key={item.file_id}>
              <BlogMediaRow
                file={item}
                ownFiles={ownFiles}
                deleteMedia={deleteMedia}
              />
            </GridListTile>) :
          <GridListTile>
            <CircularProgress />
          </GridListTile>
        }
      </GridList>

      {user ?
        <Fab
          color="primary"
          aria-label="add"
          size={'large'}
          className={classes.fab}
          component={RouterLink}
          to={'/blogUpload'}
        >
          <AddIcon />
        </Fab> :
        <Fab
          color="primary"
          aria-label="add"
          size={'large'}
          className={classes.fab}
          component={RouterLink}
          onClick={()=>{
            alert('log in first');
          }
          }
        >
          <AddIcon />
        </Fab>
      }
    </div>
  );
};

BlogMediaTable.propTypes = {
  ownFiles: PropTypes.bool,
};

export default withRouter(BlogMediaTable);
