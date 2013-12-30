function setradio1()
{
	      var bkg = chrome.extension.getBackgroundPage();
	      if(bkg.settings.aimode == "on")
	      {
		document.getElementById('myradio4').checked = "checked";
	      }
	      if(bkg.settings.aimode == "off")
	      {
		document.getElementById('myradio5').checked = "checked";
	      }
	      if(bkg.settings.aimode == "custom_mess")
	      {
		document.getElementById('myradio6').checked = "checked";
	      }
	      if(bkg.settings.status == "default"){
		document.getElementById('myradio1').checked = "checked";
	      }
	      if(bkg.settings.status == "white"){
		document.getElementById('myradio2').checked = "checked";
	      }
	      if(bkg.settings.status == "black"){
		document.getElementById('myradio3').checked = "checked";
	      }
	      if(bkg.settings.mode == "default"){
		document.getElementById('myradio1').checked = "checked";
	      }
	      if(bkg.settings.mode == "white"){
		document.getElementById('myradio2').checked = "checked";
	      }
	      if(bkg.settings.mode == "black"){
		document.getElementById('myradio3').checked = "checked";
	      }

}

function getlists(storedNames,lname)
{
  var buff = '<table style="border-collapse:collapse;"><tr><th style="border:1px solid black";>Name</th><th style="border:1px solid black";>Remove</th></tr>';
	      
		for (var i=0;i<=storedNames.length;i++)
		{
		  if (storedNames[i] != "" && storedNames[i] != undefined)
		  buff += '<tr><td style="border:1px solid black";>'+storedNames[i]+'</td><td align="center" style="border:1px solid black";><img title="Single Click to Remove Item" id="'+lname+'--'+storedNames[i]+'" class="trash" src="Trash.png"></td></tr>';
		  
		}
	      buff += '</table>';
  return buff;
}
function gettable(jobj){
  buff = '<table style="border-collapse:collapse;"><tr><th style="border:1px solid black;">When Message is </th><th style="border:1px solid black;">Reply with </th><th style="border:1px solid black;">Delete</th></tr><tr>';
	      
	      for (ele in jobj)
	      {
		  buff += "<td style='border:1px solid black;'>"+ele+"</td>"+"<td style='border:1px solid black;'>"+jobj[ele]+"</td>"+"<td align='center' style='border:1px solid black';><img title='Single Click to Remove Item' id='"+ele+"' class='trash' src='Trash.png'></td></tr>";
	
	      }
	      buff += "</tr></table>";
	      return buff;
}
function xss(input)
{
var result=input.replace("<","&lt;").replace(">","&gt;").replace('"',"&quot;") 
return result;
}
function setmode()
{
  if(document.getElementById('myradio2').checked)
  {
    //Setting mode to white
    document.getElementById('textfield').style.visibility='visible';
    document.getElementById('namelist').style.visibility='visible';
    chrome.extension.sendRequest({method: "setmode", name: "white"}, function(response) 
    {
     var bkg = chrome.extension.getBackgroundPage();
	      console.log(bkg.settings.white);
	      var storedNames = JSON.parse(bkg.settings.white);
	      var buff = getlists(storedNames,"white");
	      document.getElementById('namelist').innerHTML = buff;
	      activatedelete();
	      document.getElementById('name').value = "";
    });
  }
 if(document.getElementById('myradio3').checked)
  {
    //Setting mode to black
    document.getElementById('textfield').style.visibility='visible';
    document.getElementById('namelist').style.visibility='visible';
    var bkg = chrome.extension.getBackgroundPage();
      chrome.extension.sendRequest({method: "setmode", name: "black"}, function(response) 
      {
	      var storedNames = JSON.parse(bkg.settings.black);
	      var buff = getlists(storedNames,"black");
	      document.getElementById('namelist').innerHTML = buff;
	      activatedelete();
	      document.getElementById('name').value = "";
      });
  }
 if(document.getElementById('myradio1').checked)
 {
    //Setting mode to All
    document.getElementById('textfield').style.visibility='hidden';
    chrome.extension.sendRequest({method: "setmode", name: "default"}, function(response) 
    {
	      //console.log('adding','deafult');
	      document.getElementById('namelist').style.visibility = 'hidden';
    });
  }
}

function submitvalue()
{
  var c_name = xss(document.getElementById('name').value);
  if(document.getElementById('myradio2').checked)
  {
	      document.getElementById('namelist').style.visibility = 'visible';
	      chrome.extension.sendRequest({method: "addtowhite", name: c_name}, function(response) {
	      console.log('adding',c_name);
	      var bkg = chrome.extension.getBackgroundPage();
	      var storedNames = JSON.parse(bkg.settings.white);
	      var buff = getlists(storedNames,"white");
	      document.getElementById('namelist').innerHTML = buff;
	      activatedelete();
	      document.getElementById('name').value = "";
	      //document.addEventListener('DOMContentLoaded', function () {var a = document.getElementsByClassName("trash");for (var i = 0;i<=a.length;i++){a[i].addEventListener('click', test);}});
	      
   });
  }
  if(document.getElementById('myradio3').checked)
  {
	      document.getElementById('namelist').style.visibility = 'visible';
	      chrome.extension.sendRequest({method: "addtoblack", name: c_name}, function(response) 
	      {
		console.log('adding',c_name);
		var bkg1 = chrome.extension.getBackgroundPage();
		var storedNames = JSON.parse(bkg1.settings.black);
		var buff = getlists(storedNames,"black");
	      document.getElementById('namelist').innerHTML = buff;
	      activatedelete();
	      document.getElementById('name').value = "";
	      
	      });
  }
  if(document.getElementById('myradio1').checked)
  {
	      document.getElementById('namelist').style.visibility = 'visible';
	      document.getElementById('namelist').innerHTML = "Chat Using OurServer";
  }
}

