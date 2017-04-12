var DRYOBJ = ( function ( ) {

	/*################  ES5 pragma  ######################*/
	'use strict';	

	// ALL FORESEEABLE HOISTS	
	// ############################
	// ## 	_bpms
	// ## // ( 1.1% or 0.011 (mult.x) 1.40625 seconds / 1406.25ms
	// ##     Credit to don Lucho's musical talents
	// ############################
	var _bpms = 15.46875;

	// The Browser Prefixes
	var _arVendorPREs = [ "moz", "ms", "webkit", "o" ];

	// ######################
	// ##   Window object
	// ######################
	var _window = window; 

	// ######################
	// ##   body element
	// ######################
	var _body = window.document.body; 
	var _getBodyHeight = window.document.body.offsetHeight;

	// ######################
	// ##   WINDOW CHROME 
	// ######################
	var _navigator = window.navigator;
	
	// ######################
	// ##   Generic Element offsetTop
	// ######################	
	function _Get_OffsetTop( elObj ) {
		return elObj.offsetTop;
	}

	// ######################
	// ##   Generic Element Height
	// ######################	
	function _Get_OffsetHeight( elObj ) {
		return elObj.offsetHeight;
	}

	// ############################
	// ## 
	// ##     AddEventoHandler Facade Pattern Function
	// ##     function _AddEventoHandler(nodeFlanders, type, callback) {}
	// ##     
	// ##     
	// ##     Previously designed to minimize anticipated 
	// ##     disconnect between each the W3C/Netscape
	// ##     and IE8 browser implementation models
	// ##     
	// ##     Motivated by each Douglas "Release The 'Crock'" Crockford, John Resig, 
	// ##     Dean Edwards, and Sunday evenings on FOX from many, many, many years ago-- ¡Grax a todos! (Thank you all)
	// ##     
	// ##     As of January 2017, this is no longer necessary and is an item in progress
	// ##     in terms of weaning away from PRESENTLY unsupported versions of IE. :)
	// ##     
	// ##     
	// ############################
	function _AddEventoHandler( nodeFlanders, type, callback ) {
		if( type !== "DOMContentLoaded") { 
			if( nodeFlanders.addEventListener ) { 
				// W3C browser implementation 
				nodeFlanders.addEventListener( type, callback, false);
			}		
			else	
			if( nodeFlanders.attachEvent ) { 
				// IE8-- browser implementation 
				nodeFlanders.attachEvent( "on" + type, callback );
			} 		
			else { 
				// Classical Event model
				nodeFlanders["on" + type] = callback; 
			}
		}
		else 
		if( type === "DOMContentLoaded" ) { 
			if( nodeFlanders.addEventListener ) { 
				// W3C browser implementation 
				nodeFlanders.addEventListener( type, callback, false);
			}
			else 
			if( nodeFlanders.attachEvent ) { 
				if( nodeFlanders.readyState === "loading" ) {
					nodeFlanders.onreadystatechange = callback;
				}
			}
			else { 
				// Classical Event model
				nodeFlanders["on" + type] = callback; 
			}
		}
	}

	// ############################
	// ## 
	// ## function _RetEVTsrcEL_evtTarget(leEvt){}
	// ## 
	// ## // IE and w3c MODELS 
	// ## Motivated by each Robert Nyman and "Doc Crock". Hip-hip!
	// ############################
	function _RetEVTsrcEL_evtTarget( leEvt ) { 
		if( typeof leEvt !== "undefined") { 
			var _EREF = leEvt; 		// w3c
		}
		else {
			var _EREF = window.event; // IE8--
		}
		if( typeof _EREF.target !== "undefined") {
			var evtTrgt = _EREF.target;	// w3c 
			//	console.log( "_EREF.target..." + _EREF.target);  // Temporarily SHUT-OFF, dL, 2013_0608 1720H
		}
		else {
			var evtTrgt = _EREF.srcElement; // IE8--
			//  console.log( "_EREF.srcElement..." + _EREF.srcElement ); // Temporarily SHUT-OFF, dL, 2013_0608 1720H
		}
		return evtTrgt;
	}
	// IMPLEMENTATION FOR TESTING PURPOSES
	// var evtTrgt = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt ); console.log(evtTrgt);

	// ############################
	// ## 
	// ## UTILITARIAN FUNCTION
	// ## function _RetValFalprevDef(leEvt){}
	// ## 
	// ## // IE
	// ## window.event.returnValue = false;
	// ## 
	// ## // w3c
	// ## window.event.preventDefault();
	// ## Motivated by each Robert Nyman and "Doc Crock". Hip-hip!
	// ############################	
	function _RetValFalprevDef( leEvt ) { 
		if( typeof leEvt !== "undefined") {
			var _EREF = leEvt;  // W3C
		} 
		else {
			var _EREF = window.event; // IE8--
		}		
		if( _EREF.preventDefault) {
			_EREF.preventDefault(); 
		}
		else {
			_EREF.returnValue = false; // IE8 // _EREF.returnValue = true // --> polar opposite	
		}
	}

	// ######################
	// ##   Generic Return Property Routine 
	// ##   with pm1( JSProp) and pm2( DOM_el_ex_document_or_OTHER ) 
	// ##   and pm2( DOM_el_ex_document_or_OTHER ) 
	// ######################	
	
	function _RetPropertyRoutine( pm1, pm2 ) { 
		
		if( pm1 === "BlobBuilder" ) {
			var ar_vendorPreez = [ "webkit" , "WebKit" , "moz" , "Moz" , "o" , "O" , "ms" , "MS" ]; // --> // object
		}
		else {
			var ar_vendorPreez = _arVendorPREs; // [ "moz", "ms", "webkit", "o" ]  --> // object
		} 
		
		var clCharMax = ar_vendorPreez.length; // 3 			
		var leProp;
		var dL;
		var param = pm1; // getUserMedia
		var paramEl = pm2; // Navigator
		var len = param.length; 
		var nc = param.slice( 0,1 ); // g
		var Uc = param.slice( 0,1 ).toUpperCase(); // G
		var Param = param.replace( nc, Uc ); // GetUserMedia	
		if ( param in paramEl ) { 
			leProp = param; 
		} 
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
				leProp = ar_vendorPreez[ dL ] + Param; 
			} 
		} 
		return leProp;
	}
	
	// ######################
	// ##   Generic CSS Property Constructor Routine 
	// ##   with pm1( CSSProp ) 
	// ##   and pm2( document.createElement("div").style ) 
	// ######################	
	
	function _ReturnJSProperty( pm1 ) { // ( pm1, pm2 ) 
		var pm2 = document.createElement("div").style; // 
		var ar_vendorPreez = _arVendorPREs; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		var leProp;
		var dL;
		
		var param = pm1; // " transform "
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // T
		
		var Param = param.replace( nc, Uc ); // transform	
		if ( param in paramEl ) { 
			leProp = param; 
		} 
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
		// " transform " --> msTransform, webkitTransform, oTransform, mozTransform
				leProp = ar_vendorPreez[ dL ] + Param; 
			} 
		} 
		return leProp;
	}

	// ######################
	// ##   Return CSS Property Routine 
	// ##   with pm1( CSSProp ) 
	// ##   and pm2( document.createElement("div").style ) 
	// ######################	
	
	function _ReturnCSSProperty( pm1 ) { // ( pm1, pm2 ) 
		var dashChar = "-";
		var pm2 = document.createElement("div").style;  
		var ar_vendorPreez = _arVendorPREs; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		var leProp;
		var dL;
		
		var param = pm1; // " transform "
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // T
		
		var Param = param.replace( nc, Uc ); // transform	
		if ( param in paramEl ) { 
			leProp = param; 
		} 
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
		// " transform " --> -ms-transform, -webkit-transform, -o-transform, -moz-transform
				leProp = dashChar + ar_vendorPreez[ dL ] + dashChar + param; 
			} 
		} 
		return leProp;
	}
	
	// ############################
	// ##   Return CSS Keyframe Animation Routine 
	// ##   with pm1( CSSProp ) 
	// ##   that is later helpful in obtaining 
	// ##   "the ampersand + keyframes" property
	// ############################
	
	function _Returnkeyframes( pm1 ) { // ( pm1 ) 
		var dashChar = "-";
		var ampChar = "@";
		
		var pm2 = document.createElement("div").style; // 
		var ar_vendorPreez = [ "moz", "ms", "webkit", "o" ]; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		
		var keyframes; // var leProp;
		var dL;
		
		var param = pm1; // "animationName" 
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // a // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // A // T
		
		var Param = param.replace( nc, Uc ); // animationName 
		if ( param in paramEl ) { 
			// leProp = param; 
			keyframes = ampChar + "keyframes"; 
		} 
		
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
				// leProp = dashChar + ar_vendorPreez[ dL ] + dashChar + param; 
				
		// " @keyframes " --> @-ms-keyframes, @-webkit-keyframes, @-o-keyframes, @-moz-keyframes
				keyframes = ampChar + dashChar + ar_vendorPreez[ dL ] + dashChar + "keyframes"; //
			} 
		} 
		//return leProp;
		return keyframes;
	}


	// END of _private properties 
	return {

		RetELs : {
			glow : function() { 
				return _window; 
			} ,
			bodyEL : function() { 
				return _body; 
			} , 
			navEL : function() {
				return _navigator; 
			} 
		} , // END DRYOBJ.RetELs
		
		rafUtils : { 
			get_bpms: function() {
				return _bpms; 
			} 
		} , // END DRYOBJ.rafUtils

		PixelsArePixelsArePixels : { 

			bodHeight : function() {
				return _getBodyHeight;
			} ,
			GetOffsetTop : function( elObj ) {
				return _Get_OffsetTop( elObj );
			} , 
			GetOffsetHeight : function( elObj ) {
				return _Get_OffsetHeight( elObj );
			} 
			
		} , // END DRYOBJ.PixelsArePixelsArePixels

		ApplyPrefixes : { 
			ReturnJSProperty : function( pm1 ) {
				return _ReturnJSProperty( pm1 );
			} , 
			ReturnCSSProperty : function( pm1 ) {
				return _ReturnCSSProperty( pm1 );
			} , 
			Returnkeyframes : function( pm1 ) {
				return _Returnkeyframes( pm1 );
			} 
		} , // END DRYOBJ.ApplyPrefixes 

		ReturnProps : { 
			RetPropertyRoutine : function( pm1, pm2 ) {
				return _RetPropertyRoutine( pm1, pm2 );
			} 
		} , // END DRYOBJ.ReturnProps 
		
		Utils : {
			
			evt_u : {
				AddEventoHandler : function( nodeFlanders, type, callback ) {
					return _AddEventoHandler( nodeFlanders, type, callback );
				} , 
				RetEVTsrcEL_evtTarget : function( leEvt ) {
					return _RetEVTsrcEL_evtTarget( leEvt );
				} , 
				RetValFalprevDef : function( leEvt ) { 
					return _RetValFalprevDef( leEvt );
				} 
			} // END DRYOBJ.Utils.evt_u

		} // END DRYOBJ.Utils

	}; // END public properties
}( ) ); // console.log( DRYOBJ ); 

