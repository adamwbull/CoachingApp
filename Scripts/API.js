import React from 'react';
import { AsyncStorage } from 'react-native';

// Useful variables
const url = 'https://api.coachsync.me';
const key = 'donthackme,imjustadevelopertryingmybest!';

// Helper Functions
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

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateText = months[date.getMonth()] +
                          " " + date.getDate() +
                          ", " + date.getFullYear();
    return dateText;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function containsSpecialCharacters(str){
    var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	return regex.test(str);
}

function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

// API Access Functions
/* Example
export async function checkOnboardingId(id) {

  console.log('');
  const res = await fetch(url + '', {
    method:''
  });

  const payload = await res.json();

}
*/

// Returns Id, FirstName, LastName, Email, Avatar, DOB, Created on success.
export async function loginCheck(email, password) {

  ret = null;

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

export async function checkOnboardingId(id) {

  var ret = null;

  console.log('Checking OnboardingId...');
  const res = await fetch(url + '/user/onboarding-id/' + id + '/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length == 1) {
    console.log('OnboardingId passed!');
    ret = JSON.stringify(payload[0]);
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
