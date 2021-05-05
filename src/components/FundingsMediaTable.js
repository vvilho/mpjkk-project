import {Link as RouterLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

import {useMedia} from '../hooks/ApiHooks';

import {
  CircularProgress,
  GridList,
  GridListTile,
  makeStyles,
  Fab, Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {useContext} from 'react';
import FundingsMediaRow from './FundingsMediaRow';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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


const MeetingsMediaTable = ({ownFiles, history}) => {
  const {user, setModalOpen, setModalOpenText} = useContext(MediaContext);

  const classes = useStyles();


  const {picArray, loading, deleteMedia} =
    useMedia(true, ownFiles, 'EnvironmetalIdealist_fundingsproduction');


  return (
    <div className={classes.root}>


      <GridList
        cellHeight={'auto'}
        className={classes.gridList}
        cols={1}


      >

        {!loading ?
          picArray.slice(0).reverse().map((item) =>
            <Grid
              container
              justify={'center'}
              key={item.file_id}
            >
              <GridListTile
                style={{
                  width: '100%',
                  marginBottom: '15px',
                }}
              >

                <FundingsMediaRow
                  file={item}
                  ownFiles={ownFiles}
                  deleteMedia={deleteMedia}
                />
              </GridListTile>
            </Grid>) :
          <GridListTile>
            <CircularProgress />
          </GridListTile>
        }
      </GridList>


      <Fab
        color="primary"
        aria-label="add"
        size={'large'}
        className={classes.fab}
        component={RouterLink}
        onClick={
          () => {
            if (user) {
              history.push('/fundingsupload');
            } else {
              setModalOpen(true);
              setModalOpenText('Login or register to create a post');
            }
          }

        }
      >
        <AddIcon />
      </Fab>


    </div>
  );
};

MeetingsMediaTable.propTypes = {
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
};

export default withRouter(MeetingsMediaTable);
