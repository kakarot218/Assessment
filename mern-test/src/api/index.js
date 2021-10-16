import axios from 'axios';

export const AuthorListGetApi = async () => {
    const response = await axios
        .get('http://localhost:3001/db/authors')
        .catch(error => {
            console.log("Error : ", error);
            return error.response;
        });
    console.log(">>> reulst >>>", response);
    return response;
};

export const AuthorDetailGetApi = async (id) => {
    const response = await axios
        .get('http://localhost:3001/db/posts?id='+id)
        .catch(error => {
            console.log("Error : ", error);
            return error.response;
        });
    console.log(">>> reulst >>>", response);
    return response;
};

export const PostDetailGetApi = async (id) => {
    const response = await axios
        .get('http://localhost:3001/db/posts?post_id='+id)
        .catch(error => {
            console.log("Error : ", error);
            return error.response;
        });
    console.log(">>> reulst >>>", response);
    return response;
};

export const PostListGetApi = async () => {
    const response = await axios
        .get('http://localhost:3001/db/posts')
        .catch(error => {
            console.log("Error : ", error);
            return error.response;
        });
    console.log(">>> reulst >>>", response);
    return response;
};