import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    caregiver: '/caregiver',
    update:"/update",
    delete : "/delete"
};

 
function getCaregiver(callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getCaregiverById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + "/"+params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


function postUpdateCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + endpoint.update, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteCaregiver(caregiverId, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + endpoint.delete + "/" + caregiverId, {
        method: 'DELETE',
      
     });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    getCaregiver,
    postCaregiver,
    postUpdateCaregiver,
    getCaregiverById,
    deleteCaregiver
};
