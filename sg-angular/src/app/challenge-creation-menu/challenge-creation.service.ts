import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeCreationService {

  constructor(private httpClient : HttpClient) { }
  postAPIdata(challengeData){
    console.log(challengeData);
    return this.httpClient.post(environment.fireStoreURL+'/addChallenge', challengeData);
  }
//{'exercises' : `${challengeData[0]}`, 'reps' : `${challengeData[1]}`}
}
