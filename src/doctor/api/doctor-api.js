import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    doctor: '/doctor',
    update:"/update",
    delete : "/delete"
};

 

function getDoctorById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.doctor + "/"+params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postDoctor(user, callback){
    let request = new Request(HOST.backend_api + endpoint.doctor , {
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


function postUpdateDoctor(user, callback){
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.update, {
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

function deleteDoctor(doctorId, callback){
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.delete + "/" + doctorId, {
        method: 'DELETE',
      
     });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    postDoctor,
    postUpdateDoctor,
    getDoctorById,
    deleteDoctor
};