/* ###################################################### */

var Gh_pages_io = ( function() {	
	
	/*################  ES5 pragma  ######################*/
	'use strict';
	
	// phase 1
	var _docObj = window.document;
	var _allAnchos = _docObj.getElementsByTagName("a");
	var _dtObj_fullYear = new Date().getFullYear();
	var _ar_SectionTrigAs = [];

	// phase 2
	var _mrBeepersMS = null, _RAF = null, _CAF = null;
	var _bodyDiv = _docObj.getElementById("Unpublished");
	var _navi_loopTimer;
	var _NaviconClassesObj = { disactivated: "util_navi", activated: "util_navi active" };

	// phase 3...
	var _str_href = window.location.href;

	// phase 1... NONE
	// phase 2
	var _docObj = window.document;
	var _leHead = _docObj.getElementsByTagName("head")[0];
	var _loadicon = _docObj.querySelector("#loadicon");
	var js_animation = DRYOBJ.ApplyPrefixes.ReturnJSProperty("animation");
	var css_transform = DRYOBJ.ApplyPrefixes.ReturnCSSProperty("transform");
	var keyframes = DRYOBJ.ApplyPrefixes.Returnkeyframes("animationName");

	// phase 3
	var _xhr_one = false;
	var _url_one = "data/gh_pages.xml";
	var _arGLO_PROJs = [];
	var _arGLO_INSPs = [];
	var _el_loopTimer;
	var _tgtELId = null;
	var _el_Target = null;
	var _T;
	var _scrollY = 0;	
	var _st_head_margin_top;
	var _st_head_margin_bottom;
	var _nm_parsed_margin_top;
	var _nm_parsed_margin_bottom;
	var _nm_margin_dist;
	var _headingEL = _docObj.getElementById("navicon");
	var _navicoUL = _docObj.querySelector("#navico");
	var _dynamiteProjects = _docObj.querySelector("#dynamiteProjects");
	var _drivenToSucceed = _docObj.querySelector("#drivenToSucceed");

	var _allAnchos = _docObj.getElementsByTagName("a");
	var _mrBeepersMS = null, _RAF = null, _CAF = null;


	function _DOMCONLO() {
		LetItFlow(); // phase 1
		SetChildBehaviors(); // phase 2		
		SquashAncho(); // phase 3...
		// console.log( 'first, here!' );
	} // END _DOMCONLO

	function PrevDeffo(leEvt) {
		DRYOBJ.Utils.evt_u.RetValFalprevDef(leEvt);
	}

	// phase 1
	function LetItFlow() {
		var dblQt = "\u0022"; // "
		var vrtBr = "\u007C"; // |
		var dshCh1 = "\u002D"; // - 
		var yoursTruly = "Luis A." ;
		var yourLocation = " Costa Rica " ;
		
		var liteStr = " " + _dtObj_fullYear + "";
		var fullStr = "" + yoursTruly + "," + " " + yourLocation + " " + vrtBr + " " + liteStr + "";

		var xtraStr = "Web experience provided by " + fullStr + "";
		var partnersEL = _docObj.querySelector("#partners");
		partnersEL.innerHTML = xtraStr;
		
		var secELs = document.getElementsByTagName("section"), secLen = secELs.length, A;
		for (A = 0; A < secLen; A = A + 1) {
			secELs[A].style.display = "none";
		}
		
		var B, comboLen = _allAnchos.length;
		for (B = 0; B < comboLen; B = B + 1) {
			if (_allAnchos[B].className === "menuItem") {
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[B], "click", ClickHotelToggleOnOff);
				_allAnchos[B].innerHTML = _allAnchos[B].innerHTML + " +";
				_ar_SectionTrigAs.push(_allAnchos[B]);
			}
		}
		var C, arSectionLen = _ar_SectionTrigAs.length;
		for (C = 0; C < arSectionLen; C = C + 1) {
			var contentObject = _docObj.getElementById("menu" + C);
			contentObject.style.display = "none";
		}
	}
	// phase 1
	function ClickHotelToggleOnOff(leEvt) {
		var evtHTrgt = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget(leEvt);
		var sectionId = evtHTrgt.href.slice(evtHTrgt.href.indexOf("#") + 1, evtHTrgt.href.length);
		var sectionToShow = _docObj.getElementById(sectionId);
		if (sectionToShow.style.display === "none") {
			sectionToShow.style.display = "block";
			evtHTrgt.innerHTML = evtHTrgt.innerHTML.replace("+", "-");
		}
		else {
			sectionToShow.style.display = "none";
			evtHTrgt.innerHTML = evtHTrgt.innerHTML.replace("-", "+");
		}
		PrevDeffo(leEvt);
	}

	// phase 2
	function SetChildBehaviors() {
		var K, parent_EL_Mx = _allAnchos.length;
		for (K = 0; K < parent_EL_Mx; K = K + 1) {
			if (_allAnchos[K].className === "util_navi" && _allAnchos[K].nodeName.toLowerCase() === "a") {
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "mousedown", CloseOps);
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "touchstart", CloseOps);
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "mouseup", SimpleToggle);
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "touchend", SimpleToggle);
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "click", PrevDeffo);
			}
			
			if (_allAnchos[K].id === "navicon" && _allAnchos[K].nodeName.toLowerCase() === "a") {
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "mousedown", OpenOps);
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "touchstart", OpenOps);
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "mouseup", SimpleToggle);
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "touchend", SimpleToggle);
				DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[K], "click", PrevDeffo);
			}
		}
		var U, ar_scndryULs = _bodyDiv.getElementsByTagName("ul"), scndyUL_Max = ar_scndryULs.length;
		for (U = 0; U < scndyUL_Max; U = U + 1) {
			if (ar_scndryULs[U].className === "ulShoHid") {
				ar_scndryULs[U].style.height = "0px";
			}
		}
	}
	// phase 2
	function SimpleToggle(leEvt) {
		if (DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt ).parentNode.className === _NaviconClassesObj.activated) {
			DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt ).parentNode.className = _NaviconClassesObj.disactivated;
		}
		else if (DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt ).parentNode.className === _NaviconClassesObj.disactivated) {
			DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt ).parentNode.className = _NaviconClassesObj.activated;
		}
		else {
			DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt ).parentNode.className = _NaviconClassesObj.disactivated;
		}
	}
	// phase 2
	function OpenOps(trgrElEvt) {
		var elusiveSpan = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget(trgrElEvt);
		var triggeringAnchor = elusiveSpan.parentNode;
		var tgtUlima_EL_Id = triggeringAnchor.id.slice(0, triggeringAnchor.id.length - 1);
		var tgtUlima_EL = _docObj.getElementById(tgtUlima_EL_Id);
		OpenShow(tgtUlima_EL_Id);
	}
	// phase 2
	function CloseOps(trgrElEvt) {
		var elusiveSpan = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget(trgrElEvt);
		var triggeringAnchor = elusiveSpan.parentNode;
		var tgtUlima_EL_Id = triggeringAnchor.id.slice(0, triggeringAnchor.id.length - 1);
		var tgtUlima_EL = _docObj.getElementById(tgtUlima_EL_Id);
		CloseHide(tgtUlima_EL_Id);
	}
	// phase 2
	function OpenShow(pmTgtuLimaID) {
		var tgtUlima_EL_Id = pmTgtuLimaID;
		var tgtUlima_EL = _docObj.getElementById(tgtUlima_EL_Id);
		_mrBeepersMS = DRYOBJ.rafUtils.get_bpms();
		_RAF = DRYOBJ.ReturnProps.RetPropertyRoutine("requestAnimationFrame", DRYOBJ.RetELs.glow());
		_CAF = DRYOBJ.ReturnProps.RetPropertyRoutine("CancelAnimationFrame", DRYOBJ.RetELs.glow());
		var tgtEL_OffsetHeight = DRYOBJ.PixelsArePixelsArePixels.GetOffsetHeight(tgtUlima_EL);
		var tgtEL_CapableHeight = tgtUlima_EL.scrollHeight;
		if (tgtEL_CapableHeight > tgtEL_OffsetHeight) {
			tgtEL_OffsetHeight = parseInt(tgtEL_OffsetHeight, 10) + 10;
			tgtUlima_EL.style.height = parseInt(tgtEL_OffsetHeight, 10) + "px";
			if (self.mozRequestAnimationFrame || self.webkitRequestAnimationFrame) {
				_navi_loopTimer = window[_RAF](function() {
					return OpenShow(tgtUlima_EL_Id);
				});
			}
			else {
				_navi_loopTimer = setTimeout(function() {
					return OpenShow(tgtUlima_EL_Id);
				}, _mrBeepersMS);
			}
		}
		if (tgtEL_CapableHeight < tgtEL_OffsetHeight) {
			if (self.mozCancelAnimationFrame || self.webkitCancelAnimationFrame) {
				_navi_loopTimer = (function(self) {
					return window[_CAF](_navi_loopTimer);
				})(_navi_loopTimer);
			}
			else {
				_navi_loopTimer = (function(self) {
					return clearTimeout(_navi_loopTimer);
				})(_navi_loopTimer);
			}
		}
	}
	// phase 2 
	function CloseHide(pmTgtuLimaID) {
		var tgtUlima_EL_Id = pmTgtuLimaID;
		var tgtUlima_EL = _docObj.getElementById(tgtUlima_EL_Id);
		_mrBeepersMS = DRYOBJ.rafUtils.get_bpms();
		_RAF = DRYOBJ.ReturnProps.RetPropertyRoutine("requestAnimationFrame", DRYOBJ.RetELs.glow());
		_CAF = DRYOBJ.ReturnProps.RetPropertyRoutine("CancelAnimationFrame", DRYOBJ.RetELs.glow());
		var tgtEL_OffsetHeight = DRYOBJ.PixelsArePixelsArePixels.GetOffsetHeight(tgtUlima_EL);
		if (0 < tgtEL_OffsetHeight) {
			tgtEL_OffsetHeight = parseInt(tgtEL_OffsetHeight, 10) - 10;
			tgtUlima_EL.style.height = parseInt(tgtEL_OffsetHeight, 10) + "px";
			if (self.mozRequestAnimationFrame || self.webkitRequestAnimationFrame) {
				_navi_loopTimer = window[_RAF](function() {
					return CloseHide(tgtUlima_EL_Id);
				});
			}
			else {
				_navi_loopTimer = setTimeout(function() {
					return CloseHide(tgtUlima_EL_Id);
				}, _mrBeepersMS);
			}
		}
		if (0 > tgtEL_OffsetHeight) {
			tgtUlima_EL.style.height = "0px";
			if (self.mozCancelAnimationFrame || self.webkitCancelAnimationFrame) {
				_navi_loopTimer = (function(self) {
					return window[_CAF](_navi_loopTimer);
				})(_navi_loopTimer);
			}
			else {
				_navi_loopTimer = (function(self) {
					return clearTimeout(_navi_loopTimer);
				})(_navi_loopTimer);
			}
		}
	}

	// phase 3...
	function SquashAncho(){
		DRYOBJ.Utils.evt_u.AddEventoHandler( document.getElementById( "aintgonnahappen" ), "click", DRYOBJ.Utils.evt_u.RetValFalprevDef );
	}

	function _LOAD() {
		COZYURLBAR(); // PHASE 1
		InjectkeyframeRule(); // PHASE 2
		Ajax_mainContent(); // PHASE 3

		// console.log( 'now it\'s loaded' );
	} // END _LOAD

	function PrevDeffo(leEvt) {
		DRYOBJ.Utils.evt_u.RetValFalprevDef(leEvt);
	}

	// PHASE 1
	function COZYURLBAR() {
		if (window.mozRequestAnimationFrame) {
			window.mozRequestAnimationFrame(HideURLbar);
		}
		else if (window.webkitRequestAnimationFrame) {
			window.webkitRequestAnimationFrame(HideURLbar);
		}
		else {
			window.setTimeout(HideURLbar, 0);
		}
	}
	// PHASE 1
	function HideURLbar() {
		window.scrollTo(0, 1);
	}

	// PHASE 2
	function InjectkeyframeRule() {
		_loadicon.style[js_animation] = "spin 1.406s linear infinite";
		var KF_STR = "" + keyframes + " spin { " + "from {" + css_transform + ":rotate( 0deg );" + " opacity: 0.4; " + " }" + "50% {" + css_transform + ":rotate( 180deg );" + " opacity: 1.0;" + " }" + "to {" + css_transform + ":rotate( 360deg );" + " opacity: 0.4;" + " }" + "}";
		var leFrag = _docObj.createDocumentFragment();
		var leStyle = _docObj.createElement("style");
		leStyle.type = "text/css";
		leStyle.setAttribute("media", "all,screen,projection");
		leStyle.appendChild(_docObj.createTextNode(KF_STR));
		leFrag.appendChild(leStyle);
		_leHead.appendChild(leFrag);
	}

	// PHASE 3
	function Ajax_mainContent() {
		if (window.XMLHttpRequest) {
			_xhr_one = new XMLHttpRequest();
		}
		if (!!_xhr_one) { 
			_xhr_one.onreadystatechange = BuildArray_main;
			_xhr_one.open("GET", _url_one, true);
			_xhr_one.send(null);
			_xhr_one.onload = Init_UpDown;
		}
		else if (!_xhr_one) {
			alert("Sorry, bub -- An XHR could not be requested.");
		}
	}
	// PHASE 3
	function BuildArray_main() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				if (this.responseXML) {
					var arXHRpushed_PROJECTSs = this.responseXML.getElementsByTagName("project");
					var xhrProjLen = arXHRpushed_PROJECTSs.length;
					for (var projIter = 0; projIter < xhrProjLen; projIter = projIter + 1) {
						var projOBJ = {};
						projOBJ.id = GetVal(arXHRpushed_PROJECTSs[projIter], "id");
						projOBJ.navicon = GetVal(arXHRpushed_PROJECTSs[projIter], "navicon");
						projOBJ.title = GetVal(arXHRpushed_PROJECTSs[projIter], "title");
						projOBJ.image_path = GetVal(arXHRpushed_PROJECTSs[projIter], "image_path");
						projOBJ.info = GetVal(arXHRpushed_PROJECTSs[projIter], "info");
						projOBJ.content = GetVal(arXHRpushed_PROJECTSs[projIter], "content");
						projOBJ.back = GetVal(arXHRpushed_PROJECTSs[projIter], "back");
						projOBJ.client = GetVal(arXHRpushed_PROJECTSs[projIter], "client");
						projOBJ.media = GetVal(arXHRpushed_PROJECTSs[projIter], "media");
						projOBJ.technology = GetVal(arXHRpushed_PROJECTSs[projIter], "technology");
						projOBJ.link = GetVal(arXHRpushed_PROJECTSs[projIter], "link");
						projOBJ.code = GetVal(arXHRpushed_PROJECTSs[projIter], "code");
						projOBJ.callout = GetVal(arXHRpushed_PROJECTSs[projIter], "callout");
						projOBJ.minor_detail = GetVal(arXHRpushed_PROJECTSs[projIter], "minor_detail");
						_arGLO_PROJs[projIter] = projOBJ;
					}
					var arXHRpushed_INSPIRATIONs = this.responseXML.getElementsByTagName("article");
					var xhrInspireLen = arXHRpushed_INSPIRATIONs.length;
					for (var inspireIter = 0; inspireIter < xhrInspireLen; inspireIter = inspireIter + 1) {
						var inspireOBJ = {};
						inspireOBJ.title = GetVal(arXHRpushed_INSPIRATIONs[inspireIter], "title");
						inspireOBJ.info = GetVal(arXHRpushed_INSPIRATIONs[inspireIter], "info");
						inspireOBJ.content = GetVal(arXHRpushed_INSPIRATIONs[inspireIter], "content");
						_arGLO_INSPs[inspireIter] = inspireOBJ;
					}
					var article;
					var articleCt = _arGLO_INSPs.length;
					var yTitle, yInfo, yContent;
					_docObj.querySelector("#loadicon").style.display = "none";
					for (var Q = 0; Q < articleCt; Q = Q + 1) {
						article = _arGLO_INSPs[Q];
						yTitle = article.title;
						yInfo = article.info;
						yContent = article.content;
						var hotelFiveFrag = _docObj.createDocumentFragment();
						var hotelFiveEL = _docObj.createElement("h5");
						hotelFiveEL.setAttribute("class", "newsLink");
						hotelFiveEL.appendChild(_docObj.createTextNode(yTitle));
						hotelFiveFrag.appendChild(hotelFiveEL);
						var hotelSixFrag = _docObj.createDocumentFragment();
						var hotelSixEL = _docObj.createElement("h6");
						hotelSixEL.setAttribute("class", "newsLink");
						hotelSixEL.appendChild(_docObj.createTextNode(yInfo));
						hotelSixFrag.appendChild(hotelSixEL);
						_drivenToSucceed.appendChild(hotelFiveFrag);
						_drivenToSucceed.appendChild(hotelSixFrag);
						_drivenToSucceed.innerHTML += yContent;
					}
					var project;
					var projectCt = _arGLO_PROJs.length;
					var xId, xNavicon, xTitle, xImgPath, xInfo, xContent;
					var xBack, xClient, xMedia, xTechnology, xLink, xCode;
					var xCallout, xMinDet;
					_docObj.querySelector("#loadicon").style.display = "none";
					for (var P = 0; P < projectCt; P = P + 1) {
						project = _arGLO_PROJs[P];
						xId = project.id;
						xNavicon = project.navicon;
						xTitle = project.title;
						xImgPath = project.image_path;
						xInfo = project.info;
						xContent = project.content;
						xBack = project.back;
						xClient = project.client;
						xMedia = project.media;
						xTechnology = project.technology;
						xLink = project.link;
						xCode = project.code;
						xCallout = project.callout;
						xMinDet = project.minor_detail;

						var liFragUL = _docObj.createDocumentFragment();
						var liELUL = _docObj.createElement("li");
						var aFragUL = _docObj.createDocumentFragment();
						var aELUL = _docObj.createElement("a");
						aELUL.setAttribute("href", "");
						aELUL.setAttribute("id", xId);
						aELUL.setAttribute("class", "downTown");
						aELUL.appendChild(_docObj.createTextNode(xTitle));
						aFragUL.appendChild(aELUL);
						liELUL.appendChild(aFragUL);
						liFragUL.appendChild(liELUL);
						_navicoUL.appendChild(liFragUL);
						
						var hotelFragdynPro = _docObj.createDocumentFragment();
						var hotelELdynPro = _docObj.createElement("h4");
						hotelELdynPro.setAttribute("class", "galleryLink");
						hotelELdynPro.setAttribute("id", xId.slice(0, xId.length - 2));
						hotelELdynPro.appendChild(_docObj.createTextNode(xTitle));
						hotelFragdynPro.appendChild(hotelELdynPro);
						
						var p_gallinkFrag_dynPro = _docObj.createDocumentFragment();
						var p_gallinkEL_dynPro = _docObj.createElement("p");
						p_gallinkEL_dynPro.setAttribute("class", "galleryLink");
						p_gallinkEL_dynPro.appendChild(_docObj.createTextNode(xInfo));
						p_gallinkFrag_dynPro.appendChild(p_gallinkEL_dynPro);
						
						var div_fotoFrag_dynPro = _docObj.createDocumentFragment();
						var div_fotoEL_dynPro = _docObj.createElement("div");
						div_fotoEL_dynPro.setAttribute("class", "project_photo");
						
						var a_projLinkFrag_dynPro = _docObj.createDocumentFragment();
						var a_projLinkEL_dynPro = _docObj.createElement("a");
						a_projLinkEL_dynPro.setAttribute("title", "Link to live presentation entitled " + xTitle);
						a_projLinkEL_dynPro.setAttribute("target", "_blank");
						a_projLinkEL_dynPro.setAttribute("class", "projectLink");
						a_projLinkEL_dynPro.setAttribute("href", xLink);

						var img_Frag_dynPro = _docObj.createDocumentFragment();
						var img_EL_dynPro = _docObj.createElement("img");
						img_EL_dynPro.setAttribute("alt", "Link to " + xTitle);
						img_EL_dynPro.setAttribute("class", "projectImage");
						img_EL_dynPro.setAttribute( "src", _str_href + xImgPath );
						img_Frag_dynPro.appendChild(img_EL_dynPro);
						
						var figc_Frag_dynPro = _docObj.createDocumentFragment();
						var figc_EL_dynPro = _docObj.createElement("figcaption");
						figc_EL_dynPro.appendChild(_docObj.createTextNode(xCallout));
						figc_Frag_dynPro.appendChild(figc_EL_dynPro);
						
						var strong_Frag_dynPro = _docObj.createDocumentFragment();
						var strong_EL_dynPro = _docObj.createElement("strong");
						strong_EL_dynPro.appendChild(_docObj.createTextNode(xCallout));
						strong_Frag_dynPro.appendChild(strong_EL_dynPro);
						
						var span_Frag_dynPro = _docObj.createDocumentFragment();
						var span_EL_dynPro = _docObj.createElement("span");
						span_EL_dynPro.appendChild(_docObj.createTextNode(xMinDet));
						span_Frag_dynPro.appendChild(span_EL_dynPro);
						
						var p_clientFrag_dynPro = _docObj.createDocumentFragment();
						var p_clientEL_dynPro = _docObj.createElement("p");
						p_clientEL_dynPro.setAttribute("class", "galLinkDetFirst");
						p_clientEL_dynPro.appendChild(_docObj.createTextNode("Client: " + xClient));
						p_clientFrag_dynPro.appendChild(p_clientEL_dynPro);
						
						var p_mediaFrag_dynPro = _docObj.createDocumentFragment();
						var p_mediaEL_dynPro = _docObj.createElement("p");
						p_mediaEL_dynPro.setAttribute("class", "galLinkDetail");
						p_mediaEL_dynPro.appendChild(_docObj.createTextNode("Media: " + xMedia));
						p_mediaFrag_dynPro.appendChild(p_mediaEL_dynPro);
						
						var p_technoFrag_dynPro = _docObj.createDocumentFragment();
						var p_technoEL_dynPro = _docObj.createElement("p");
						p_technoEL_dynPro.setAttribute("class", "galLinkDetail");
						p_technoEL_dynPro.appendChild(_docObj.createTextNode("Technology: " + xTechnology));
						p_technoFrag_dynPro.appendChild(p_technoEL_dynPro);

						var a_linkFrag_dynPro = _docObj.createDocumentFragment();
						var a_linkEL_dynPro = _docObj.createElement("a");
						a_linkEL_dynPro.setAttribute("href", xLink );
						a_linkEL_dynPro.setAttribute("class", "galLinkDetail");
						a_linkEL_dynPro.appendChild(_docObj.createTextNode( "Visit the live site" ));
						var p_linkFrag_dynPro = _docObj.createDocumentFragment();
						var p_linkEL_dynPro = _docObj.createElement("p");
						p_linkEL_dynPro.setAttribute("class", "galLinkDetail");
						a_linkFrag_dynPro.appendChild(a_linkEL_dynPro);
						p_linkEL_dynPro.appendChild(a_linkFrag_dynPro); 
						p_linkFrag_dynPro.appendChild(p_linkEL_dynPro);

						var a_codeFrag_dynPro = _docObj.createDocumentFragment();
						var a_codeEL_dynPro = _docObj.createElement("a");
						a_codeEL_dynPro.setAttribute("href", xCode );
						a_codeEL_dynPro.setAttribute("class", "galLinkDetail");
						a_codeEL_dynPro.appendChild(_docObj.createTextNode( "Visit the Git repo" ));
						
						var p_codeFrag_dynPro = _docObj.createDocumentFragment();
						var p_codeEL_dynPro = _docObj.createElement("p");
						p_codeEL_dynPro.setAttribute("class", "galLinkDetLast");
						a_codeFrag_dynPro.appendChild(a_codeEL_dynPro);
						p_codeEL_dynPro.appendChild(a_codeFrag_dynPro); 
						p_codeFrag_dynPro.appendChild(p_codeEL_dynPro);

						var p_contentFrag_dynPro = _docObj.createDocumentFragment();
						var p_contentEL_dynPro = _docObj.createElement("p");
						p_contentEL_dynPro.setAttribute("class", "galLinkContent");
						p_contentEL_dynPro.appendChild(_docObj.createTextNode(xContent));
						p_contentFrag_dynPro.appendChild(p_contentEL_dynPro);
						
						var a_upTownFrag_dynPro = _docObj.createDocumentFragment();
						var a_upTownEL_dynPro = _docObj.createElement("a");
						a_upTownEL_dynPro.setAttribute("href", "");
						a_upTownEL_dynPro.setAttribute("id", xNavicon);
						a_upTownEL_dynPro.setAttribute("class", "upTown");
						a_upTownEL_dynPro.appendChild(_docObj.createTextNode(xBack));
						a_upTownFrag_dynPro.appendChild(a_upTownEL_dynPro);

						div_fotoEL_dynPro.appendChild(figc_Frag_dynPro);
						div_fotoEL_dynPro.appendChild(strong_Frag_dynPro);
						div_fotoEL_dynPro.appendChild(span_Frag_dynPro);
						
						a_projLinkEL_dynPro.appendChild(img_Frag_dynPro);
						a_projLinkFrag_dynPro.appendChild(a_projLinkEL_dynPro);
						
						div_fotoEL_dynPro.appendChild(a_projLinkFrag_dynPro);
						div_fotoFrag_dynPro.appendChild(div_fotoEL_dynPro);
						
						_dynamiteProjects.appendChild(hotelFragdynPro);
						_dynamiteProjects.appendChild(p_gallinkFrag_dynPro);
						_dynamiteProjects.appendChild(div_fotoFrag_dynPro);
						_dynamiteProjects.appendChild(p_clientFrag_dynPro);
						_dynamiteProjects.appendChild(p_mediaFrag_dynPro);
						_dynamiteProjects.appendChild(p_technoFrag_dynPro);
						_dynamiteProjects.appendChild(p_linkFrag_dynPro);
						_dynamiteProjects.appendChild(p_codeFrag_dynPro);
						_dynamiteProjects.appendChild(p_contentFrag_dynPro);
						_dynamiteProjects.appendChild(a_upTownFrag_dynPro);
					}
				}
			}
			else { // alert("Problems, dude: ", this.status);
				_docObj.querySelector("#loadOps").innerHTML = "";
				_docObj.querySelector("#loadOps").style.cssText = "display: block; ";
				_docObj.querySelector("#loadicon").style.display = "none";
				_docObj.querySelector("#loadOps").innerHTML = "Problems, dude: " + this.status + " Try later.";
			}
		}

		function GetVal(pmData, pmTag) {
			return pmData.getElementsByTagName(pmTag)[0].firstChild.nodeValue;
		}
	}
	// PHASE 3
	function Init_UpDown() {

		_T = 0;
		var anchoLen = _allAnchos.length;
		for (_T; _T < anchoLen; _T = _T + 1) {
			DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[_T], "mousedown", function(leEvt) {
				var leTarget = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget(leEvt);
				if (leTarget.className === "downTown" && leTarget.nodeName.toLowerCase() === "a") {
					_tgtELId = leTarget.id.slice(0, leTarget.id.length - 2);
					_el_Target = _docObj.getElementById(_tgtELId);
					GetDownOnIt(_tgtELId);
				}
			});
			DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[_T], "mousedown", function(leEvt) {
				var leTarget = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget(leEvt);
				if (leTarget.className === "upTown" && leTarget.nodeName.toLowerCase() === "a") {
					_tgtELId = leTarget.id.slice(0, leTarget.id.length - 4);
					_el_Target = _docObj.getElementById(_tgtELId);
					UpUpAndAway(_tgtELId);
				}
			});
			DRYOBJ.Utils.evt_u.AddEventoHandler(_allAnchos[_T], "click", function(leEvt) {
				var leTarget = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget(leEvt);
				if ((leTarget.className === "downTown" || leTarget.className === "upTown") && leTarget.nodeName.toLowerCase() === "a") {
					PrevDeffo(leEvt);
				}
			});
		}
	}
	// PHASE 3
	function UpUpAndAway(evtTrgt) {
		_st_head_margin_top = document.defaultView.getComputedStyle(_headingEL, "").getPropertyValue("margin-top");
		_st_head_margin_bottom = document.defaultView.getComputedStyle(_headingEL, "").getPropertyValue("margin-bottom");
		_nm_parsed_margin_top = parseInt(_st_head_margin_top.match(/[0-9.]/gi).join(""), 10);
		_nm_parsed_margin_bottom = parseInt(_st_head_margin_bottom.match(/[0-9.]/gi).join(""), 10);
		_nm_margin_dist = _nm_parsed_margin_top + _nm_parsed_margin_bottom;
		_tgtELId = evtTrgt;
		_el_Target = _docObj.getElementById(_tgtELId);
		// if (_docObj.documentElement.addEventListener) {
			var currentY = window.pageYOffset;
		// }
		var targetY = DRYOBJ.PixelsArePixelsArePixels.GetOffsetTop(_el_Target);
		_mrBeepersMS = DRYOBJ.rafUtils.get_bpms();
		_RAF = DRYOBJ.ReturnProps.RetPropertyRoutine("requestAnimationFrame", DRYOBJ.RetELs.glow());
		_CAF = DRYOBJ.ReturnProps.RetPropertyRoutine("CancelAnimationFrame", DRYOBJ.RetELs.glow());
		if (self.mozRequestAnimationFrame || self.webkitRequestAnimationFrame) {
			_el_loopTimer = window[_RAF](function() {
				return UpUpAndAway(_tgtELId);
			});
		}
		else {
			_el_loopTimer = setTimeout(function() {
				return UpUpAndAway(_tgtELId);
			}, _mrBeepersMS);
		}
		if (currentY > targetY) {
			_scrollY = currentY - _nm_margin_dist;
			window.scroll(0, _scrollY);
		}
		else {
			if (self.mozCancelAnimationFrame || self.webkitCancelAnimationFrame) {
				_el_loopTimer = (function(self) {
					return window[_CAF](_el_loopTimer);
				})(_el_loopTimer);
			}
			else {
				_el_loopTimer = (function(self) {
					return clearTimeout(_el_loopTimer);
				})(_el_loopTimer);
			}
		}
	}
	// PHASE 3
	function GetDownOnIt(evtTrgt) {
		_st_head_margin_top = document.defaultView.getComputedStyle(_headingEL, "").getPropertyValue("margin-top");
		_st_head_margin_bottom = document.defaultView.getComputedStyle(_headingEL, "").getPropertyValue("margin-bottom");
		_nm_parsed_margin_top = parseInt(_st_head_margin_top.match(/[0-9.]/gi).join(""), 10);
		_nm_parsed_margin_bottom = parseInt(_st_head_margin_bottom.match(/[0-9.]/gi).join(""), 10);
		_nm_margin_dist = _nm_parsed_margin_top + _nm_parsed_margin_bottom;
		_tgtELId = evtTrgt;
		_el_Target = _docObj.getElementById(_tgtELId);
		var targetY = DRYOBJ.PixelsArePixelsArePixels.GetOffsetTop(_el_Target);
		var bodyHeight = DRYOBJ.PixelsArePixelsArePixels.bodHeight();
		// if (_docObj.documentElement.addEventListener) {
			var currentY = window.pageYOffset;
			var yHeight = window.innerHeight;
		// }
		var yPos = currentY + yHeight;
		_mrBeepersMS = DRYOBJ.rafUtils.get_bpms();
		_RAF = DRYOBJ.ReturnProps.RetPropertyRoutine("requestAnimationFrame", DRYOBJ.RetELs.glow());
		_CAF = DRYOBJ.ReturnProps.RetPropertyRoutine("CancelAnimationFrame", DRYOBJ.RetELs.glow());
		if (self.mozRequestAnimationFrame || self.webkitRequestAnimationFrame) {
			_el_loopTimer = window[_RAF](function() {
				return GetDownOnIt(_tgtELId);
			});
		}
		else {
			_el_loopTimer = setTimeout(function() {
				return GetDownOnIt(_tgtELId);
			}, _mrBeepersMS);
		}
		if (currentY > targetY) {
			if (self.mozCancelAnimationFrame || self.webkitCancelAnimationFrame) {
				_el_loopTimer = (function(self) {
					return window[_CAF](_el_loopTimer);
				})(_el_loopTimer);
			}
			else {
				_el_loopTimer = (function(self) {
					return clearTimeout(_el_loopTimer);
				})(_el_loopTimer);
			}
		}
		else {
			if (currentY < targetY - _nm_margin_dist) {
				_scrollY = currentY + _nm_margin_dist;
				window.scroll(0, _scrollY);
			}
			else {
				if (self.mozCancelAnimationFrame || self.webkitCancelAnimationFrame) {
					_el_loopTimer = (function(self) {
						return window[_CAF](_el_loopTimer);
					})(_el_loopTimer);
				}
				else {
					_el_loopTimer = (function(self) {
						return clearTimeout(_el_loopTimer);
					})(_el_loopTimer);
				}
			}
		}
	}
	// END of _private properties

	return {
		InitDCL: function() {
			// phase 2
			_navi_loopTimer = null;

			// phase 0
			return _DOMCONLO();
		} , // window.Gh_pages_io.InitDCL()

		InitLoad: function() {
			// phase 2
			_el_loopTimer = null;

			// phase 0
			return _LOAD(); 
		} // window.Gh_pages_io.InitLoad()
	};
} )(); // window.Gh_pages_io

DRYOBJ.Utils.evt_u.AddEventoHandler( window , "DOMContentLoaded" , Gh_pages_io.InitDCL() ); 
DRYOBJ.Utils.evt_u.AddEventoHandler( window, "load" , Gh_pages_io.InitLoad() ); 