import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    medicationTime: '/medicationTime',
    update:"/update",
    delete : "/delete",
    getByMedicationPeriod : "/getByMedicationPeriod"
};

 
function getMedicationTime(callback) {
    let request = new Request(HOST.backend_api + endpoint.medicationTime, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getMedicationTimeById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationTime + "/"+params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedicationTime(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationTime , {
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


function postUpdateMedicationTime(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationTime + endpoint.update, {
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

function getMedicationTimeByMedicationPeriod(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationTime + endpoint.getByMedicationPeriod, {
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

function deleteMedicationTime(medicationTimeId, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationTime + endpoint.delete + "/" + medicationTimeId, {
        method: 'DELETE',
      
     });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    getMedicationTime,
    postMedicationTime,
    postUpdateMedicationTime,
    getMedicationTimeById,
    deleteMedicationTime,
    getMedicationTimeByMedicationPeriod
};
