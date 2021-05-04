import { put, call, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
// import { ipcRenderer } from 'electron';
import {
  FETCHING_ONEDRIVE_TOKEN,
  FETCHING_ONEDRIVE_TOKEN_FAILED,
  FETCHING_ONEDRIVE_TOKEN_SUCCESS,
  FETCHING_GITHUB_RELEASES,
  FETCHING_GITHUB_RELEASES_FAILED,
  FETCHING_GITHUB_RELEASES_SUCCESS,
} from '../actions/app';
import {
  GET_USER_AVATAR,
} from '../actions/user';

import OneDrive from '../services/OneDrive';
import CommonServices from '../services/CommonServices';

const oneDrive = new OneDrive();
const commonServices = new CommonServices();

function* oneDriveToken(action) {
  const { code } = action;
  try {
    const data = yield call(oneDrive.getTokenByCode, code);
    const token = data.access_token;
    const refreshToken = data.refresh_token;
    const expiresDate = Date.parse(new Date()) + (data.expires_in * 1000);
    message.success('Authorized success.');
    yield put({ type: FETCHING_ONEDRIVE_TOKEN_SUCCESS, token, refreshToken, expiresDate });
    // token 返回成功请求头像
    yield put({
      type: GET_USER_AVATAR,
      driveName: 'oneDrive',
    });
  } catch (ex) {
    message.error('Authorization failed, please try again.');
    yield put({ type: FETCHING_ONEDRIVE_TOKEN_FAILED, error: ex });
  }
}

function* fetchingOneDriveToken() {
  yield takeLatest(FETCHING_ONEDRIVE_TOKEN, oneDriveToken);
}

function* handleReleaseFetch() {
  try {
    const latestVersion = yield call(commonServices.getLatestVersion);
    yield put({ type: FETCHING_GITHUB_RELEASES_SUCCESS, latestVersion });
  } catch (ex) {
    yield put({ type: FETCHING_GITHUB_RELEASES_FAILED, error: ex });
  }
}

function* getReleases() {
  yield takeLatest(FETCHING_GITHUB_RELEASES, handleReleaseFetch);
}

export default [
  fetchingOneDriveToken,
  getReleases,
];
