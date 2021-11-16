import axios from "axios";

function BoardDelete() {
    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    const params = new URLSearchParams(search);
    const seq = params.get('seq');

    axios.delete('http://192.168.100.74:18080/homepage/api/notification/delete.do?seq' + seq)
    .then(function (response) {
        console.log("정상적으로 삭제되었습니다.");
    })
    .catch(function (error) {
        console.log(error);
    });
}

export default BoardDelete;