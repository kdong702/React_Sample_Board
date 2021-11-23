import axios from 'axios';

const listApi = 'http://192.168.100.74:18080/homepage/api/notification/list.do';
const detailApi = 'http://192.168.100.74:18080/homepage/api/notification/detail.do';
const fileListApi = 'http://192.168.100.74:18080/homepage/api/notification/fileList.do';
const downloadApi = 'http://192.168.100.74:18080/homepage/api/notification/download.do';
//const insertApi = 'http://192.168.100.74:18080/homepage/api/notification/insert.do';
const updateApi = 'http://192.168.100.74:18080/homepage/api/notification/update.do';
const deleteApi = 'http://192.168.100.74:18080/homepage/api/notification/delete.do';

const INSERT_API = 'http://192.168.100.74:18080/homepage/api/notification/insert.do';

const insertTest = (formData, func) => {
    return axios.post(INSERT_API, formData, { headers: {  'Content-Type': 'multipart/form-data'}}).then((response) => func(response));
}

export {listApi, detailApi, fileListApi, downloadApi, updateApi, deleteApi, insertTest};
