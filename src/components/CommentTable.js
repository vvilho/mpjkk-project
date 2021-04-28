/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {useComments} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import React from 'react';
// import {useContext} from 'react';
// import {MediaContext} from '../contexts/MediaContext';
import CommentRow from './CommentRow';

const CommentTable = ({file}) => {
  // const {getFavorite} = useFavorite();
  // const [user] = useContext(MediaContext);
  const {getCommentById} = useComments();
  const [showComment, setShowComment] = useState([]);
  // const [commentOwner, setCommentOwner] = useState();
  // const [commentTime, setCommentTime] = useState();

  useEffect(() => {
    (async () => {
      try {
        const result3 = await getCommentById(file.file_id);
        console.log('show me comments', result3);
        setShowComment(result3);
        console.log('SHOW COMMENTS', showComment);
        // console.log('SHOW OWNER OF THIS COMMENT', commentOwner);
        if (result3 == 0) {
          console.log('NO COMMENTS FOR THIS POST');
          setShowComment('No comments');
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);


  return (
    <>
      {showComment &&
        showComment.map((item) =>
          <CommentRow
            key={item.file_id}
            file={item}
          />,
        )
      }
    </>
  );
};

CommentTable.propTypes = {
  file: PropTypes.object,
};

export default CommentTable;
