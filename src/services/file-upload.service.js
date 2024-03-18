import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5005/api'
});

const errorHandler = (err) => {
    throw err
}

const uploadImage = (file) => {
    console.log('that form the cliet file-upload - file ==>',file);
    return api.post("/upload", file)
      .then(res => {
        console.log('that is from the cliet file-upload - res',res);
        return res.data
    })
      .catch(errorHandler);
};

export default {
    uploadImage
}