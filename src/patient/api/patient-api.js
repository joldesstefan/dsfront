import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    patient: '/patient',
    update:"/update",
    delete : "/delete",
    setCaregiver : "/setcaregiver",
    getByCaregiver : "/getByCaregiver"
};

 
function getPatient(callback) {
    let request = new Request(HOST.backend_api + endpoint.patient, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getPatientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + "/"+params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postPatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient , {
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
function getPatientByCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient+ endpoint.getByCaregiver , {
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

function postUpdatePatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + endpoint.update, {
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

function setCaregiverPatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + endpoint.setCaregiver, {
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
function deletePatient(patientId, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + endpoint.delete + "/" + patientId, {
        method: 'DELETE',
      
     });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    getPatient,
    postPatient,
    postUpdatePatient,
    getPatientById,
    deletePatient,
    setCaregiverPatient,
    getPatientByCaregiver
};
