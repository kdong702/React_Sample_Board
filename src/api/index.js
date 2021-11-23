import axios from "axios";

const listApi = 'http://192.168.100.74:18080/homepage/api/notification/list.do';
const detailApi = 'http://192.168.100.74:18080/homepage/api/notification/detail.do';
const fileListApi = 'http://192.168.100.74:18080/homepage/api/notification/fileList.do';
const downloadApi = 'http://192.168.100.74:18080/homepage/api/notification/download.do';
const insertApi = 'http://192.168.100.74:18080/homepage/api/notification/insert.do';
const updateApi = 'http://192.168.100.74:18080/homepage/api/notification/update.do';
const deleteApi = 'http://192.168.100.74:18080/homepage/api/notification/delete.do';


const getAxiosFromApi = (ApiUrl,formData,succFunc,failFunc) => {
    return axios.get(ApiUrl,{params:formData}).then(res=> succFunc(res)).catch(err => failFunc(err));
}

const postAxiosFromApi = (ApiUrl,formData,succFunc,failFunc) => {
    return axios.post(ApiUrl,formData).then(res=> succFunc(res)).catch(err => failFunc(err));
}

export {listApi, detailApi, fileListApi, downloadApi, insertApi, updateApi, deleteApi,getAxiosFromApi,postAxiosFromApi};