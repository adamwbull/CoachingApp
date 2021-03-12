import React from 'react';
import { AsyncStorage } from 'react-native';

// Useful variables
export const url = 'https://api.coachsync.me';
export const uploadUrl = 'https://db.coachsync.me';
export const key = 'donthackme,imjustadevelopertryingmybest!';

// Helper Functions
export function sqlToJsDate(sqlDate){
  var t = sqlDate.split(/[-:T.Z]/);
  return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5], t[6]));
}

export function parseDateText(date) {

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const dateText = months[date.getMonth()] +
                          " " + date.getDate() +
                          ", " + date.getFullYear() +
                          " " + hours + ":" + minutes +
                          " " + ampm;
    return dateText;
}

export function parseSimpleDateText(date) {

    if (!Object.prototype.toString.call(date) === "[object Date]") {
      date = Date.parse(date);
    }

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateText = months[date.getMonth()] +
                          " " + date.getDate() +
                          ", " + date.getFullYear();
    return dateText;
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function containsSpecialCharacters(str){
    var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	return regex.test(str);
}

export function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

// API Access Functions
/* Example
export async function check() {

  var ret = false;

  console.log('');
  const res = await fetch(url + '', {
    method:''
  });

  const payload = await res.json();

  if (payload) {
    console.log('');
    ret = true;
  }

  return ret;

}
*/

export async function getFeed(coachId) {

  var ret = false;

  console.log('Getting coach feed...');
  console.log(url + '/feed/all/' + coachId + '/' + key);
  const res = await fetch(url + '/feed/all/' + coachId + '/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('Feed retrieved!');
    ret = JSON.parse(JSON.stringify(payload));
  }

  return ret;

}

export async function getLinkItems(coachId) {

  var ret = false;

  console.log('Getting coach links...');
  const res = await fetch(url + '/link-item/' + coachId + '/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('Links retrieved!');
    ret = JSON.parse(JSON.stringify(payload));
  }

  return ret;

}

export async function getOnboardingContract(coachId) {

  var ret = false;

  console.log('Retrieving contract info for Id: ' + contractId);
  const res = await fetch(url + '/contract/' + coachId + '/1/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length === 1) {
    console.log('Contract found. Give to user...');
    ret = payload[0];
  }

  return ret;


}

export async function getOnboardingPayment(coachId) {

  var ret = false;

  const surveyRes = await fetch(url + '/survey/onboarding/' + coachId + '/' + key, {
    method:'GET'
  });

  const surveyPayload = await surveyRes.json();

  var paymentId = JSON.stringify(surveyPayload[0]['PaymentId']);

  console.log('Retrieving payment info for Id: ' + paymentId);
  const res = await fetch(url + '/payment/'+paymentId+'/'+key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length === 1) {
    console.log('Payment prompt found. Give to user...');
    ret = payload[0];
  }

  return ret;

}

export async function checkSurveyCompleted(clientId, token) {

  var ret = false;

  console.log('Checking if survey was completed already...');
  const res = await fetch(url + '/survey-item-responses/' + clientId + '/' + token, {
    method:'GET'
  });

  const payload = await res.json();
  if (payload.length >= 1) {
    console.log('Survey was completed already!');
    ret = true;
  } else {
    console.log('Survey has not been completed.');
  }

  return ret;

}

export async function updateOnboardingCompleted(id, token) {

  var ret = false;
  var arr = {Id:id, Token:token};

  console.log('Updating OnboardingCompleted...');
  const res = await fetch(url + '/user/client/complete-onboarding', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.affectedRows === 1) {
    console.log('Updated successfully!');
    ret = true;
  }

  return ret;

}

// Upload survey responses.
export async function uploadResponses(responses, token) {

  var ret = false;

  var body = {Token:token, Responses:responses};

  console.log('Uploading survey responses...')
  const res = await fetch(url + '/survey-item-responses/create', {
    method:'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.Success === 1) {
    console.log('Responses uploaded!');
    ret = true;
  }

  return ret;

}

// Create client account.
export async function createAccount(client) {

  var ret = null;

  console.log('Attempting account creation...');
  const res = await fetch(url + '/user/client/create', {
    method:'POST',
    body: JSON.stringify(client),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.hasOwnProperty('insertId')) {
    console.log('Creation passed!');
    ret = payload.insertId;
  }

  return ret;

}

// Check if email is taken.
export async function emailCheck(email) {

  var ret = true;

  if (email === '') {
    email = 'blankEmail';
  }

  console.log('Checking for existing email...');
  const res = await fetch(url + '/user/email/' + email + '/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length === 0) {
    console.log('Email not taken!');
    ret = false;
  }

  return ret;

}

// Return basic info about a coach.
export async function getCoach(coachId, token) {

  var ret = false;

  console.log('Getting coach info...');
  const res = await fetch(url + '/user/coach/' + coachId + '/' + token, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length === 1) {
    console.log('Coach info returned!');
    ret = payload[0];
  }

  return ret;

}

// Returns all info about client on success.
export async function loginCheck(email, password) {

  var ret = null;

  console.log('Attempting login...');
  const res = await fetch(url + '/user/login-check/' + email + '/' + password + '/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length == 1) {
    console.log('Login check passed!');
    ret = JSON.stringify(payload[0]);
  }

  return ret;

}

export async function createPair(coachId, clientId, token) {

  var ret = false;
  var arr = {Token:token, CoachId:coachId, Id:clientId};

  console.log('Attempting to create pair...');
  const res = await fetch(url + '/user/client/create-pair', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.rowsAffected == 1) {
    console.log("User updated!");
    ret = true;
  }

  return ret;

}

export async function userInPair(coachId, clientId, token) {

  var ret = false;
  console.log('Checking if user is in pair...');
  const res = await fetch(url + '/user/client/pair/' + coachId + '/' + clientId + '/' + token, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload[0]["CoachId"] === -1) {
    console.log('User is not in pair!');
    ret = true;
  } else {
    console.log('User is in pair!');
  }

  return ret;

}

export async function checkOnboardingId(id) {

  var ret = null;

  if (id == '') {
    id = 'blabla';
  }

  console.log('Checking OnboardingId...');
  const res = await fetch(url + '/user/onboarding-id/' + id + '/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length == 1) {
    console.log('OnboardingId passed!');
    ret = JSON.stringify(payload[0]);
  } else {
    console.log('OnboardingId does not exist.');
  }

  return ret;

}

export async function getSurveyArray(coachId) {

  const surveyRes = await fetch(url + '/survey/onboarding/' + coachId + '/' + key, {
    method:'GET'
  });

  const surveyPayload = await surveyRes.json();

  var surveyId = JSON.stringify(surveyPayload[0]['Id']);

  const itemsRes = await fetch(url + '/survey-items/' + surveyId + '/' + key, {
    method:'GET'
  });

  const itemsPayload = await itemsRes.json();

  var items = JSON.parse(JSON.stringify(itemsPayload));

  return items;

}
