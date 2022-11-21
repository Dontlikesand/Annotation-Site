
var delnum = 0;
var html = "    ";
var listhtml = "<strong>Things</strong><br>";
x = "";
var objects = new Array(8000);
var objs = new Array;
var objloc = new Array;
var adjectives = new Array(8000);
var adj = new Array;
var adjlinks = new Array;

function textupdate() {
    
    html = "    ";
    var row = document.getElementById("paragraph").getAttribute('rows');
    let stored = document.getElementById("paragraph").value;
    if (stored.length >= (167 * row)){
        document.getElementById("paragraph").getAttribute('rows')++;
    }
    const wordArray = stored.split(" ");
    console.log(stored);
    wordArray.forEach(test);
    wordArray.forEach(finaltext);
    //objs.forEach(list);
    document.getElementById("list").innerHTML = listhtml;
}

function test(item, index) {
    //objects/nouns
    if (item.startsWith("@")){objects[index] = true; console.log(item + index + " true")
    if (!objs.includes(item.toLowerCase().replace('@', ''))){
        objs.push(item.toLowerCase().replace('@', ''));
        var objsindex = objs.indexOf(item.toLowerCase().replace('@', ''));
        listhtml = listhtml + objs.indexOf(item.toLowerCase().replace('@', '')) + '. ' + '<span class = "listitem" id = "' + objsindex +'" onclick="dele('+item.toLowerCase().replace('@', '')+')">' + item.toLowerCase().replace('@', '') + '</span>' + '<br>';
    }
    } else if (objs.includes(item.toLowerCase().replace('@', ''))) {objects[index] = true;} else {objects[index] = false}
    //adjectives
    if (item.startsWith("#")){adjectives[index] = true; console.log(item + index + " true")
    if (!adj.includes(item.toLowerCase().replace('#', ''))){
        adj.push(item.toLowerCase().replace('#', ''));
    }
    if (isNaN(item.charAt(1))){
        adjlinks.push(parseInt(item.charAt(1)))
    }
    } else if (adj.includes(item.toLowerCase().replace('#', ''))) {adjectives[index] = true;} else {adjectives[index] = false}
}

function dele(thing){
    textupdate()
    var indx = objs.indexOf(thing);
    delnum = indx;
    console.log("deleting " + objs[indx])
    let stored = document.getElementById("paragraph").value;
    const wordArray = stored.split(" ");
    wordArray.forEach(testanddel)
    objs[indx] = null;
    document.getElementById("paragraph").value = wordArray.join(" ");
    var objs = new Array;
    var listhtml = "<strong>Things</strong><br>";
    textupdate()
}

function testanddel(item, index, array){
    if (item.toLowerCase().replace('@', '') === objs[delnum]){
        if (item.includes('@')){
        array[index] = item.replace('@', '');
        console.log("test")
        }
    }
}

function load(){ 
    var allText = "ERROR";
    //read/save
    const reader = new FileReader()
    reader.onload = event => {allText = event.target.result;
    console.log(allText)
        //process and load
        var splits = allText.split('');
        console.log(splits.join(' ') + "test")
        document.getElementById("paragraph").value = splits[0];
        textupdate();
    } // desired file content
    reader.onerror = error => reject(error)
    reader.readAsText(document.getElementById("upload").files[0])
    
}

function save(){
    textupdate();
    if (objs.length != 0){
        var filething = new Blob([document.getElementById("paragraph").value + '' + objs.join('»')],
                { type: "text/plain;charset=utf-8" });
        saveAs(filething, "Descriptionfile.txt");
    }else{
        alert("object array came back as null")
    }
}

function finaltext(item, index, array){
    if (objects[index] === true) {
        var removed = item;
        var reset = false;
        var punc = '';
        if (removed.includes('@')){removed = removed.replace('@', ''); console.log("tried to remove @")}
        if (item.endsWith('.')){removed.replace('', '.'); reset = true; punc = '.'} else if (item.endsWith('!')) {removed.replace('', '!'); reset = true; punc = '!'} else if (item.endsWith(',')) {removed.replace('', ','); reset = true; punc = ','} else if (item.endsWith('?')) {removed.replace('', '?'); reset = true; punc = '?'}
        if (reset) {html = html + " " + '<span style="color:purple" class = "objectprev" name="' + removed + '" onclick="info()">' + removed + "</span>";} else {html = html + " " + '<span style="color:purple" class = "objectprev" name="' + removed + '" onclick="info()">' + removed + "</span>";}
    }else if (adjectives[index] === true) {
        var removed = item;
        var reset = false;
        var punc = '';
        if (removed.includes('#')){removed = removed.replace('#', ''); console.log("tried to remove #")}
        if (item.endsWith('.')){removed.replace('', '.'); reset = true; punc = '.'} else if (item.endsWith('!')) {removed.replace('', '!'); reset = true; punc = '!'} else if (item.endsWith(',')) {removed.replace('', ','); reset = true; punc = ','} else if (item.endsWith('?')) {removed.replace('', '?'); reset = true; punc = '?'}
        if (reset) {html = html + " " + '<span style="color:green" class = "adjprev" name="' + removed + '" onclick="info()">' + removed + "</span>";} else {html = html + " " + '<span style="color:green" class = "adjprev" name="' + removed + '" onclick="info()">' + removed + "</span>";}
    } else {html = html + " " + '<span style="color:black">' + item + "</span>";}
    if (index + 1 === array.length){ 
        document.getElementById("para").innerHTML = html;
    }
}

