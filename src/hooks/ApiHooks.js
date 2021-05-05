/* eslint-disable max-len */
import {useEffect, useState, useContext} from 'react';
import {baseUrl} from '../utils/variables';
import {MediaContext} from '../contexts/MediaContext';

// general function for fetching (options default value is empty object)
const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    // if API response contains error message (use Postman to get further details)
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    // if API response does not contain error message, but there is some other error
    throw new Error('doFetch failed');
  } else {
    // if all goes well
    return json;
  }
};


// set update to true, if you want to use getMedia automagically
const useMedia = (update = false, ownFiles, tag) => {
  const [picArray, setPicArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(MediaContext);

  if (update) {
    useEffect(() => {
      try {
        (async () => {
          const media = await getMedia(tag);
          console.log('tägi hakiessa', tag);
          setPicArray(media);
        })();
      } catch (e) {
        alert(e.message);
      }
    }, []);
  }

  const getMedia = async (tag) => {
    try {
      setLoading(true);
      const files = await doFetch(baseUrl + 'tags/' + tag);
      console.log(files);
      console.log(tag);
      console.log(ownFiles);


      let allFiles = await Promise.all(files.map(async (item) => {
        return await doFetch(baseUrl + 'media/' + item.file_id);
      }));
      if (ownFiles && user !== null) {
        allFiles = allFiles.filter((item) => {
          return item.user_id === user.user_id;
        });
      }
      return allFiles;
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getMediaById = async (id) => {
    setLoading(true);
    try {
      return await doFetch(baseUrl + 'media/' + id);
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const postMedia = async (fd, token) => {
    setLoading(true);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: fd,
    };
    try {
      return await doFetch(baseUrl + 'media', fetchOptions);
    } catch (e) {
      throw new Error('upload failed');
    } finally {
      setLoading(false);
    }
  };

  const putMedia = async (data, id, token) => {
    setLoading(true);
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'media/'+id, fetchOptions);
    } catch (e) {
      throw new Error('modify failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id, token) => {
    setLoading(true);
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const resp = await doFetch(baseUrl + 'media/'+id, fetchOptions);
      if (resp) {
        const media = await getMedia(tag);
        setPicArray(media);
      }
    } catch (e) {
      throw new Error('delete failed');
    } finally {
      setLoading(false);
    }
  };

  return {getMedia, postMedia, putMedia, deleteMedia, loading, picArray, setPicArray, getMediaById};
};

const useUsers = () => {
  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      return await doFetch(baseUrl + 'users', fetchOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  const putUser = async (inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(inputs),
    };
    try {
      return await doFetch(baseUrl + 'users', fetchOptions);
    } catch (e) {
      alert('putUser: ', e.message);
    }
  };

  const getUserAvailable = async (username) => {
    try {
      const response = await doFetch(baseUrl + 'users/username/' + username);
      return response.available;
    } catch (e) {
      alert(e.message);
    }
  };

  const getUser = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/user', fetchOptions);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getUserById = async (token, id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/' + id, fetchOptions);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {register, getUserAvailable, getUser, getUserById, putUser};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      return await doFetch(baseUrl + 'login', fetchOptions);
    } catch (e) {
      alert(e.message);
    }
  };

  return {postLogin};
};

const useTag = () => {
  const postTag = async (token, id, tag) => {
    const data = {
      file_id: id,
      tag,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'tags', fetchOptions);
    } catch (e) {
      throw new Error('tagging failed');
    }
  };

  const getTag = async (tag) => {
    try {
      const response = await doFetch(baseUrl + 'tags/' + tag);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  return {postTag, getTag};
};

const useFavorite = () => {
  const getFavorite = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites', fetchOptions);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getFavoriteById = async (id) => {
    try {
      return await doFetch(baseUrl + 'favourites/file/' + id);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const postFavorite = async (token, id) => {
    const data = {
      file_id: id,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const resp = await doFetch(baseUrl + 'favourites', fetchOptions);
      console.log('you liked a post', resp);
      return resp;
    } catch (e) {
      throw new Error('liking failed');
    }
  };

  const deleteFavorite = async (token, id) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const resp = await doFetch(baseUrl + 'favourites/file/'+id, fetchOptions);
      console.log('you didnt like a post', resp);
      return resp;
    } catch (e) {
      throw new Error('delete failed');
    }
  };

  return {postFavorite, deleteFavorite, getFavoriteById, getFavorite};
};

const useComments = (update = false, id) => {
  const [loading, setLoading] = useState(false);
  const [showAllComments, setShowAllComments] = useState([]);

  if (update) {
    useEffect(() => {
      try {
        (async () => {
          const comments = await getCommentById(id);
          setShowAllComments(comments);
        })();
      } catch (e) {
        alert(e.message);
      }
    }, []);
  }

  const getComment = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'comments', fetchOptions);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getCommentById = async (id) => {
    setLoading(true);
    try {
      return await doFetch(baseUrl + 'comments/file/' + id);
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async (token, id, inputs, firstName, tagName) => {
    const data = {
      file_id: id,
      comment: JSON.stringify({
        comment: inputs,
        owner: firstName,
        tag: tagName,
      }),
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    console.log('DATA', data);
    try {
      const resp = await doFetch(baseUrl + 'comments', fetchOptions);
      console.log('you posted a comment', resp);
      return resp;
    } catch (e) {
      throw new Error('posting a comment failed');
    }
  };

  const deleteComment = async (token, id) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const resp = await doFetch(baseUrl + 'comments/'+id, fetchOptions);
      console.log('you didnt like a post', resp);
      return resp;
    } catch (e) {
      throw new Error('delete failed');
    }
  };

  return {getComment, getCommentById, postComment, deleteComment, loading, showAllComments, setShowAllComments};
};


export {useMedia, useUsers, useLogin, useTag, useFavorite, useComments};
