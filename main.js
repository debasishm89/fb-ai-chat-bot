var int=self.setInterval(function(){check()},500);
function closeexisting(){
  try{var online = document.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')}
  catch(err){}
   for (var i = 0;i <= online.length ; i++ ){
     online[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].click()
   }
}
function getreply(main_msg,fbid)
{
  $.post("http://chitchatbabes.appspot.com/ai",
    {
      "message":main_msg
    },
    function(data,status)
    {
	var jobj = JSON.parse(data)
	send_to_fb(fbid,jobj['response']);
     });
}
function send_to_fb(fb_id,message)
{
    console.log('Sending is to Facebook');
    csrf = document.getElementsByName('fb_dtsg')[0].value;
	$.post("/ajax/mercury/send_messages.php",
	{
	  "message_batch[0][source]":"source:chat:web",    
	  "message_batch[0][body]":message,
	  "message_batch[0][specific_to_list][0]":"fbid:"+fb_id,   
	  "fb_dtsg":csrf
	},
	  function(data,status){
	      //Do nothing
	    });
}
function checkwhite(name)
{
  var flag = "";
      chrome.extension.sendRequest({method: "getLocalStorage", key: "white"}, function(response) 
      {
	if(response.data.indexOf(name) != -1)
	{
	  /*Not present Present*/
	  console.log(name,"present in white",response.data.indexOf(name))
	  console.log('sending yes');
	  flag = "yes";
	}
      });
      return flag;
}
function checkblack(name)
{
      
}
function process_message(fb_id,last_mess,elem1)
{
chrome.extension.sendRequest({method: "getLocalStorage", key: "aimode"}, function(response) 
{
	var aimode = response.data;
	if(aimode == "on")
	{
	  getreply(last_mess,fb_id);
	  elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';
	}
	if(aimode == "off")
	{
	/*check if incomming message present in Data Base*/
	 chrome.extension.sendRequest({method: "getLocalStorage", key: "chatlist"}, function(response) 
	{
		var chatlist = response.data;
		var chatlist_obj = JSON.parse(chatlist)
		if(chatlist_obj[last_mess] == undefined){
		console.log("Message not Present in DB");
		send_to_fb(fb_id,"Be right back..:)"); /*Reply with a static message if not exist in DB*/
		elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';
		}
		else{
		console.log("Replying with custom message");
		send_to_fb(fb_id,chatlist_obj[last_mess]);
		elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';
		}
	});			
	}
	if(aimode == "custom_mess")
	{
	 
	  chrome.extension.sendRequest({method: "getLocalStorage", key: "static_mess"}, function(response) 
	  {
		var cmess = response.data;
		send_to_fb(fb_id,cmess);
		elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';
	  });
	}
				      
});
  
}
function check()
{
    console.log('Start Check')
    chrome.extension.sendRequest({method: "getLocalStorage", key: "status"}, function(response) {
    var stat = response.data;
    //console.log("Current Status is ",stat);
    console.log('Status is ',stat);
    if( stat == "on")
    {
      try{var online = document.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')}catch(err){}    
      for (var i = 0;i <= online.length ; i++ ){
	try 
	{
	    var name = online[i].getElementsByClassName('titlebarTextWrapper')[0].childNodes[1].innerHTML;   //Name
	    
	    var elem1 = online[i].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes;
	    var last_mess = elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML;
	    var fb_id = online[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[4].childNodes[0].getAttribute('href').split('/')[4]
	    console.log(name,fb_id,last_mess);
	    if( elem1[elem1.length-1].childNodes[0].childNodes[1].getAttribute('aria-label') == "You")
	    {
		//console.log("Its your message ");
	    }
	    else
	    {
		if(last_mess.charAt(last_mess.length-2) == "✔")	//if not replied
		{
		    //console.log("Already Replyed to this message ");
		}
		 else
		 {
		    chrome.extension.sendRequest({method: "getLocalStorage", key: "mode"}, function(response) 
		    {
			var mode = response.data;
			if(mode == "default")
			{
				  console.log('will reply to this message');
				  chrome.extension.sendRequest({method: "getLocalStorage", key: "aimode"}, function(response) {var aimode = response.data;if(aimode == "on"){getreply(last_mess,fb_id);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}if(aimode == "off"){chrome.extension.sendRequest({method: "getLocalStorage", key: "chatlist"}, function(response){var chatlist = response.data;var chatlist_obj = JSON.parse(chatlist)if(chatlist_obj[last_mess] == undefined){console.log("Message not Present in DB");send_to_fb(fb_id,"Be right back..:)");elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}else{console.log("Replying with custom message");send_to_fb(fb_id,chatlist_obj[last_mess]);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}});}if(aimode == "custom_mess"){chrome.extension.sendRequest({method: "getLocalStorage", key: "static_mess"}, function(response){var cmess = response.data;send_to_fb(fb_id,cmess);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';});}});
			 }
			 else if(mode == "white"){
			   console.log("white mode",checkwhite(name));
			   chrome.extension.sendRequest({method: "getLocalStorage", key: "white"}, function(response) 
			   {
			      if(response.data.indexOf(name) != -1)
			      {
				  /*Not Present in White*/
				  console.log(name,"present in white",response.data.indexOf(name))
				  chrome.extension.sendRequest({method: "getLocalStorage", key: "aimode"}, function(response) {var aimode = response.data;if(aimode == "on"){getreply(last_mess,fb_id);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}if(aimode == "off"){chrome.extension.sendRequest({method: "getLocalStorage", key: "chatlist"}, function(response){var chatlist = response.data;var chatlist_obj = JSON.parse(chatlist)if(chatlist_obj[last_mess] == undefined){console.log("Message not Present in DB");send_to_fb(fb_id,"Be right back..:)");elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}else{console.log("Replying with custom message");send_to_fb(fb_id,chatlist_obj[last_mess]);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}});}if(aimode == "custom_mess"){chrome.extension.sendRequest({method: "getLocalStorage", key: "static_mess"}, function(response){var cmess = response.data;send_to_fb(fb_id,cmess);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';});}});
			      }
			      else{console.log('The person is not white listed so will not reply');}
			    });
			}
			 else if(mode == "black")
			 {
			   chrome.extension.sendRequest({method: "getLocalStorage", key: "black"}, function(response) 
			   {
			      if(response.data.indexOf(name) == -1)
			      {
				  /*Not Present in Black*/
				  console.log(name,"not present in black",response.data.indexOf(name))
				  chrome.extension.sendRequest({method: "getLocalStorage", key: "aimode"}, function(response) {var aimode = response.data;if(aimode == "on"){getreply(last_mess,fb_id);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}if(aimode == "off"){chrome.extension.sendRequest({method: "getLocalStorage", key: "chatlist"}, function(response){var chatlist = response.data;var chatlist_obj = JSON.parse(chatlist)if(chatlist_obj[last_mess] == undefined){console.log("Message not Present in DB");send_to_fb(fb_id,"Be right back..:)");elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}else{console.log("Replying with custom message");send_to_fb(fb_id,chatlist_obj[last_mess]);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';}});}if(aimode == "custom_mess"){chrome.extension.sendRequest({method: "getLocalStorage", key: "static_mess"}, function(response){var cmess = response.data;send_to_fb(fb_id,cmess);elem1[elem1.length-1].childNodes[1].childNodes[1].innerHTML = last_mess+'[✔]';});}});
			      }
			      else{console.log('The person is black listed so will not reply');}
			    });
			}
		    });
				
		}
	    }
	}
      catch(err){
	//console.log("Handles Exception!");
      }
    }
    }
    });
}