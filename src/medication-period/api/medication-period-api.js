import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    medicationPeriod: '/medicationPeriod',
    update:"/update",
    delete : "/delete",
    getByPatient : "/getByPatient"
};

 
function getMedicationPeriod(callback) {
    let request = new Request(HOST.backend_api + endpoint.medicationPeriod, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getMedicationPeriodById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPeriod + "/"+params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedicationPeriod(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPeriod , {
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


function postUpdateMedicationPeriod(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPeriod + endpoint.update, {
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

function getMedicationPeriodByPatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPeriod + endpoint.getByPatient, {
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

function deleteMedicationPeriod(medicationPeriodId, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPeriod + endpoint.delete + "/" + medicationPeriodId, {
        method: 'DELETE',
      
     });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    getMedicationPeriod,
    postMedicationPeriod,
    postUpdateMedicationPeriod,
    getMedicationPeriodById,
    deleteMedicationPeriod,
    getMedicationPeriodByPatient
};
