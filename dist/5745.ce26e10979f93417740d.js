(()=>{var e={45745:function(e,t,r){var n=void 0!==n?n:{};"undefined"!=typeof self&&self,e.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){(function(t){var r,i,o=new Promise((function(e){i=e}));t.onmessage=function(e){o.then((function(){switch(e.data.command){case"decode":r&&r.decode(e.data.pages);break;case"done":r&&(r.sendLastBuffer(),t.close());break;case"init":r=new s(e.data,n)}}))};var s=function(e,t){if(!t)throw new Error("Module with exports required to initialize a decoder instance");this.mainReady=o,this.config=Object.assign({bufferLength:4096,decoderSampleRate:48e3,outputBufferSampleRate:48e3,resampleQuality:3},e),this._opus_decoder_create=t._opus_decoder_create,this._opus_decoder_destroy=t._opus_decoder_destroy,this._speex_resampler_process_interleaved_float=t._speex_resampler_process_interleaved_float,this._speex_resampler_init=t._speex_resampler_init,this._speex_resampler_destroy=t._speex_resampler_destroy,this._opus_decode_float=t._opus_decode_float,this._free=t._free,this._malloc=t._malloc,this.HEAPU8=t.HEAPU8,this.HEAP16=t.HEAP16,this.HEAP32=t.HEAP32,this.HEAPF32=t.HEAPF32,this.outputBuffers=[]};s.prototype.decode=function(e){var t=new DataView(e.buffer),r=this.getPageBoundaries(t),n=r.length-1;r.map((function(r,i){var o=t.getUint8(r+5,!0),s=t.getUint32(r+18,!0);if(2&o&&(this.numberOfChannels=t.getUint8(r+37,!0),this.init()),s>1){for(var u=t.getUint8(r+26,!0),a=r+27+u,f=0;f<u;f++){var c=t.getUint8(r+27+f,!0);if(this.decoderBuffer.set(e.subarray(a,a+=c),this.decoderBufferIndex),this.decoderBufferIndex+=c,c<255){var l=this._opus_decode_float(this.decoder,this.decoderBufferPointer,this.decoderBufferIndex,this.decoderOutputPointer,this.decoderOutputMaxLength,0),h=Math.ceil(l*this.config.outputBufferSampleRate/this.config.decoderSampleRate);this.HEAP32[this.decoderOutputLengthPointer>>2]=l,this.HEAP32[this.resampleOutputLengthPointer>>2]=h,this._speex_resampler_process_interleaved_float(this.resampler,this.decoderOutputPointer,this.decoderOutputLengthPointer,this.resampleOutputBufferPointer,this.resampleOutputLengthPointer),this.sendToOutputBuffers(this.HEAPF32.subarray(this.resampleOutputBufferPointer>>2,(this.resampleOutputBufferPointer>>2)+h*this.numberOfChannels)),this.decoderBufferIndex=0}}(4&o||i==n)&&this.sendLastBuffer()}}),this)},s.prototype.getPageBoundaries=function(e){for(var t=[],r=0;r<e.byteLength-32;r++)1399285583==e.getUint32(r,!0)&&t.push(r);return t},s.prototype.init=function(){this.resetOutputBuffers(),this.initCodec(),this.initResampler()},s.prototype.initCodec=function(){this.decoder&&(this._opus_decoder_destroy(this.decoder),this._free(this.decoderBufferPointer),this._free(this.decoderOutputLengthPointer),this._free(this.decoderOutputPointer));var e=this._malloc(4);this.decoder=this._opus_decoder_create(this.config.decoderSampleRate,this.numberOfChannels,e),this._free(e),this.decoderBufferMaxLength=4e3,this.decoderBufferPointer=this._malloc(this.decoderBufferMaxLength),this.decoderBuffer=this.HEAPU8.subarray(this.decoderBufferPointer,this.decoderBufferPointer+this.decoderBufferMaxLength),this.decoderBufferIndex=0,this.decoderOutputLengthPointer=this._malloc(4),this.decoderOutputMaxLength=this.config.decoderSampleRate*this.numberOfChannels*120/1e3,this.decoderOutputPointer=this._malloc(4*this.decoderOutputMaxLength)},s.prototype.initResampler=function(){this.resampler&&(this._speex_resampler_destroy(this.resampler),this._free(this.resampleOutputLengthPointer),this._free(this.resampleOutputBufferPointer));var e=this._malloc(4);this.resampler=this._speex_resampler_init(this.numberOfChannels,this.config.decoderSampleRate,this.config.outputBufferSampleRate,this.config.resampleQuality,e),this._free(e),this.resampleOutputLengthPointer=this._malloc(4),this.resampleOutputMaxLength=Math.ceil(this.decoderOutputMaxLength*this.config.outputBufferSampleRate/this.config.decoderSampleRate),this.resampleOutputBufferPointer=this._malloc(4*this.resampleOutputMaxLength)},s.prototype.resetOutputBuffers=function(){this.outputBuffers=[],this.outputBufferArrayBuffers=[],this.outputBufferIndex=0;for(var e=0;e<this.numberOfChannels;e++)this.outputBuffers.push(new Float32Array(this.config.bufferLength)),this.outputBufferArrayBuffers.push(this.outputBuffers[e].buffer)},s.prototype.sendLastBuffer=function(){this.sendToOutputBuffers(new Float32Array((this.config.bufferLength-this.outputBufferIndex)*this.numberOfChannels)),t.postMessage(null)},s.prototype.sendToOutputBuffers=function(e){for(var r=0,n=e.length/this.numberOfChannels;r<n;){var i=Math.min(n-r,this.config.bufferLength-this.outputBufferIndex);if(1===this.numberOfChannels)this.outputBuffers[0].set(e.subarray(r,r+i),this.outputBufferIndex);else for(var o=0;o<i;o++)this.outputBuffers.forEach((function(t,n){t[this.outputBufferIndex+o]=e[(r+o)*this.numberOfChannels+n]}),this);r+=i,this.outputBufferIndex+=i,this.outputBufferIndex==this.config.bufferLength&&(t.postMessage(this.outputBuffers,this.outputBufferArrayBuffers),this.resetOutputBuffers())}},n||(n={}),n.mainReady=o,n.OggOpusDecoder=s,n.onRuntimeInitialized=i,e.exports=n}).call(this,r(1))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r}]);var i,o={};for(i in n)n.hasOwnProperty(i)&&(o[i]=n[i]);var s,u,a,f,c=[];a="object"==typeof window,f="function"==typeof importScripts,s="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,u=!a&&!s&&!f;var l,h,p,d,m="";s?(m=f?r(26470).dirname(m)+"/":"//",l=function(e,t){return p||(p=r(50516)),d||(d=r(26470)),e=d.normalize(e),p.readFileSync(e,t?null:"utf8")},h=function(e){var t=l(e,!0);return t.buffer||(t=new Uint8Array(t)),x(t.buffer),t},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),c=process.argv.slice(2),e.exports=n,process.on("uncaughtException",(function(e){if(!(e instanceof Y))throw e})),process.on("unhandledRejection",k),n.inspect=function(){return"[Emscripten Module object]"}):u?("undefined"!=typeof read&&(l=function(e){return read(e)}),h=function(e){var t;return"function"==typeof readbuffer?new Uint8Array(readbuffer(e)):(x("object"==typeof(t=read(e,"binary"))),t)},"undefined"!=typeof scriptArgs?c=scriptArgs:void 0!==arguments&&(c=arguments),"undefined"!=typeof print&&("undefined"==typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!=typeof printErr?printErr:print)):(a||f)&&(f?m=self.location.href:document.currentScript&&(m=document.currentScript.src),m=0!==m.indexOf("blob:")?m.substr(0,m.lastIndexOf("/")+1):"",l=function(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},f&&(h=function(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}));var g,_,y=n.print||console.log.bind(console),v=n.printErr||console.warn.bind(console);for(i in o)o.hasOwnProperty(i)&&(n[i]=o[i]);o=null,n.arguments&&(c=n.arguments),n.thisProgram&&n.thisProgram,n.quit&&n.quit,n.wasmBinary&&(g=n.wasmBinary),n.noExitRuntime&&n.noExitRuntime,"object"!=typeof WebAssembly&&v("no native wasm support detected");var b=new WebAssembly.Table({initial:9,maximum:9,element:"anyfunc"}),A=!1;function x(e,t){e||k("Assertion failed: "+t)}var w,O,B,P="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function C(e,t,r){for(var n=t+r,i=t;e[i]&&!(i>=n);)++i;if(i-t>16&&e.subarray&&P)return P.decode(e.subarray(t,i));for(var o="";t<i;){var s=e[t++];if(128&s){var u=63&e[t++];if(192!=(224&s)){var a=63&e[t++];if((s=224==(240&s)?(15&s)<<12|u<<6|a:(7&s)<<18|u<<12|a<<6|63&e[t++])<65536)o+=String.fromCharCode(s);else{var f=s-65536;o+=String.fromCharCode(55296|f>>10,56320|1023&f)}}else o+=String.fromCharCode((31&s)<<6|u)}else o+=String.fromCharCode(s)}return o}var R,E=n.INITIAL_MEMORY||16777216;function S(e){for(;e.length>0;){var t=e.shift();if("function"!=typeof t){var r=t.func;"number"==typeof r?void 0===t.arg?n.dynCall_v(r):n.dynCall_vi(r,t.arg):r(void 0===t.arg?null:t.arg)}else t(n)}}(_=n.wasmMemory?n.wasmMemory:new WebAssembly.Memory({initial:E/65536,maximum:E/65536}))&&(w=_.buffer),E=w.byteLength,w=R=w,n.HEAP8=new Int8Array(R),n.HEAP16=new Int16Array(R),n.HEAP32=B=new Int32Array(R),n.HEAPU8=O=new Uint8Array(R),n.HEAPU16=new Uint16Array(R),n.HEAPU32=new Uint32Array(R),n.HEAPF32=new Float32Array(R),n.HEAPF64=new Float64Array(R),B[9996]=5283024;var I=[],L=[],M=[],H=[],j=0,T=null,U=null;function k(e){throw n.onAbort&&n.onAbort(e),y(e+=""),v(e),A=!0,e="abort("+e+"). Build with -s ASSERTIONS=1 for more info.",new WebAssembly.RuntimeError(e)}function W(e,t){return String.prototype.startsWith?e.startsWith(t):0===e.indexOf(t)}n.preloadedImages={},n.preloadedAudios={};function F(e){return W(e,"data:application/octet-stream;base64,")}function D(e){return W(e,"file://")}var z,q="decoderWorker.min.wasm";function N(){try{if(g)return new Uint8Array(g);if(h)return h(q);throw"both async and sync fetching of the wasm failed"}catch(e){k(e)}}F(q)||(z=q,q=n.locateFile?n.locateFile(z,m):m+z),L.push({func:function(){V()}});var G={mappings:{},buffers:[null,[],[]],printChar:function(e,t){var r=G.buffers[e];0===t||10===t?((1===e?y:v)(C(r,0)),r.length=0):r.push(t)},varargs:void 0,get:function(){return G.varargs+=4,B[G.varargs-4>>2]},getStr:function(e){var t=function(e,t){return e?C(O,e,void 0):""}(e);return t},get64:function(e,t){return e}},Q={c:function(){k()},e:function(e,t,r){O.copyWithin(e,t,t+r)},f:function(e){k("OOM")},d:function(e){return 0},b:function(e,t,r,n,i){},a:function(e,t,r,n){for(var i=0,o=0;o<r;o++){for(var s=B[t+8*o>>2],u=B[t+(8*o+4)>>2],a=0;a<u;a++)G.printChar(e,O[s+a]);i+=u}return B[n>>2]=i,0},memory:_,table:b},X=function(){var e={a:Q};function t(e,t){var r=e.exports;n.asm=r,function(e){if(j--,n.monitorRunDependencies&&n.monitorRunDependencies(j),0==j&&(null!==T&&(clearInterval(T),T=null),U)){var t=U;U=null,t()}}()}function r(e){t(e.instance)}function i(t){return(g||!a&&!f||"function"!=typeof fetch||D(q)?new Promise((function(e,t){e(N())})):fetch(q,{credentials:"same-origin"}).then((function(e){if(!e.ok)throw"failed to load wasm binary file at '"+q+"'";return e.arrayBuffer()})).catch((function(){return N()}))).then((function(t){return WebAssembly.instantiate(t,e)})).then(t,(function(e){v("failed to asynchronously prepare wasm: "+e),k(e)}))}if(j++,n.monitorRunDependencies&&n.monitorRunDependencies(j),n.instantiateWasm)try{return n.instantiateWasm(e,t)}catch(e){return v("Module.instantiateWasm callback failed with error: "+e),!1}return function(){if(g||"function"!=typeof WebAssembly.instantiateStreaming||F(q)||D(q)||"function"!=typeof fetch)return i(r);fetch(q,{credentials:"same-origin"}).then((function(t){return WebAssembly.instantiateStreaming(t,e).then(r,(function(e){v("wasm streaming compile failed: "+e),v("falling back to ArrayBuffer instantiation"),i(r)}))}))}(),{}}();n.asm=X;var J,V=n.___wasm_call_ctors=function(){return(V=n.___wasm_call_ctors=n.asm.g).apply(null,arguments)};function Y(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function K(e){function t(){J||(J=!0,n.calledRun=!0,A||(S(L),S(M),n.onRuntimeInitialized&&n.onRuntimeInitialized(),function(){if(n.postRun)for("function"==typeof n.postRun&&(n.postRun=[n.postRun]);n.postRun.length;)e=n.postRun.shift(),H.unshift(e);var e;S(H)}()))}e=e||c,j>0||(function(){if(n.preRun)for("function"==typeof n.preRun&&(n.preRun=[n.preRun]);n.preRun.length;)e=n.preRun.shift(),I.unshift(e);var e;S(I)}(),j>0||(n.setStatus?(n.setStatus("Running..."),setTimeout((function(){setTimeout((function(){n.setStatus("")}),1),t()}),1)):t()))}if(n._opus_decoder_create=function(){return(n._opus_decoder_create=n.asm.h).apply(null,arguments)},n._opus_decode_float=function(){return(n._opus_decode_float=n.asm.i).apply(null,arguments)},n._opus_decoder_destroy=function(){return(n._opus_decoder_destroy=n.asm.j).apply(null,arguments)},n._speex_resampler_init=function(){return(n._speex_resampler_init=n.asm.k).apply(null,arguments)},n._speex_resampler_destroy=function(){return(n._speex_resampler_destroy=n.asm.l).apply(null,arguments)},n._speex_resampler_process_interleaved_float=function(){return(n._speex_resampler_process_interleaved_float=n.asm.m).apply(null,arguments)},n._malloc=function(){return(n._malloc=n.asm.n).apply(null,arguments)},n._free=function(){return(n._free=n.asm.o).apply(null,arguments)},n.asm=X,U=function e(){J||K(),J||(U=e)},n.run=K,n.preInit)for("function"==typeof n.preInit&&(n.preInit=[n.preInit]);n.preInit.length>0;)n.preInit.pop()();K()},26470:e=>{"use strict";function t(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function r(e,t){for(var r,n="",i=0,o=-1,s=0,u=0;u<=e.length;++u){if(u<e.length)r=e.charCodeAt(u);else{if(47===r)break;r=47}if(47===r){if(o===u-1||1===s);else if(o!==u-1&&2===s){if(n.length<2||2!==i||46!==n.charCodeAt(n.length-1)||46!==n.charCodeAt(n.length-2))if(n.length>2){var a=n.lastIndexOf("/");if(a!==n.length-1){-1===a?(n="",i=0):i=(n=n.slice(0,a)).length-1-n.lastIndexOf("/"),o=u,s=0;continue}}else if(2===n.length||1===n.length){n="",i=0,o=u,s=0;continue}t&&(n.length>0?n+="/..":n="..",i=2)}else n.length>0?n+="/"+e.slice(o+1,u):n=e.slice(o+1,u),i=u-o-1;o=u,s=0}else 46===r&&-1!==s?++s:s=-1}return n}var n={resolve:function(){for(var e,n="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var s;o>=0?s=arguments[o]:(void 0===e&&(e=process.cwd()),s=e),t(s),0!==s.length&&(n=s+"/"+n,i=47===s.charCodeAt(0))}return n=r(n,!i),i?n.length>0?"/"+n:"/":n.length>0?n:"."},normalize:function(e){if(t(e),0===e.length)return".";var n=47===e.charCodeAt(0),i=47===e.charCodeAt(e.length-1);return 0!==(e=r(e,!n)).length||n||(e="."),e.length>0&&i&&(e+="/"),n?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,r=0;r<arguments.length;++r){var i=arguments[r];t(i),i.length>0&&(void 0===e?e=i:e+="/"+i)}return void 0===e?".":n.normalize(e)},relative:function(e,r){if(t(e),t(r),e===r)return"";if((e=n.resolve(e))===(r=n.resolve(r)))return"";for(var i=1;i<e.length&&47===e.charCodeAt(i);++i);for(var o=e.length,s=o-i,u=1;u<r.length&&47===r.charCodeAt(u);++u);for(var a=r.length-u,f=s<a?s:a,c=-1,l=0;l<=f;++l){if(l===f){if(a>f){if(47===r.charCodeAt(u+l))return r.slice(u+l+1);if(0===l)return r.slice(u+l)}else s>f&&(47===e.charCodeAt(i+l)?c=l:0===l&&(c=0));break}var h=e.charCodeAt(i+l);if(h!==r.charCodeAt(u+l))break;47===h&&(c=l)}var p="";for(l=i+c+1;l<=o;++l)l!==o&&47!==e.charCodeAt(l)||(0===p.length?p+="..":p+="/..");return p.length>0?p+r.slice(u+c):(u+=c,47===r.charCodeAt(u)&&++u,r.slice(u))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var r=e.charCodeAt(0),n=47===r,i=-1,o=!0,s=e.length-1;s>=1;--s)if(47===(r=e.charCodeAt(s))){if(!o){i=s;break}}else o=!1;return-1===i?n?"/":".":n&&1===i?"//":e.slice(0,i)},basename:function(e,r){if(void 0!==r&&"string"!=typeof r)throw new TypeError('"ext" argument must be a string');t(e);var n,i=0,o=-1,s=!0;if(void 0!==r&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var u=r.length-1,a=-1;for(n=e.length-1;n>=0;--n){var f=e.charCodeAt(n);if(47===f){if(!s){i=n+1;break}}else-1===a&&(s=!1,a=n+1),u>=0&&(f===r.charCodeAt(u)?-1==--u&&(o=n):(u=-1,o=a))}return i===o?o=a:-1===o&&(o=e.length),e.slice(i,o)}for(n=e.length-1;n>=0;--n)if(47===e.charCodeAt(n)){if(!s){i=n+1;break}}else-1===o&&(s=!1,o=n+1);return-1===o?"":e.slice(i,o)},extname:function(e){t(e);for(var r=-1,n=0,i=-1,o=!0,s=0,u=e.length-1;u>=0;--u){var a=e.charCodeAt(u);if(47!==a)-1===i&&(o=!1,i=u+1),46===a?-1===r?r=u:1!==s&&(s=1):-1!==r&&(s=-1);else if(!o){n=u+1;break}}return-1===r||-1===i||0===s||1===s&&r===i-1&&r===n+1?"":e.slice(r,i)},format:function(e){if(null===e||"object"!=typeof e)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return function(e,t){var r=t.dir||t.root,n=t.base||(t.name||"")+(t.ext||"");return r?r===t.root?r+n:r+"/"+n:n}(0,e)},parse:function(e){t(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return r;var n,i=e.charCodeAt(0),o=47===i;o?(r.root="/",n=1):n=0;for(var s=-1,u=0,a=-1,f=!0,c=e.length-1,l=0;c>=n;--c)if(47!==(i=e.charCodeAt(c)))-1===a&&(f=!1,a=c+1),46===i?-1===s?s=c:1!==l&&(l=1):-1!==s&&(l=-1);else if(!f){u=c+1;break}return-1===s||-1===a||0===l||1===l&&s===a-1&&s===u+1?-1!==a&&(r.base=r.name=0===u&&o?e.slice(1,a):e.slice(u,a)):(0===u&&o?(r.name=e.slice(1,s),r.base=e.slice(1,a)):(r.name=e.slice(u,s),r.base=e.slice(u,a)),r.ext=e.slice(s,a)),u>0?r.dir=e.slice(0,u-1):o&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};n.posix=n,e.exports=n},50516:()=>{}},t={};!function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(45745)})();
//# sourceMappingURL=5745.ce26e10979f93417740d.js.map