function list(item, index) {
    //listhtml = listhtml +index + '. ' + item + '<br>';
    console.log(item)
}

function info(){

}






















//IGNORE THIS
//this is what you do when you cant install npm :(


(function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define([], factory);
    } else if (typeof exports !== "undefined") {
      factory();
    } else {
      var mod = {
        exports: {}
      };
      factory();
      global.FileSaver = mod.exports;
    }
  })(this, function () {
    "use strict";
  
    /*
    * FileSaver.js
    * A saveAs() FileSaver implementation.
    *
    * By Eli Grey, http://eligrey.com
    *
    * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
    * source  : http://purl.eligrey.com/github/FileSaver.js
    */
    // The one and only way of getting global scope in all environments
    // https://stackoverflow.com/q/3277182/1008999
    var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;
  
    function bom(blob, opts) {
      if (typeof opts === 'undefined') opts = {
        autoBom: false
      };else if (typeof opts !== 'object') {
        console.warn('Deprecated: Expected third argument to be a object');
        opts = {
          autoBom: !opts
        };
      } // prepend BOM for UTF-8 XML and text/* types (including HTML)
      // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  
      if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], {
          type: blob.type
        });
      }
  
      return blob;
    }
  
    function download(url, name, opts) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
  
      xhr.onload = function () {
        saveAs(xhr.response, name, opts);
      };
  
      xhr.onerror = function () {
        console.error('could not download file');
      };
  
      xhr.send();
    }
  
    function corsEnabled(url) {
      var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker
  
      xhr.open('HEAD', url, false);
  
      try {
        xhr.send();
      } catch (e) {}
  
      return xhr.status >= 200 && xhr.status <= 299;
    } // `a.click()` doesn't work for all browsers (#465)
  
  
    function click(node) {
      try {
        node.dispatchEvent(new MouseEvent('click'));
      } catch (e) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
      }
    } // Detect WebView inside a native macOS app by ruling out all browsers
    // We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
    // https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
  
  
    var isMacOSWebView = /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);
    var saveAs = _global.saveAs || ( // probably in some web worker
    typeof window !== 'object' || window !== _global ? function saveAs() {}
    /* noop */
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
    : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {
      var URL = _global.URL || _global.webkitURL;
      var a = document.createElement('a');
      name = name || blob.name || 'download';
      a.download = name;
      a.rel = 'noopener'; // tabnabbing
      // TODO: detect chrome extensions & packaged apps
      // a.target = '_blank'
  
      if (typeof blob === 'string') {
        // Support regular links
        a.href = blob;
  
        if (a.origin !== location.origin) {
          corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
        } else {
          click(a);
        }
      } else {
        // Support blobs
        a.href = URL.createObjectURL(blob);
        setTimeout(function () {
          URL.revokeObjectURL(a.href);
        }, 4E4); // 40s
  
        setTimeout(function () {
          click(a);
        }, 0);
      }
    } // Use msSaveOrOpenBlob as a second approach
    : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
      name = name || blob.name || 'download';
  
      if (typeof blob === 'string') {
        if (corsEnabled(blob)) {
          download(blob, name, opts);
        } else {
          var a = document.createElement('a');
          a.href = blob;
          a.target = '_blank';
          setTimeout(function () {
            click(a);
          });
        }
      } else {
        navigator.msSaveOrOpenBlob(bom(blob, opts), name);
      }
    } // Fallback to using FileReader and a popup
    : function saveAs(blob, name, opts, popup) {
      // Open a popup immediately do go around popup blocker
      // Mostly only available on user interaction and the fileReader is async so...
      popup = popup || open('', '_blank');
  
      if (popup) {
        popup.document.title = popup.document.body.innerText = 'downloading...';
      }
  
      if (typeof blob === 'string') return download(blob, name, opts);
      var force = blob.type === 'application/octet-stream';
  
      var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;
  
      var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
  
      if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
        // Safari doesn't allow downloading of blob URLs
        var reader = new FileReader();
  
        reader.onloadend = function () {
          var url = reader.result;
          url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
          if (popup) popup.location.href = url;else location = url;
          popup = null; // reverse-tabnabbing #460
        };
  
        reader.readAsDataURL(blob);
      } else {
        var URL = _global.URL || _global.webkitURL;
        var url = URL.createObjectURL(blob);
        if (popup) popup.location = url;else location.href = url;
        popup = null; // reverse-tabnabbing #460
  
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 4E4); // 40s
      }
    });
    _global.saveAs = saveAs.saveAs = saveAs;
  
    if (typeof module !== 'undefined') {
      module.exports = saveAs;
    }
  });
