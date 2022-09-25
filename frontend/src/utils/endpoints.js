function getIsSafe() {
  const isSafe = localStorage.getItem('isSafe');
  if (isSafe !== null) {
    return isSafe === 'true';
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

function getLoginData(username, password) {
  return {
    'username': username,
    'password': password,
  }
}

function getCreateAccountEndpoint() {
  return 'http://localhost:8000/account/create';
}

function getCreateAccountData(username, firstName, lastName, email, password) {
  return {
    'username': username,
    'first_name': firstName,
    'last_name': lastName,
    'email': email,
    'password': password,
  }
}

function getAccountEndpoint() {
  if (getIsSafe()) {
    return 'http://localhost:8000/account/safe';
  }

  const user_id = localStorage.getItem('user_id');
  return 'http://localhost:8000/account/unsafe/' + user_id;
}

function getAccountData(username, firstName, lastName, email, password) {
  const data = {};

  if (username.length !== 0) data['username'] = username;
  if (firstName.length !== 0) data['first_name'] = firstName;
  if (lastName.length !== 0) data['last_name'] = lastName;
  if (email.length !== 0) data['email'] = email;
  if (password.length !== 0) data['password'] = password;

  return data;
}

function getPressApplicationEndpoint() {
  if (getIsSafe()) {
    return 'http://localhost:8000/press/application/safe';
  }

  const user_id = localStorage.getItem('user_id');
  return 'http://localhost:8000/press/application/unsafe/' + user_id;
}

function getPressApplicationPostData(organization, note) {
  return {
    'organization': organization,
    'note': note,
  };
}

function getConfig() {
  const token = localStorage.getItem('token');
  return {'headers': {'Authorization': 'Token ' + token}};
}

export {
  getIsSafe,
  setIsSafe,
  getLoginEndpoint,
  getLoginData,
  getCreateAccountEndpoint,
  getCreateAccountData,
  getAccountEndpoint,
  getAccountData,
  getPressApplicationEndpoint,
  getPressApplicationPostData,
  getConfig,
}
