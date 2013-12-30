function main()
{

  var bkg = chrome.extension.getBackgroundPage();
	      
    var myvar = bkg.settings.status;
    if(myvar == "on")
    {
	document.getElementById('button').value = "Turn Off";
    }
    if(myvar == "off")
    {
      chrome.browserAction.setIcon({path: 'logobw.png'});
	document.getElementById('button').value = "Turn On";
    }

}
function change()
{
    var bkg2 = chrome.extension.getBackgroundPage();
    var myvar1 = bkg2.settings.status;
  if(myvar1 == "on")
  {
	chrome.browserAction.setIcon({path: 'logobw.png'});
	      var bkg = chrome.extension.getBackgroundPage();
	      bkg.settings.status = 'off';
      document.getElementById('button').value = "Turn On";
      console.log(localStorage["status"]);
  }
  if(myvar1 == "off")
  {
	  chrome.browserAction.setIcon({path: 'logo.png'});
	  
	      var bkg = chrome.extension.getBackgroundPage();
	      bkg.settings.status = 'on';
	      document.getElementById('button').value = "Turn Off";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('button').addEventListener('click', change);
  main();
});