function setaimode()
{
  if(document.getElementById('myradio4').checked)
  {
    document.getElementById('chatlist').style.visibility = 'hidden';
    document.getElementById('textfield1').style.visibility = 'hidden';
    var bkg = chrome.extension.getBackgroundPage();
    bkg.settings.aimode = 'on';
    document.getElementById('static_mess').style.visibility = 'hidden';
    document.getElementById('add2').style.visibility = 'hidden';
  }
  if(document.getElementById('myradio5').checked)
  {
    var bkg1 = chrome.extension.getBackgroundPage();
	      var jobj = JSON.parse(bkg1.settings.chatlist);
	      var buff = gettable(jobj)
	document.getElementById('chatlist').innerHTML = buff;
    
    document.getElementById('chatlist').style.visibility = 'visible';
    document.getElementById('textfield1').style.visibility = 'visible';
    var bkg = chrome.extension.getBackgroundPage();
    bkg.settings.aimode = 'off';
    document.getElementById('static_mess').style.visibility = 'hidden';
    document.getElementById('add2').style.visibility = 'hidden';
  }
  if(document.getElementById('myradio6').checked)
  {
    var bkg1 = chrome.extension.getBackgroundPage();
    document.getElementById('static_mess').style.visibility = 'visible';
    document.getElementById('static_mess').value = bkg1.settings.cust_reply;
    document.getElementById('add2').style.visibility = 'visible';
    var bkg = chrome.extension.getBackgroundPage();
    bkg.settings.aimode = 'custom_mess';
        document.getElementById('chatlist').style.visibility = 'hidden';
    document.getElementById('textfield1').style.visibility = 'hidden';
  }
}

function savechat()
{
  document.getElementById('chatlist').style.visibility = 'visible';
  var ping = xss(document.getElementById('chat').value.toLowerCase());
  var bot_reply = xss(document.getElementById('reply').value.toLowerCase());
  chrome.extension.sendRequest({method: "addtochat", chat: ping,reply:bot_reply}, function(response) 
      {
	      console.log('Adding to chat list');
	      var bkg1 = chrome.extension.getBackgroundPage();
	      var jobj = JSON.parse(bkg1.settings.chatlist);
	      var buff = gettable(jobj);
	      document.getElementById('chatlist').innerHTML = buff;
	      activatedelete();
	      document.getElementById('chat').value = "";
	      document.getElementById('reply').value = "";
      });
}
function savecustomess(){
  var bkg1 = chrome.extension.getBackgroundPage();
  bkg1.settings.cust_reply = document.getElementById('static_mess').value;
}
function remove(message)
{
  var n=message.split("--");
  if(n.length == 2){
    //Which mns user is trying to delete Names
    if(n[0] == "black"){
      chrome.extension.sendRequest({method: "delblack", name: n[1]}, function(response) {
	      var bkg = chrome.extension.getBackgroundPage();
	      var storedNames = JSON.parse(bkg.settings.black);
	      var buff = getlists(storedNames,"black");
	      document.getElementById('namelist').innerHTML = buff;
	      activatedelete();
	      });
    }
    else{
      chrome.extension.sendRequest({method: "delwhite", name: n[1]}, function(response) {
      	      var bkg = chrome.extension.getBackgroundPage();
	      var storedNames = JSON.parse(bkg.settings.white);
	      var buff = getlists(storedNames,"white");
	      document.getElementById('namelist').innerHTML = buff;
	      activatedelete();
	      });
    }
  }
  else{
    
    chrome.extension.sendRequest({method: "delchat", chat: n[0],reply:""}, function(response) 
      {
	      console.log('Deleting chat');
	      var bkg1 = chrome.extension.getBackgroundPage();
	      var jobj = JSON.parse(bkg1.settings.chatlist);
	      var buff = gettable(jobj);
	      document.getElementById('chatlist').innerHTML = buff;
	      activatedelete();

      });
  }
}
function activatedelete(){
  var a = document.getElementsByClassName("trash");
  for (var i = 0;i<=a.length;i++)
  {
    a[i].addEventListener('click', function (){
    remove(this.id);
  });
  }
}

  document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add').addEventListener('click', submitvalue);
  document.getElementById('myradio1').addEventListener('click', setmode);
  document.getElementById('myradio2').addEventListener('click', setmode);
  document.getElementById('myradio3').addEventListener('click', setmode);
  
  document.getElementById('myradio4').addEventListener('click', setaimode);
  document.getElementById('myradio5').addEventListener('click', setaimode);
  document.getElementById('myradio6').addEventListener('click', setaimode);
  document.getElementById('add1').addEventListener('click', savechat);
  document.getElementById('add2').addEventListener('click', savecustomess);

  setradio1();

});
