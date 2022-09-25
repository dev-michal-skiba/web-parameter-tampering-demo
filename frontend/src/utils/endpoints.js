function getIsSafe() {
  const isSafe = localStorage.getItem('isSafe');
  if (isSafe !== null) {
    return isSafe === 'true'
  }

  setIsSafe(true);
  return true;
}

function setIsSafe(value) {
  localStorage.setItem('isSafe', value);
}

function getLoginEndpoint() {
  return 'http://localhost:8000/account/login';
}

function getCreateAccountEndpoint() {
  return 'http://localhost:8000/account/create';
}

function getPressApplicationEndpoint() {
  if (getIsSafe()) {
    return 'http://localhost:8000/press/application/safe';
  }

  return 'http://localhost:8000/press/application/unsafe';
}

function getPressApplicationPostData(organization, note) {
  if (getIsSafe()) {
    return {
      'organization': organization,
      'note': note,
    };
  }

  const user_id = localStorage.getItem('user_id');
  return {
    'user_id': user_id,
    'organization': organization,
    'note': note,
  };
}

function getPressApplicationPostConfig() {
  const token = localStorage.getItem('token');
  return {'headers': {'Authorization': 'Token ' + token}};
}

function getPressApplicationGetConfig() {
  const token = localStorage.getItem('token');

  if (getIsSafe()) {
    return {
      'headers': {'Authorization': 'Token ' + token}
    };
  };

  const user_id = localStorage.getItem('user_id');
  return {
    'params': {'pk': user_id},
    'headers': {'Authorization': 'Token ' + token}
  };
}

export {
  getIsSafe,
  setIsSafe,
  getLoginEndpoint,
  getCreateAccountEndpoint,
  getPressApplicationEndpoint,
  getPressApplicationPostData,
  getPressApplicationPostConfig,
  getPressApplicationGetConfig,
}
