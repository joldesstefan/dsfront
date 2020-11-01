import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    medication: '/medication',
    update:"/update",
    delete : "/delete"
};

 
function getMedication(callback) {
    let request = new Request(HOST.backend_api + endpoint.medication, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getMedicationById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + "/"+params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedication(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medication , {
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


function postUpdateMedication(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + endpoint.update, {
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

function deleteMedication(medicationId, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + endpoint.delete + "/" + medicationId, {
        method: 'DELETE',
      
     });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    getMedication,
    postMedication,
    postUpdateMedication,
    getMedicationById,
    deleteMedication
};
