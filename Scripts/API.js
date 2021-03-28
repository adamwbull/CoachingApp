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

export function getTimeSince(milliseconds) {
  var seconds = parseInt(milliseconds/1000);
  var ret = 'now';
  var time = 0;
  if (seconds > 5 && seconds <= 60) {
    ret = (seconds > 1) ? seconds + ' secs' : seconds + ' sec';
  } else if (seconds > 60 && seconds < 3600) {
    time = parseInt(seconds/60);
    ret = (time > 1) ? time + ' mins' : time + ' min';
  } else if (seconds >= 3600 && seconds < 86400) {
    time = parseInt(seconds/3600);
    ret = (time > 1) ? time + ' hours' : time + ' hour';
  } else if (seconds >= 86400 && seconds < 31536000) {
    time = parseInt(seconds/86400);
    ret = (time > 1) ? time + ' days' : time + ' day';
  } else if (seconds >= 31536000) {
    time = parseInt(seconds/31536000);
    ret = (time > 1) ? time + ' yrs' : time + ' yr';
  }
  return ret;
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

export async function getMessages(conversationId, token) {

  var ret = false;

  console.log('Getting chat messages...');
  const res = await fetch(url + '/messages/' + conversationId + '/' + token, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('Messages received!');
    ret = payload;
  } else {
    console.log('No messages found.');
  }

  return ret;

}

export async function getConversations(coachId, clientId, clientToken) {

  var ret = false;

  console.log('Getting conversations...');
  const res = await fetch(url + '/conversations/' + coachId + '/' + clientId + '/' + clientToken, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('Conversations retrieved!');
    ret = payload;
  } else {
    console.log('Conversations not found!');
  }

  return ret;

}

export async function getTrophyAssocs(clientId, coachId, token) {

  var ret = false;

  console.log('Getting TrophyAssocs...');
  const res = await fetch(url + '/trophy-assocs/' + clientId + '/' + coachId + '/' + token, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('TrophyAssocs found!');
    ret = JSON.parse(JSON.stringify(payload));
  }

  return ret;

}

export async function deleteUser(id, token, password) {

  var ret = false;
  var arr = {Id:id, Token:token, Password:password};

  console.log('Attempting user deletion...');
  const res = await fetch(url + '/user/delete', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.affectedRows == 1) {
    console.log('Deletion successful!');
    ret = true;
  }

  return ret;

}

export async function updatePassword(id, token, password) {

  var ret = false;
  var arr = {Token:token, NewPassword:password, Id:id};

  console.log('Updating password...');
  const res = await fetch(url + '/user/update-password', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.affectedRows == 1) {
    console.log('Password updated!');
    ret = true;
  }

  return ret;

}

export async function refreshUser(token) {

  var ret = false;

  console.log('Refreshing user data...');
  const res = await fetch(url + '/user/token/' + token, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('Got user!');
    ret = payload[0];
  }

  return ret;

}

export async function uploadAvatar(uri, token) {

  var ret = false;
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];
  let formData = new FormData();
  var ts = Math.floor(Math.random() * (999999 - 0 + 1)) + 0;
  ts = ts.toString();
  formData.append('photo', {
    uri: uri,
    name: `${token}_${ts}.${fileType}`,
    type: `image/${fileType}`,
  });

  console.log('Attempting avatar upload...');
  const res = await fetch(uploadUrl + '/api/avatar', {
    method:'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.affectedRows == 1) {
    console.log('Upload complete!');
    ret = true;
  }

  return ret;

}

export async function createFeatureRequest(token, clientId, description) {

  var ret = false;
  var arr = {Token:token, ClientId:clientId, Description:description};

  console.log('Attempting feature request upload...');
  const res = await fetch(url + '/feature-request/create', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.affectedRows == 1) {
    console.log('Feature request uploaded.');
    ret = true;
  }

  return ret;

}

export async function createBugReport(token, clientId, pageText, description) {

  var ret = false;
  var arr = {Token:token, ClientId:clientId, PageText:pageText, Description:description};

  console.log('Attempting bug report upload...');
  const res = await fetch(url + '/bug-report/create', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.affectedRows == 1) {
    console.log('Bug report uploaded.');
    ret = true;
  }

  return ret;

}

export async function getSurveyResponses(surveyId, clientId, token) {

  var ret = false;

  console.log('Getting previous responses...');
  const res = await fetch(url + '/survey-item-responses/' + surveyId + '/' + clientId + '/' + token, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('Responses received!');
    ret = payload;
  }

  return ret;

}
export async function updatePromptAssoc(token, clientId, coachId, promptId) {

  var ret = false;
  var arr = {Token: token, ClientId:clientId, CoachId:coachId, Id:promptId};

  console.log('Setting PromptAssoc as completed...');
  const res = await fetch(url + '/prompt-assoc/mark-as-complete', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.affectedRows == 1) {
    console.log('Set as completed!');
    ret = true;
  }

  return ret;

}

export async function getConcepts(coachId, clientId) {

  var ret = false;

  console.log('Getting concepts...');
  const res = await fetch(url + '/concept-assoc/both/' + clientId + '/' + coachId + '/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('Prompts received!');
    ret = payload;
  }

  return ret;

}

export async function getPromptResponse(id, clientId, token) {

  var ret = false;

  console.log('Getting prompt response...');
  const res = await fetch(url + '/prompt-response/' + id + '/' + clientId + '/' + token, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length == 1) {
    console.log('Found prompt response!');
    ret = payload;
  }

  return ret;

}

export async function updatePromptResponse(id, promptAssocId, text) {

  var ret = false;
  var arr = {Token:key, Id:id, PromptAssocId:promptAssocId, Text:text};
  console.log('Updating prompt response...');
  const res = await fetch(url + '/prompt-response/update', {
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

export async function createPromptResponse(promptAssocId, text) {

  var ret = false;
  var arr = {Token:key, PromptAssocId: promptAssocId, Text:text};
  console.log('Uploading prompt response...');
  const res = await fetch(url + '/prompt-response/create', {
    method:'POST',
    body: JSON.stringify(arr),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const payload = await res.json();

  if (payload.affectedRows === 1) {
    console.log('Created successfully!');
    ret = true;
  }

  return ret;

}

export async function getPrompts(coachId, clientId) {

  var ret = false;

  console.log('Getting prompts for client...');
  const res = await fetch(url + '/prompt-assoc/both/' + clientId + '/' + coachId + '/' + key, {
    method:'GET'
  });

  const payload = await res.json();

  if (payload.length > 0) {
    console.log('Prompts received!');
    ret = payload;
  }

  return ret;

}

export async function getFeed(coachId) {

  var ret = false;

  console.log('Getting coach feed...');
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

export async function checkOnboardingSurveyCompleted(clientId, token) {

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

  if (payload.affectedRows == 1) {
    console.log("User updated!");
    console.log("Attempting TrophyAssocs creations...");

    var trophyArr = {CoachId:coachId, ClientId:clientId, Token:token};
    const trophyRes = await fetch(url + '/trophy-assocs/create', {
      method:'POST',
      body: JSON.stringify(trophyArr),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const trophyPayload = await trophyRes.json();

    if (trophyPayload.Success === true) {
      console.log('TrophyAssocs created!');
      ret = true;
    }

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

  if (payload.length == 0) {
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

export async function getSurveyArray(surveyId) {

  var ret = false;

  console.log('Getting survey items...');
  const itemsRes = await fetch(url + '/survey-items/' + surveyId + '/' + key, {
    method:'GET'
  });

  const itemsPayload = await itemsRes.json();

  if (itemsPayload.length > 0) {
    console.log('Items found!');
    ret = JSON.parse(JSON.stringify(itemsPayload));
  }


  return ret;

}

export async function getOnboardingSurveyArray(coachId) {

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
