import {HOST} from '../commons/hosts';
import RestApiClient from "../commons/api/rest-client";


const endpoint = {
    user: '/user',
 };

function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.user, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
   
export {getUsers};