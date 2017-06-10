import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  SIGN_UP, SIGN_IN, ADD_COUNTER, SUBTRACT_COUNTER, RESET_COUNTER, FETCH_LOGIN, RESET_LOGIN, FETCH_USER_SUCCESS, FETCH_INTERESTS_SUCCESS, ADD_INTEREST_SUCCESS, REMOVE_INTEREST_SUCCESS,
} from './constants';
import { Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';

export const SignUp = data => ({
  type: SIGN_UP,
  data,
});


export const signin = (data) => ((dispatch) => {
    axios.post('http://foodmongo-dev.us-west-2.elasticbeanstalk.com/auth/signin', {
      username: data.username,
      password: data.password,
    })
    .then(response => {
      AsyncStorage.setItem('token', response.data.token, (err) => {
        AsyncStorage.setItem('_id', response.data._id, (err) => {
          Actions.profile();
        })
      })

    })
    .catch((err) => {
      console.log(err);
    });
  }
);

export const fetchUser = () => ((dispatch) => {
  AsyncStorage.getItem('token', (err1, token) => {
    AsyncStorage.getItem('_id', (err2, id) => {
      console.log('actions fetchUser', token);
      axios.get(`http://foodmongo-dev.us-west-2.elasticbeanstalk.com/users/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          user: res.data,
        });
      });
    });
  });
});

export const fetch_login = data => {
	return dispatch => {
    return dispatch({
			type : FETCH_LOGIN,
			data
		})
  }
}

export const reset_login = () => {
	return dispatch => {
    let data = true;
    return dispatch({
			type : RESET_LOGIN,
			data
		})
  }
}

export const actionSignUp = data => ((dispatch) => {
  axios.post('http://foodmongo-dev.us-west-2.elasticbeanstalk.com/auth/signup', {
    name: data.name,
    email: data.email,
    username: data.username,
    password: data.password,
  })
  .then((res) => {
    console.log('actionSignUp', res);
    dispatch(SignUp(data));
  })
  .catch((err) => {
    console.log(err);
  });
});

export const fetchInterests = () => ((dispatch) => {
  axios.get('http://foodmongo-dev.us-west-2.elasticbeanstalk.com/interest/')
  .then((res) => {
    dispatch({
      type: FETCH_INTERESTS_SUCCESS,
      interests: res.data,
    });
  });
});


export const addInterest = (interest, user) => ((dispatch) => {
  AsyncStorage.getItem('token', (err1, token) => {
    AsyncStorage.getItem('_id', (err2, id) => {
      axios.put(`http://foodmongo-dev.us-west-2.elasticbeanstalk.com/users/${id}`, {
        interestArr: [...user.interestArr, interest._id],
      }, {
        headers: {
          token,
        },
      }).then((res) => {
        dispatch({
          type: ADD_INTEREST_SUCCESS,
          interest,
        });
      });
    });
  });
});

export const removeInterest = (interest, user) => ((dispatch) => {
  AsyncStorage.getItem('token', (err1, token) => {
    AsyncStorage.getItem('_id', (err2, id) => {
      axios.put(`http://foodmongo-dev.us-west-2.elasticbeanstalk.com/users/${id}`, {
        interestArr: [...user.interestArr.filter(userInterest => userInterest._id !== interest._id)],
      }, {
        headers: {
          token,
        },
      }).then((res) => {
        dispatch({
          type: REMOVE_INTEREST_SUCCESS,
          interest,
        });
      });
    });
  });
});

export const addCounter = () => {
  return {
    type: ADD_COUNTER,
  };
};

export const subractCounter = () => {
  return {
    type: SUBTRACT_COUNTER,
  };
};

export const resetCounter = () => {
  return {
    type: RESET_COUNTER,
  };
};
