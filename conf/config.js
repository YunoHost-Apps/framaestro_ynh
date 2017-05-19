var framanav = lstu = jitsi = kiwi = together = '';
var framaServices = Array();

/** -------------------- Framaestro.org Config --------------------- **/
/** <settings> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
jitsi = 'https://framatalk.org';
kiwi = 'https://kiwiirc.com/client/';
//together = 'https://__TOGETHERJS__';

framaServices = {
}
/** </settings> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/

// Show/Hide Framastuffs if needed
// Framanav
if(framanav != undefined && framanav != '') {
  var script = document.createElement('script');
      script.type = "text/javascript";
      script.src= framanav;
      document.getElementsByTagName('head')[0].appendChild(script);
}

$(document).ready(function() {
  // Framatalk
  if( !/^https:\/\//.test(jitsi) ) $('#btnTalk').hide();

  // Frama.link
  if( !/^https:\/\//.test(lstu) ) $('#sLBtn, sLCoBtn').hide();

  // Kiwi
  if( !/^https:\/\//.test(kiwi) ) $('#btnIRC').hide();

  // TogetherJS
  if( !/^https:\/\//.test(together) ) {
    $('#collabOptions').hide();
    $('#collabOptions').next('.form-group').hide();
  }

  // Framaservices
  if(framaServices == undefined || framaServices.length == 0) {
    $('#framaServices').parent().hide();
  }
});

/** --------------------- TogetherJS Config ------------------------ **/
/**
 * The URL ends with &togetherjs=[a-zA-Z0-9]{8}[0-9a-z]{2}
 * when TogetherJS is running.
 * The last 2 chars are used for the configuration
 * and converted from base36 to base2.
 **/
var HASH = window.location.hash;
var SHAREID = '00';
f$ = jQuery;
TogetherJSConfig_autoStart = false;

// Get the shareId from the hash
if( HASH.substr(-22,12)=='&togetherjs=') {
  SHAREID = HASH.substr(-10,10);
  TogetherJSConfig_autoStart = true;
}
// If there is an active session then get this shareId instead
var TogetherJSSession = sessionStorage.getItem('togetherjs-session.status');
if( TogetherJSSession ) {
  TogetherJSSession = JSON.parse(TogetherJSSession);
  if( TogetherJSSession.shareId ) {
    SHAREID = TogetherJSSession.shareId
    TogetherJSConfig_autoStart = true;
  }
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

var CONFIG = zeroPad(parseInt(SHAREID.substr(-2,2), 36).toString(2), 6);

TogetherJSConfig_siteName = "Framaestro";
TogetherJSConfig_toolName = " ";
TogetherJSConfig_hubBase = together;

TogetherJSConfig_dontShowClicks = CONFIG.substr(-4,1) == '0';
 MaestroJSConfig_dontShowCursor = CONFIG.substr(-3,1) == '0'; // Custom config for Maestro
TogetherJSConfig_cloneClicks = false;
TogetherJSConfig_suppressJoinConfirmation = true;
TogetherJSConfig_suppressInvite = true;
TogetherJSConfig_inviteFromRoom = false;
TogetherJSConfig_youtube = false;
TogetherJSConfig_disableWebRTC = CONFIG.substr(-2,1) == '0';
 MaestroJSConfig_disableChat = CONFIG.substr(-1,1) == '0'; // Custom config for Maestro
TogetherJSConfig_lang = "fr-FR";
TogetherJSConfig_fallbackLang = "fr-FR";
TogetherJSConfig_ignoreMessages = true;
TogetherJSConfig_ignoreForms = true;
 MaestroJSConfig_disableTile = CONFIG.substr(-5,1) == '0'; // Custom config for Maestro
 MaestroJSConfig_disablePush = CONFIG.substr(-6,1) == '0'; // Custom config for Maestro

// Disable Walktrough at startup
localStorage.setItem("togetherjs.settings.seenIntroDialog", true);
localStorage.setItem("rtc.settings.seenIntroDialog", true);

$(document).ready(function() {
  if(TogetherJSConfig_autoStart && !TogetherJS.running ) {
    $('#btnTogetherJS').show();
  }
});

TogetherJSConfig_on_ready = function () {

  if( !MaestroJSConfig_disableChat )    { $('#btnChat').show(); }
  if( !TogetherJSConfig_disableWebRTC ) { $('#btnAudio').show(); }
  if( !MaestroJSConfig_dontShowCursor ) { $('head').append('<style>.togetherjs-cursor,.togetherjs-cursor[style]{display:block !important}</style>'); }
  if( TogetherJS.running ) {
    $('#btnTogetherJS').hide();
    if( !MaestroJSConfig_disablePush ) { $('#btnSync').show() };
  }

};

TogetherJSConfig_on_close = function () {
  $('#btnAudio, #btnChat, #btnSync').hide();
  $('#btnTogetherJS').show();
};

console.log('Id '+SHAREID+' : clic '+!TogetherJSConfig_dontShowClicks+
                          ' ; curseur '+!MaestroJSConfig_dontShowCursor+
                          ' ; audio '+!TogetherJSConfig_disableWebRTC+
                          ' ; chat '+!MaestroJSConfig_disableChat+
                          ' ; tile '+!MaestroJSConfig_disableTile+
                          ' ; sync '+!MaestroJSConfig_disablePush)
