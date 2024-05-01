import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
});

const errorHandler = (err) => {
    throw err
}

const uploadImage = (file) => {
                    // console.log('that form the cliet file-upload - file ==>', file);
    return api.post("/api/upload", file)
      .then(res => {
                    console.log('that is from the cliet file-upload file-upload-services- res',res);
        return res.data
    })
      .catch(errorHandler);
};

const deleteImage = (file) => {
                    // console.log('this is from the delte path',file)
    return api.post("/api/delete", file)
        .then( res => {
                    // console.log('this is the response fromt he delete ====> res.data', res.data)
            return res.data
        })
        .catch(errorHandler)
}

export default {
    uploadImage,
    deleteImage
}