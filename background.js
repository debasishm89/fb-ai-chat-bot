
// Listens when new request


chrome.webRequest.onHeadersReceived.addListener(function(details) {
  for (i = 0; i < details.responseHeaders.length; i++) {
    if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
      var csp = details.responseHeaders[i].value;
      // append "https://mysite.com" to the authorized sites
      csp = csp.replace('connect-src', 'connect-src http://chitchatbabes.appspot.com/');
      details.responseHeaders[i].value = csp;
    }
  }
  return { // Return the new HTTP header
    responseHeaders: details.responseHeaders
  };
}, {
  urls: ["*://www.facebook.com/*"],
  types: ["main_frame"]
}, ["blocking", "responseHeaders"]);
 
 
function isCSPHeader(headerName) {
  return (headerName == 'CONTENT-SECURITY-POLICY') || (headerName == 'X-WEBKIT-CSP');
}
localStorage['static_mess'] = "I'm bit busy right now..Be right Back :)";
localStorage["white"] = '["White Listed Name"]';
localStorage["black"] = '["Black Listed Name"]';
localStorage["mode"] = "deafult"; //Three mode default,white,black
localStorage['status'] = "on";
localStorage['cust_reply'] = "off";
localStorage['dict'] = '{}';
localStorage['aimode'] = 'on'; /*on,off,custom_mess*/
chatdb = {"hi":"hello","bye":"bye bye :)"};
localStorage.setItem('chatlist', JSON.stringify(chatdb));

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{
    if (request.method == "getLocalStorage")
    {
      sendResponse({data: localStorage[request.key]});//Get Current status if on or off
    }
    else
    {
      sendResponse({});
    } // snub them.
     if (request.method == "fetchdata")
     {
      sendResponse({data: localStorage[request.key]});
     }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "addtowhite"){
      var storedNames = JSON.parse(localStorage["white"]);
      storedNames.push(request.name);
      localStorage["white"] = JSON.stringify(storedNames);
    }
    if (request.method == "delwhite"){
      var storedNames = JSON.parse(localStorage["white"]);
      storedNames.pop(request.name);
      localStorage["white"] = JSON.stringify(storedNames);
    }
    if (request.method == "addtoblack"){
      var storedNames = JSON.parse(localStorage["black"]);
      storedNames.push(request.name);
      localStorage["black"] = JSON.stringify(storedNames);
    }
    if (request.method == "delblack"){
      var storedNames = JSON.parse(localStorage["black"]);//Get what already stored
      storedNames.pop(request.name);		//POP the name
      localStorage["black"] = JSON.stringify(storedNames);		// Again save the name to localstorage       
    }
    if (request.method == "setmode"){
      localStorage["mode"] = request.name;		// Again save the name to localstorage       
    }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "addtochat"){
      var a = localStorage['chatlist']
      var jobj = JSON.parse(a);
      jobj[request.chat] = request.reply;
      localStorage['chatlist'] = JSON.stringify(jobj);
    }
    if (request.method == "delchat"){
      var a = localStorage['chatlist']
      var jobj = JSON.parse(a);
      delete jobj[request.chat]
      localStorage['chatlist'] = JSON.stringify(jobj);
    }

});

settings = 
{
    get white()
    {
      return localStorage['white'];
    },
    get black()
    {
       return localStorage['black'];
      
    },
    get chatlist()
    {
       return localStorage['chatlist'];
      
    },
    set aimode(val)//Setting UP AI Mode on or off.
    {
      localStorage['aimode'] = val;
    },
    get aimode(val)//Setting UP AI Mode on or off.
    {
      return localStorage['aimode'];
    },
    set status(val)//Setting UP AI Mode on or off.
    {
      localStorage['status'] = val;
    },
    get status(val)//Setting UP AI Mode on or off.
    {
      return localStorage['status'];
    },
    get mode(val)//Setting UP AI Mode on or off.
    {
      return localStorage['mode'];
    },
    get cust_reply(val)//Setting UP AI Mode on or off.
    {
      return localStorage['static_mess'];
    },
    set cust_reply(val)//Setting UP AI Mode on or off.
    {
      localStorage['static_mess'] = val;
    }
}
