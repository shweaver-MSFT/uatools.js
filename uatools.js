var UATOOLS;

(function (UATOOLS) {
    const currentUA = navigator.userAgent || "";
    const currentLowerUA = currentUA.toLowerCase();

    // Features
    UATOOLS.isTablet = function () {
        return currentLowerUA.indexOf("tablet") >= 0;
    }

    UATOOLS.isMobile = function () {
        return currentLowerUA.indexOf("mobile") >= 0;
    }

    UATOOLS.getUserAgentString = function () {
        return currentUA;
    }

    UATOOLS.getStore = function () {
        // Get OS then
        const os = UATOOLS.getOperatingSystem();

        switch (os) {
            case "Windows Phone":
                return "Windows Phone Store";
            case "Windows":
                return "Windows Store";
            case "iOS":
                return "iTunes"; // Smart App Banner should be used as well
            default:
                if (window.chrome && window.chrome.app && os !== "Windows Phone") {
                    return "Google Play";
                }
                return os;
        }
    }

    UATOOLS.getOperatingSystem = function () {
        // Windows Phone
        if (currentLowerUA.indexOf("windows phone") >= 0) {
            return "Windows Phone";
        }

        // Windows
        if (currentLowerUA.indexOf("windows") >= 0) {
            return "Windows";
        }

        // Android
        if (currentLowerUA.indexOf("android") >= 0) {
            return "Android";
        }

        // iOS
        if (currentLowerUA.indexOf("apple-i") >= 0) {
            return "iOS";
        }

        // iPhone
        if (currentLowerUA.indexOf("iphone") >= 0) {
            return "iOS";
        }

        // iPad
        if (currentLowerUA.indexOf("ipad") >= 0) {
            return "iOS";
        }

        // BlackBerry
        if (currentLowerUA.indexOf("blackberry") >= 0) {
            return "BlackBerry";
        }

        // BlackBerry
        if (currentLowerUA.indexOf("(bb") >= 0) {
            return "BlackBerry";
        }

        // Kindle
        if (currentLowerUA.indexOf("kindle") >= 0) {
            return "Kindle";
        }

        // Macintosh
        if (currentLowerUA.indexOf("macintosh") >= 0) {
            return "Macintosh";
        }

        // Linux
        if (currentLowerUA.indexOf("linux") >= 0) {
            return "Linux";
        }

        // OpenBSD
        if (currentLowerUA.indexOf("openbsd") >= 0) {
            return "OpenBSD";
        }

        // Firefox OS
        if (currentLowerUA.indexOf("firefox") >= 0) {
            return "Firefox OS"; // Web is the plaform
        }

        return "Unknown operating system";
    }

    UATOOLS.getBrowser = function () {
        if (UATOOLS.isOpera()) {
            return 'Opera';
        }

        if (UATOOLS.isFirefox()) {
            return 'Firefox';
        }

        if (UATOOLS.isSafari()) {
            return 'Safari';
        }

        if (UATOOLS.isIE()) {
            return 'Internet Explorer';
        }

        if (UATOOLS.isEdgeClassic()) {
            return 'Edge Classic';
        }

        if (UATOOLS.isEdge()) {
            return 'Edge Chromium';
        }

        if (UATOOLS.isChromium()) {
            return 'Chrome';
        }

        if (UATOOLS.isBlink()) {
            return 'Blink';
        }
    }

    UATOOLS.isOpera = function () {
        // Opera 8.0+
        return (!!window.opr && !!opr.addons) || !!window.opera || currentLowerUA.indexOf(' opr/') >= 0;
    }

    UATOOLS.isFirefox = function () {
        // Firefox 1.0+
        return typeof InstallTrigger !== 'undefined';
    }

    UATOOLS.isSafari = function () {
        // Safari <= 9 "[object HTMLElementConstructor]" 
        return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    }

    UATOOLS.isIE = function () {
        // Internet Explorer 6-11
        return /*@cc_on!@*/false || !!document.documentMode;
    }

    UATOOLS.isEdgeClassic = function () {
        // Edge 20+
        return !UATOOLS.isIE() && !!window.StyleMedia;
    }

    UATOOLS.isEdge = function () {
        // Edge Chromium
        return currentLowerUA.indexOf(' edg/') >= 0;
    }

    UATOOLS.isChromium = function () {
        // Chrome 1+
        return window.chrome && !UATOOLS.isEdge();
    }

    UATOOLS.isBlink = function () {
        // Blink engine detection
        return (UATOOLS.isChromium() || UATOOLS.isOpera()) && !!window.CSS;
    }

    // by: David Rousset
    // https://codepen.io/davrous/pen/yLNKBaV
    UATOOLS.isWindowsARM64 = function () {
        // Windows ARM64 device
        if (navigator.userAgent.indexOf("Windows") !== -1) {
            if (window.external && 
                // Check os-architecture
                window.external.getHostEnvironmentValue && 
                window.external.getHostEnvironmentValue('os-architecture').indexOf("ARM64") !== -1) {
                return true;
            }
            else {
                // Check webgl renderer
                var canvas = document.createElement('canvas');
                var gl = canvas.getContext('webgl');
    
                var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                return renderer.indexOf("Qualcomm") !== -1;
            }
        }
    
        return false;
    }

    // Experimental
    UATOOLS.isWindowsAnniversaryUpdateOrAbove = function () {
        // is it Windows 10 ?
        if (currentLowerUA.indexOf("windows nt 10") < 0) {
            return false;
        }

        //Hack using canvas and font size which was handled differently previous to RS1 (Lower than 1607)
        var context = document.createElement('canvas').getContext('2d');

        context.font = '64px Segoe UI Emoji';
        var width = context.measureText('\uD83D\uDC31\u200D\uD83D\uDC64').width;

        if (UATOOLS.isChromium() || UATOOLS.isFirefox() || UATOOLS.isOpera() || UATOOLS.isEdge()) {
            return width <= 90;
        }
        else if(UATOOLS.isEdgeClassic()){
            var windowsBuildNumber = currentLowerUA.match("edge/[0-9]+.([0-9]+)")[1];
            return windowsBuildNumber >= 14393;
        }
        else if(UATOOLS.isIE()){
            return width > 128 || width <= 90;
        }

        return false;
    }

    // Experimental
    UATOOLS.isWindowsFallCreatorsUpdateOrAbove = function() {
        // is it Windows 10 ?
        if (currentLowerUA.indexOf("windows nt 10") < 0) {
            return false;
        }

        //Hack using canvas and font size which was handled differently previous to RS3 (Lower than 1709)
        var context = document.createElement('canvas').getContext('2d');

        context.font = '64px Segoe UI Emoji'
        var width = context.measureText('\uD83E\uDDD5\uD83C\uDFFD').width;

        if (UATOOLS.isChromium() || UATOOLS.isFirefox() || UATOOLS.isOpera() || UATOOLS.isEdge()) {
            return width <= 90;
        }
        else if(UATOOLS.isEdgeClassic()){
            var windowsBuildNumber = currentLowerUA.match("edge/[0-9]+.([0-9]+)")[1];
            return windowsBuildNumber >= 16299;
        }
        else if(UATOOLS.isIE()){
            return width > 128 || width <= 90;
        }

        return false;
    }

    // Experimental
    window.addEventListener("DOMContentLoaded", function() {
        var storeLinks = document.getElementsByClassName("winstore-link");

        for(var i = 0, len = storeLinks.length; i < len; i++) {
            var storeLink = storeLinks[i];

            //if windows version below anniversary
            if(!UATOOLS.isWindowsAnniversaryUpdateOrAbove()){
                //hide the link
                storeLink.style.display = "none";
                return;
            }

            var campainid, storeid;

            if(storeLink.attributes["data-winstore-id"]) 
                storeid = storeLink.attributes["data-winstore-id"].value;

            if(storeid){
                //Get campain id if there is any
                if(storeLink.attributes["data-winstore-cid"]) 
                    campainid = storeLink.attributes["data-winstore-cid"].value;

                //default value for size
                var size = "medium";
                if(storeLink.attributes["data-winstore-badge-size"]) 
                    size = storeLink.attributes["data-winstore-badge-size"].value || size;
                
                var appname = "";
                if(storeLink.attributes["data-winstore-appname"]) 
                    appname = storeLink.attributes["data-winstore-appname"].value + "/";
        
                var img = document.createElement("img");
                img.src = "https://assets.windowsphone.com/f2f77ec7-9ba9-4850-9ebe-77e366d08adc/English_Get_it_Win_10_InvariantCulture_Default.png";
                img.alt = "Get it on Windows 10";
                
                size = size || "medium";
                switch(size){
                    case "small":
                        img.height = 20;
                        break;
                    case "medium":
                        img.height = 40;
                        break;
                    case "large":
                        img.height = 80;
                        break;
                }

                storeLink.appendChild(img);
                storeLink.href = "https://www.microsoft.com/store/apps/" + appname + storeid;

                if(campainid)
                    storeLink.href += "?cid=" + campainid;

                campainid = undefined;
                storeid = undefined;
            }
            else{
                //hide the link
                storeLink.style.display = "none";
                console.log("Found a Windows Store anchor with no data-winstore-id. Please specify it.");
            }
        }
    }, false);

})(UATOOLS || (UATOOLS = {}));