// Support for growable heap + pthreads, where the buffer may change, so JS views
// must be updated.
function GROWABLE_HEAP_STORE_I8(ptr, value) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  HEAP8[ptr] = value;
}
function GROWABLE_HEAP_STORE_I16(ptr, value) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  HEAP16[ptr >> 1] = value;
}
function GROWABLE_HEAP_STORE_I32(ptr, value) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  HEAP32[ptr >> 2] = value;
}
function GROWABLE_HEAP_STORE_F32(ptr, value) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  HEAPF32[ptr >> 2] = value;
}
function GROWABLE_HEAP_STORE_F64(ptr, value) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  HEAPF64[ptr >> 3] = value;
}

function GROWABLE_HEAP_LOAD_I8(ptr) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  return HEAP8[ptr];
}
function GROWABLE_HEAP_LOAD_U8(ptr) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  return HEAPU8[ptr];
}
function GROWABLE_HEAP_LOAD_I16(ptr) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  return HEAP16[ptr >> 1];
}
function GROWABLE_HEAP_LOAD_U16(ptr) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  return HEAPU16[ptr >> 1];
}
function GROWABLE_HEAP_LOAD_I32(ptr) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  return HEAP32[ptr >> 2];
}
function GROWABLE_HEAP_LOAD_U32(ptr) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  return HEAPU32[ptr >> 2];
}
function GROWABLE_HEAP_LOAD_F32(ptr) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  return HEAPF32[ptr >> 2];
}
function GROWABLE_HEAP_LOAD_F64(ptr) {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer);
  }
  return HEAPF64[ptr >> 3];
}
function GROWABLE_HEAP_VIEW_I8(start, end) {
  return new Int8Array(wasmMemory.buffer, start, end - start);
}
function GROWABLE_HEAP_VIEW_U8(start, end) {
  return new Uint8Array(wasmMemory.buffer, start, end - start);
}
function GROWABLE_HEAP_VIEW_I16(start, end) {
  return new Int16Array(wasmMemory.buffer, start >> 1, end - start >> 1);
}
function GROWABLE_HEAP_VIEW_U16(start, end) {
  return new Uint16Array(wasmMemory.buffer, start >> 1, end - start >> 1);
}
function GROWABLE_HEAP_VIEW_I32(start, end) {
  return new Int32Array(wasmMemory.buffer, start >> 2, end - start >> 2);
}
function GROWABLE_HEAP_VIEW_U32(start, end) {
  return new Uint32Array(wasmMemory.buffer, start >> 2, end - start >> 2);
}
function GROWABLE_HEAP_VIEW_F32(start, end) {
  return new Float32Array(wasmMemory.buffer, start >> 2, end - start >> 2);
}
function GROWABLE_HEAP_VIEW_F64(start, end) {
  return new Float64Array(wasmMemory.buffer, start >> 3, end - start >> 3);
}


var Module = typeof Module !== "undefined" ? Module : {};
if (typeof window === "object") {
 Module["arguments"] = window.location.search.substr(1).trim().split("&");
 if (!Module["arguments"][0]) {
  Module["arguments"] = [];
 }
}
var moduleOverrides = {};
var key;
for (key in Module) {
 if (Module.hasOwnProperty(key)) {
  moduleOverrides[key] = Module[key];
 }
}
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = (function(status, toThrow) {
 throw toThrow;
});
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_HAS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === "object";
ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
ENVIRONMENT_HAS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (Module["ENVIRONMENT"]) {
 throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
}
var ENVIRONMENT_IS_PTHREAD = Module["ENVIRONMENT_IS_PTHREAD"] || false;
if (ENVIRONMENT_IS_PTHREAD) {
 buffer = Module["buffer"];
 tempDoublePtr = Module["tempDoublePtr"];
 DYNAMIC_BASE = Module["DYNAMIC_BASE"];
 DYNAMICTOP_PTR = Module["DYNAMICTOP_PTR"];
}
var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : undefined;
var scriptDirectory = "";
function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}
var read_, readAsync, readBinary, setWindowTitle;
if (ENVIRONMENT_IS_NODE) {
 scriptDirectory = __dirname + "/";
 var nodeFS;
 var nodePath;
 read_ = function shell_read(filename, binary) {
  var ret;
  if (!nodeFS) nodeFS = require("fs");
  if (!nodePath) nodePath = require("path");
  filename = nodePath["normalize"](filename);
  ret = nodeFS["readFileSync"](filename);
  return binary ? ret : ret.toString();
 };
 readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
 };
 if (process["argv"].length > 1) {
  thisProgram = process["argv"][1].replace(/\\/g, "/");
 }
 arguments_ = process["argv"].slice(2);
 if (typeof module !== "undefined") {
  module["exports"] = Module;
 }
 process["on"]("uncaughtException", (function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 }));
 process["on"]("unhandledRejection", abort);
 quit_ = (function(status) {
  process["exit"](status);
 });
 Module["inspect"] = (function() {
  return "[Emscripten Module object]";
 });
} else if (ENVIRONMENT_IS_SHELL) {
 if (typeof read != "undefined") {
  read_ = function shell_read(f) {
   return read(f);
  };
 }
 readBinary = function readBinary(f) {
  var data;
  if (typeof readbuffer === "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data === "object");
  return data;
 };
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit === "function") {
  quit_ = (function(status) {
   quit(status);
  });
 }
 if (typeof print !== "undefined") {
  if (typeof console === "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 read_ = function shell_read(url) {
  var xhr = new XMLHttpRequest;
  xhr.open("GET", url, false);
  xhr.send(null);
  return xhr.responseText;
 };
 if (ENVIRONMENT_IS_WORKER) {
  readBinary = function readBinary(url) {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, false);
   xhr.responseType = "arraybuffer";
   xhr.send(null);
   return new Uint8Array(xhr.response);
  };
 }
 readAsync = function readAsync(url, onload, onerror) {
  var xhr = new XMLHttpRequest;
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function xhr_onload() {
   if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
    onload(xhr.response);
    return;
   }
   onerror();
  };
  xhr.onerror = onerror;
  xhr.send(null);
 };
 setWindowTitle = (function(title) {
  document.title = title;
 });
} else {
 throw new Error("environment detection error");
}
var out = Module["print"] || console.log.bind(console);
var err = Module["printErr"] || console.warn.bind(console);
for (key in moduleOverrides) {
 if (moduleOverrides.hasOwnProperty(key)) {
  Module[key] = moduleOverrides[key];
 }
}
moduleOverrides = null;
if (Module["arguments"]) arguments_ = Module["arguments"];
if (!Object.getOwnPropertyDescriptor(Module, "arguments")) Object.defineProperty(Module, "arguments", {
 configurable: true,
 get: (function() {
  abort("Module.arguments has been replaced with plain arguments_");
 })
});
if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
if (!Object.getOwnPropertyDescriptor(Module, "thisProgram")) Object.defineProperty(Module, "thisProgram", {
 configurable: true,
 get: (function() {
  abort("Module.thisProgram has been replaced with plain thisProgram");
 })
});
if (Module["quit"]) quit_ = Module["quit"];
if (!Object.getOwnPropertyDescriptor(Module, "quit")) Object.defineProperty(Module, "quit", {
 configurable: true,
 get: (function() {
  abort("Module.quit has been replaced with plain quit_");
 })
});
assert(typeof Module["memoryInitializerPrefixURL"] === "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["pthreadMainPrefixURL"] === "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["cdInitializerPrefixURL"] === "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["filePackagePrefixURL"] === "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["read"] === "undefined", "Module.read option was removed (modify read_ in JS)");
assert(typeof Module["readAsync"] === "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
assert(typeof Module["readBinary"] === "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
assert(typeof Module["setWindowTitle"] === "undefined", "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
if (!Object.getOwnPropertyDescriptor(Module, "read")) Object.defineProperty(Module, "read", {
 configurable: true,
 get: (function() {
  abort("Module.read has been replaced with plain read_");
 })
});
if (!Object.getOwnPropertyDescriptor(Module, "readAsync")) Object.defineProperty(Module, "readAsync", {
 configurable: true,
 get: (function() {
  abort("Module.readAsync has been replaced with plain readAsync");
 })
});
if (!Object.getOwnPropertyDescriptor(Module, "readBinary")) Object.defineProperty(Module, "readBinary", {
 configurable: true,
 get: (function() {
  abort("Module.readBinary has been replaced with plain readBinary");
 })
});
assert(ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER, "Pthreads do not work in non-browser environments yet (need Web Workers, or an alternative to them)");
var STACK_ALIGN = 16;
stackSave = stackRestore = stackAlloc = (function() {
 abort("cannot use the stack before compiled code is ready to run, and has provided stack access");
});
function staticAlloc(size) {
 abort("staticAlloc is no longer available at runtime; instead, perform static allocations at compile time (using makeStaticAlloc)");
}
function dynamicAlloc(size) {
 assert(DYNAMICTOP_PTR);
 assert(!ENVIRONMENT_IS_PTHREAD);
 var ret = GROWABLE_HEAP_LOAD_I32(DYNAMICTOP_PTR | 0);
 var end = ret + size + 15 & -16;
 if (end > _emscripten_get_heap_size()) {
  abort("failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly");
 }
 GROWABLE_HEAP_STORE_I32(DYNAMICTOP_PTR | 0, end);
 return ret;
}
function alignMemory(size, factor) {
 if (!factor) factor = STACK_ALIGN;
 return Math.ceil(size / factor) * factor;
}
function getNativeTypeSize(type) {
 switch (type) {
 case "i1":
 case "i8":
  return 1;
 case "i16":
  return 2;
 case "i32":
  return 4;
 case "i64":
  return 8;
 case "float":
  return 4;
 case "double":
  return 8;
 default:
  {
   if (type[type.length - 1] === "*") {
    return 4;
   } else if (type[0] === "i") {
    var bits = parseInt(type.substr(1));
    assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
    return bits / 8;
   } else {
    return 0;
   }
  }
 }
}
function warnOnce(text) {
 if (!warnOnce.shown) warnOnce.shown = {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
}
var asm2wasmImports = {
 "f64-rem": (function(x, y) {
  return x % y;
 }),
 "debugger": (function() {
  debugger;
 })
};
function convertJsFunctionToWasm(func, sig) {
 var typeSection = [ 1, 0, 1, 96 ];
 var sigRet = sig.slice(0, 1);
 var sigParam = sig.slice(1);
 var typeCodes = {
  "i": 127,
  "j": 126,
  "f": 125,
  "d": 124
 };
 typeSection.push(sigParam.length);
 for (var i = 0; i < sigParam.length; ++i) {
  typeSection.push(typeCodes[sigParam[i]]);
 }
 if (sigRet == "v") {
  typeSection.push(0);
 } else {
  typeSection = typeSection.concat([ 1, typeCodes[sigRet] ]);
 }
 typeSection[1] = typeSection.length - 2;
 var bytes = new Uint8Array([ 0, 97, 115, 109, 1, 0, 0, 0 ].concat(typeSection, [ 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0 ]));
 var module = new WebAssembly.Module(bytes);
 var instance = new WebAssembly.Instance(module, {
  e: {
   f: func
  }
 });
 var wrappedFunc = instance.exports.f;
 return wrappedFunc;
}
function addFunctionWasm(func, sig) {
 var table = wasmTable;
 var ret = table.length;
 try {
  table.grow(1);
 } catch (err) {
  if (!err instanceof RangeError) {
   throw err;
  }
  throw "Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH.";
 }
 try {
  table.set(ret, func);
 } catch (err) {
  if (!err instanceof TypeError) {
   throw err;
  }
  assert(typeof sig !== "undefined", "Missing signature argument to addFunction");
  var wrapped = convertJsFunctionToWasm(func, sig);
  table.set(ret, wrapped);
 }
 return ret;
}
function removeFunctionWasm(index) {}
function addFunction(func, sig) {
 assert(typeof func !== "undefined");
 return addFunctionWasm(func, sig);
}
function removeFunction(index) {
 removeFunctionWasm(index);
}
var funcWrappers = {};
function getFuncWrapper(func, sig) {
 if (!func) return;
 assert(sig);
 if (!funcWrappers[sig]) {
  funcWrappers[sig] = {};
 }
 var sigCache = funcWrappers[sig];
 if (!sigCache[func]) {
  if (sig.length === 1) {
   sigCache[func] = function dynCall_wrapper() {
    return dynCall(sig, func);
   };
  } else if (sig.length === 2) {
   sigCache[func] = function dynCall_wrapper(arg) {
    return dynCall(sig, func, [ arg ]);
   };
  } else {
   sigCache[func] = function dynCall_wrapper() {
    return dynCall(sig, func, Array.prototype.slice.call(arguments));
   };
  }
 }
 return sigCache[func];
}
function makeBigInt(low, high, unsigned) {
 return unsigned ? +(low >>> 0) + +(high >>> 0) * 4294967296 : +(low >>> 0) + +(high | 0) * 4294967296;
}
function dynCall(sig, ptr, args) {
 if (args && args.length) {
  assert(args.length == sig.length - 1);
  assert("dynCall_" + sig in Module, "bad function pointer type - no table for sig '" + sig + "'");
  return Module["dynCall_" + sig].apply(null, [ ptr ].concat(args));
 } else {
  assert(sig.length == 1);
  assert("dynCall_" + sig in Module, "bad function pointer type - no table for sig '" + sig + "'");
  return Module["dynCall_" + sig].call(null, ptr);
 }
}
var tempRet0 = 0;
var setTempRet0 = (function(value) {
 tempRet0 = value;
});
var getTempRet0 = (function() {
 return tempRet0;
});
function getCompilerSetting(name) {
 throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work";
}
var Runtime = {
 getTempRet0: (function() {
  abort('getTempRet0() is now a top-level function, after removing the Runtime object. Remove "Runtime."');
 }),
 staticAlloc: (function() {
  abort('staticAlloc() is now a top-level function, after removing the Runtime object. Remove "Runtime."');
 }),
 stackAlloc: (function() {
  abort('stackAlloc() is now a top-level function, after removing the Runtime object. Remove "Runtime."');
 })
};
var GLOBAL_BASE = 1024;
function establishStackSpace(base, max) {
 stackRestore(max);
}
var Atomics_load = Atomics.load;
var Atomics_store = Atomics.store;
var Atomics_compareExchange = Atomics.compareExchange;
var wasmBinary;
if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
if (!Object.getOwnPropertyDescriptor(Module, "wasmBinary")) Object.defineProperty(Module, "wasmBinary", {
 configurable: true,
 get: (function() {
  abort("Module.wasmBinary has been replaced with plain wasmBinary");
 })
});
var noExitRuntime;
if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
if (!Object.getOwnPropertyDescriptor(Module, "noExitRuntime")) Object.defineProperty(Module, "noExitRuntime", {
 configurable: true,
 get: (function() {
  abort("Module.noExitRuntime has been replaced with plain noExitRuntime");
 })
});
if (typeof WebAssembly !== "object") {
 abort("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
}
function setValue(ptr, value, type, noSafe) {
 type = type || "i8";
 if (type.charAt(type.length - 1) === "*") type = "i32";
 switch (type) {
 case "i1":
  GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
  break;
 case "i8":
  GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
  break;
 case "i16":
  GROWABLE_HEAP_STORE_I16(ptr | 0, value);
  break;
 case "i32":
  GROWABLE_HEAP_STORE_I32(ptr | 0, value);
  break;
 case "i64":
  tempI64 = [ value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], GROWABLE_HEAP_STORE_I32(ptr | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, tempI64[1]);
  break;
 case "float":
  GROWABLE_HEAP_STORE_F32(ptr | 0, value);
  break;
 case "double":
  GROWABLE_HEAP_STORE_F64(ptr | 0, value);
  break;
 default:
  abort("invalid type for setValue: " + type);
 }
}
function getValue(ptr, type, noSafe) {
 type = type || "i8";
 if (type.charAt(type.length - 1) === "*") type = "i32";
 switch (type) {
 case "i1":
  return GROWABLE_HEAP_LOAD_I8(ptr >> 0 | 0);
 case "i8":
  return GROWABLE_HEAP_LOAD_I8(ptr >> 0 | 0);
 case "i16":
  return GROWABLE_HEAP_LOAD_I16(ptr | 0);
 case "i32":
  return GROWABLE_HEAP_LOAD_I32(ptr | 0);
 case "i64":
  return GROWABLE_HEAP_LOAD_I32(ptr | 0);
 case "float":
  return GROWABLE_HEAP_LOAD_F32(ptr | 0);
 case "double":
  return GROWABLE_HEAP_LOAD_F64(ptr | 0);
 default:
  abort("invalid type for getValue: " + type);
 }
 return null;
}
var wasmMemory;
var wasmTable = new WebAssembly.Table({
 "initial": 12,
 "maximum": 12 + 0,
 "element": "anyfunc"
});
var wasmModule;
var threadInfoStruct = 0;
var selfThreadId = 0;
var __performance_now_clock_drift = 0;
var tempDoublePtr = 0;
var ABORT = false;
var EXITSTATUS = 0;
function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed: " + text);
 }
}
function getCFunc(ident) {
 var func = Module["_" + ident];
 assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
 return func;
}
function ccall(ident, returnType, argTypes, args, opts) {
 var toC = {
  "string": (function(str) {
   var ret = 0;
   if (str !== null && str !== undefined && str !== 0) {
    var len = (str.length << 2) + 1;
    ret = stackAlloc(len);
    stringToUTF8(str, ret, len);
   }
   return ret;
  }),
  "array": (function(arr) {
   var ret = stackAlloc(arr.length);
   writeArrayToMemory(arr, ret);
   return ret;
  })
 };
 function convertReturnValue(ret) {
  if (returnType === "string") return UTF8ToString(ret);
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
 assert(returnType !== "array", 'Return type should not be "array".');
 if (args) {
  for (var i = 0; i < args.length; i++) {
   var converter = toC[argTypes[i]];
   if (converter) {
    if (stack === 0) stack = stackSave();
    cArgs[i] = converter(args[i]);
   } else {
    cArgs[i] = args[i];
   }
  }
 }
 var ret = func.apply(null, cArgs);
 ret = convertReturnValue(ret);
 if (stack !== 0) stackRestore(stack);
 return ret;
}
function cwrap(ident, returnType, argTypes, opts) {
 return (function() {
  return ccall(ident, returnType, argTypes, arguments, opts);
 });
}
var ALLOC_NORMAL = 0;
var ALLOC_STACK = 1;
var ALLOC_DYNAMIC = 2;
var ALLOC_NONE = 3;
function allocate(slab, types, allocator, ptr) {
 var zeroinit, size;
 if (typeof slab === "number") {
  zeroinit = true;
  size = slab;
 } else {
  zeroinit = false;
  size = slab.length;
 }
 var singleType = typeof types === "string" ? types : null;
 var ret;
 if (allocator == ALLOC_NONE) {
  ret = ptr;
 } else {
  ret = [ _malloc, stackAlloc, dynamicAlloc ][allocator](Math.max(size, singleType ? 1 : types.length));
 }
 if (zeroinit) {
  var stop;
  ptr = ret;
  assert((ret & 3) == 0);
  stop = ret + (size & ~3);
  for (; ptr < stop; ptr += 4) {
   GROWABLE_HEAP_STORE_I32(ptr | 0, 0);
  }
  stop = ret + size;
  while (ptr < stop) {
   GROWABLE_HEAP_STORE_I8(ptr++ >> 0 | 0, 0);
  }
  return ret;
 }
 if (singleType === "i8") {
  if (slab.subarray || slab.slice) {
   HEAPU8.set(slab, ret);
  } else {
   HEAPU8.set(new Uint8Array(slab), ret);
  }
  return ret;
 }
 var i = 0, type, typeSize, previousType;
 while (i < size) {
  var curr = slab[i];
  type = singleType || types[i];
  if (type === 0) {
   i++;
   continue;
  }
  assert(type, "Must know what type to store in allocate!");
  if (type == "i64") type = "i32";
  setValue(ret + i, curr, type);
  if (previousType !== type) {
   typeSize = getNativeTypeSize(type);
   previousType = type;
  }
  i += typeSize;
 }
 return ret;
}
function getMemory(size) {
 if (!runtimeInitialized) return dynamicAlloc(size);
 return _malloc(size);
}
function Pointer_stringify(ptr, length) {
 abort("this function has been removed - you should use UTF8ToString(ptr, maxBytesToRead) instead!");
}
function AsciiToString(ptr) {
 var str = "";
 while (1) {
  var ch = GROWABLE_HEAP_LOAD_U8(ptr++ >> 0 | 0);
  if (!ch) return str;
  str += String.fromCharCode(ch);
 }
}
function stringToAscii(str, outPtr) {
 return writeAsciiToMemory(str, outPtr, false);
}
function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var str = "";
 while (!(idx >= endIdx)) {
  var u0 = u8Array[idx++];
  if (!u0) return str;
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = u8Array[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode((u0 & 31) << 6 | u1);
   continue;
  }
  var u2 = u8Array[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = (u0 & 15) << 12 | u1 << 6 | u2;
  } else {
   if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte 0x" + u0.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!");
   u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  }
 }
 return str;
}
function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}
function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   outU8Array[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   outU8Array[outIdx++] = 192 | u >> 6;
   outU8Array[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   outU8Array[outIdx++] = 224 | u >> 12;
   outU8Array[outIdx++] = 128 | u >> 6 & 63;
   outU8Array[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   if (u >= 2097152) warnOnce("Invalid Unicode code point 0x" + u.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).");
   outU8Array[outIdx++] = 240 | u >> 18;
   outU8Array[outIdx++] = 128 | u >> 12 & 63;
   outU8Array[outIdx++] = 128 | u >> 6 & 63;
   outU8Array[outIdx++] = 128 | u & 63;
  }
 }
 outU8Array[outIdx] = 0;
 return outIdx - startIdx;
}
function stringToUTF8(str, outPtr, maxBytesToWrite) {
 assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}
function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
  if (u <= 127) ++len; else if (u <= 2047) len += 2; else if (u <= 65535) len += 3; else len += 4;
 }
 return len;
}
function UTF16ToString(ptr) {
 assert(ptr % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
 var i = 0;
 var str = "";
 while (1) {
  var codeUnit = GROWABLE_HEAP_LOAD_I16(ptr + i * 2 | 0);
  if (codeUnit == 0) return str;
  ++i;
  str += String.fromCharCode(codeUnit);
 }
}
function stringToUTF16(str, outPtr, maxBytesToWrite) {
 assert(outPtr % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
 assert(typeof maxBytesToWrite == "number", "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 2) return 0;
 maxBytesToWrite -= 2;
 var startPtr = outPtr;
 var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
 for (var i = 0; i < numCharsToWrite; ++i) {
  var codeUnit = str.charCodeAt(i);
  GROWABLE_HEAP_STORE_I16(outPtr | 0, codeUnit);
  outPtr += 2;
 }
 GROWABLE_HEAP_STORE_I16(outPtr | 0, 0);
 return outPtr - startPtr;
}
function lengthBytesUTF16(str) {
 return str.length * 2;
}
function UTF32ToString(ptr) {
 assert(ptr % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
 var i = 0;
 var str = "";
 while (1) {
  var utf32 = GROWABLE_HEAP_LOAD_I32(ptr + i * 4 | 0);
  if (utf32 == 0) return str;
  ++i;
  if (utf32 >= 65536) {
   var ch = utf32 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  } else {
   str += String.fromCharCode(utf32);
  }
 }
}
function stringToUTF32(str, outPtr, maxBytesToWrite) {
 assert(outPtr % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
 assert(typeof maxBytesToWrite == "number", "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 4) return 0;
 var startPtr = outPtr;
 var endPtr = startPtr + maxBytesToWrite - 4;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) {
   var trailSurrogate = str.charCodeAt(++i);
   codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
  }
  GROWABLE_HEAP_STORE_I32(outPtr | 0, codeUnit);
  outPtr += 4;
  if (outPtr + 4 > endPtr) break;
 }
 GROWABLE_HEAP_STORE_I32(outPtr | 0, 0);
 return outPtr - startPtr;
}
function lengthBytesUTF32(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
  len += 4;
 }
 return len;
}
function allocateUTF8(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8Array(str, HEAP8, ret, size);
 return ret;
}
function allocateUTF8OnStack(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8Array(str, HEAP8, ret, size);
 return ret;
}
function writeStringToMemory(string, buffer, dontAddNull) {
 warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");
 var lastChar, end;
 if (dontAddNull) {
  end = buffer + lengthBytesUTF8(string);
  lastChar = GROWABLE_HEAP_LOAD_I8(end | 0);
 }
 stringToUTF8(string, buffer, Infinity);
 if (dontAddNull) GROWABLE_HEAP_STORE_I8(end | 0, lastChar);
}
function writeArrayToMemory(array, buffer) {
 assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
 HEAP8.set(array, buffer);
}
function writeAsciiToMemory(str, buffer, dontAddNull) {
 for (var i = 0; i < str.length; ++i) {
  assert(str.charCodeAt(i) === str.charCodeAt(i) & 255);
  GROWABLE_HEAP_STORE_I8(buffer++ >> 0 | 0, str.charCodeAt(i));
 }
 if (!dontAddNull) GROWABLE_HEAP_STORE_I8(buffer >> 0 | 0, 0);
}
var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
var ASMJS_PAGE_SIZE = 16777216;
function alignUp(x, multiple) {
 if (x % multiple > 0) {
  x += multiple - x % multiple;
 }
 return x;
}
var HEAP, buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
function updateGlobalBufferAndViews(buf) {
 buffer = buf;
 Module["HEAP8"] = HEAP8 = new Int8Array(buf);
 Module["HEAP16"] = HEAP16 = new Int16Array(buf);
 Module["HEAP32"] = HEAP32 = new Int32Array(buf);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}
var STATIC_BASE = 1024, STACK_BASE = 5251088, STACKTOP = STACK_BASE, STACK_MAX = 8208, DYNAMIC_BASE = 5251088, DYNAMICTOP_PTR = 7248;
assert(STACK_BASE % 16 === 0, "stack must start aligned");
assert(DYNAMIC_BASE % 16 === 0, "heap must start aligned");
if (ENVIRONMENT_IS_PTHREAD) {
 STACK_MAX = STACKTOP = STACK_MAX = 2147483647;
 Module["applyStackValues"] = (function(stackBase, stackTop, stackMax) {
  STACK_BASE = stackBase;
  STACKTOP = stackTop;
  STACK_MAX = stackMax;
 });
}
var TOTAL_STACK = 5242880;
if (Module["TOTAL_STACK"]) assert(TOTAL_STACK === Module["TOTAL_STACK"], "the stack size can no longer be determined at runtime");
var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 1073741824;
if (!Object.getOwnPropertyDescriptor(Module, "TOTAL_MEMORY")) Object.defineProperty(Module, "TOTAL_MEMORY", {
 configurable: true,
 get: (function() {
  abort("Module.TOTAL_MEMORY has been replaced with plain INITIAL_TOTAL_MEMORY");
 })
});
assert(INITIAL_TOTAL_MEMORY >= TOTAL_STACK, "TOTAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
assert(typeof Int32Array !== "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined, "JS engine does not provide full typed array support");
if (ENVIRONMENT_IS_PTHREAD) {
 wasmMemory = Module["wasmMemory"];
 buffer = Module["buffer"];
} else {
 if (Module["wasmMemory"]) {
  wasmMemory = Module["wasmMemory"];
 } else {
  wasmMemory = new WebAssembly.Memory({
   "initial": INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE,
   "maximum": 2198863872 / WASM_PAGE_SIZE,
   "shared": true
  });
  assert(wasmMemory.buffer instanceof SharedArrayBuffer, "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag");
 }
}
if (wasmMemory) {
 buffer = wasmMemory.buffer;
}
INITIAL_TOTAL_MEMORY = buffer.byteLength;
assert(INITIAL_TOTAL_MEMORY % WASM_PAGE_SIZE === 0);
assert(65536 % WASM_PAGE_SIZE === 0);
updateGlobalBufferAndViews(buffer);
if (!ENVIRONMENT_IS_PTHREAD) {
 GROWABLE_HEAP_STORE_I32(DYNAMICTOP_PTR | 0, DYNAMIC_BASE);
}
function writeStackCookie() {
 assert((STACK_MAX & 3) == 0);
 GROWABLE_HEAP_STORE_I32(((STACK_MAX >> 2) + 1) * 4 | 0, 34821223);
 GROWABLE_HEAP_STORE_I32(((STACK_MAX >> 2) + 2) * 4 | 0, 2310721022);
 GROWABLE_HEAP_STORE_I32(0 * 4 | 0, 1668509029);
}
function checkStackCookie() {
 var cookie1 = GROWABLE_HEAP_LOAD_U32(((STACK_MAX >> 2) + 1) * 4 | 0);
 var cookie2 = GROWABLE_HEAP_LOAD_U32(((STACK_MAX >> 2) + 2) * 4 | 0);
 if (cookie1 != 34821223 || cookie2 != 2310721022) {
  abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + cookie2.toString(16) + " " + cookie1.toString(16));
 }
 if (GROWABLE_HEAP_LOAD_I32(0 * 4 | 0) !== 1668509029) abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
}
function abortStackOverflow(allocSize) {
 abort("Stack overflow! Attempted to allocate " + allocSize + " bytes on the stack, but stack has only " + (STACK_MAX - stackSave() + allocSize) + " bytes available!");
}
((function() {
 var h16 = new Int16Array(1);
 var h8 = new Int8Array(h16.buffer);
 h16[0] = 25459;
 if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian!";
}))();
function abortFnPtrError(ptr, sig) {
 abort("Invalid function pointer " + ptr + " called with signature '" + sig + "'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this). Build with ASSERTIONS=2 for more info.");
}
function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  var callback = callbacks.shift();
  if (typeof callback == "function") {
   callback();
   continue;
  }
  var func = callback.func;
  if (typeof func === "number") {
   if (callback.arg === undefined) {
    Module["dynCall_v"](func);
   } else {
    Module["dynCall_vi"](func, callback.arg);
   }
  } else {
   func(callback.arg === undefined ? null : callback.arg);
  }
 }
}
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATEXIT__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
var runtimeExited = false;
if (ENVIRONMENT_IS_PTHREAD) runtimeInitialized = true;
function preRun() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}
function initRuntime() {
 checkStackCookie();
 assert(!runtimeInitialized);
 runtimeInitialized = true;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 TTY.init();
 callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
 checkStackCookie();
 if (ENVIRONMENT_IS_PTHREAD) return;
 FS.ignorePermissions = false;
 callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
 checkStackCookie();
 if (ENVIRONMENT_IS_PTHREAD) return;
 runtimeExited = true;
}
function postRun() {
 checkStackCookie();
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}
function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}
function addOnPreMain(cb) {
 __ATMAIN__.unshift(cb);
}
function addOnExit(cb) {}
function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}
function unSign(value, bits, ignore) {
 if (value >= 0) {
  return value;
 }
 return bits <= 32 ? 2 * Math.abs(1 << bits - 1) + value : Math.pow(2, bits) + value;
}
function reSign(value, bits, ignore) {
 if (value <= 0) {
  return value;
 }
 var half = bits <= 32 ? Math.abs(1 << bits - 1) : Math.pow(2, bits - 1);
 if (value >= half && (bits <= 32 || value > half)) {
  value = -2 * half + value;
 }
 return value;
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;
var runDependencyTracking = {};
function getUniqueRunDependency(id) {
 var orig = id;
 while (1) {
  if (!runDependencyTracking[id]) return id;
  id = orig + Math.random();
 }
 return id;
}
function addRunDependency(id) {
 assert(!ENVIRONMENT_IS_PTHREAD, "addRunDependency cannot be used in a pthread worker");
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(!runDependencyTracking[id]);
  runDependencyTracking[id] = 1;
  if (runDependencyWatcher === null && typeof setInterval !== "undefined") {
   runDependencyWatcher = setInterval((function() {
    if (ABORT) {
     clearInterval(runDependencyWatcher);
     runDependencyWatcher = null;
     return;
    }
    var shown = false;
    for (var dep in runDependencyTracking) {
     if (!shown) {
      shown = true;
      err("still waiting on run dependencies:");
     }
     err("dependency: " + dep);
    }
    if (shown) {
     err("(end of list)");
    }
   }), 1e4);
  }
 } else {
  err("warning: run dependency added without ID");
 }
}
function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(runDependencyTracking[id]);
  delete runDependencyTracking[id];
 } else {
  err("warning: run dependency removed without ID");
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}
Module["preloadedImages"] = {};
Module["preloadedAudios"] = {};
function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 if (ENVIRONMENT_IS_PTHREAD) console.error("Pthread aborting at " + (new Error).stack);
 what += "";
 out(what);
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 var extra = "";
 var output = "abort(" + what + ") at " + stackTrace() + extra;
 throw output;
}
var memoryInitializer = null;
if (!ENVIRONMENT_IS_PTHREAD) addOnPreRun((function() {
 if (typeof SharedArrayBuffer !== "undefined") {
  addRunDependency("pthreads");
  PThread.allocateUnusedWorkers(8, (function() {
   removeRunDependency("pthreads");
  }));
 }
}));
var dataURIPrefix = "data:application/octet-stream;base64,";
function isDataURI(filename) {
 return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
}
var wasmBinaryFile = "sequences.wasm";
if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}
function getBinary() {
 try {
  if (wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
   return readBinary(wasmBinaryFile);
  } else {
   throw "both async and sync fetching of the wasm failed";
  }
 } catch (err) {
  abort(err);
 }
}
function getBinaryPromise() {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
  return fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }).then((function(response) {
   if (!response["ok"]) {
    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
   }
   return response["arrayBuffer"]();
  })).catch((function() {
   return getBinary();
  }));
 }
 return new Promise((function(resolve, reject) {
  resolve(getBinary());
 }));
}
function createWasm() {
 var info = {
  "env": asmLibraryArg,
  "wasi_unstable": asmLibraryArg
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  Module["asm"] = exports;
  wasmModule = module;
  if (!ENVIRONMENT_IS_PTHREAD) removeRunDependency("wasm-instantiate");
 }
 if (!ENVIRONMENT_IS_PTHREAD) {
  addRunDependency("wasm-instantiate");
 }
 var trueModule = Module;
 function receiveInstantiatedSource(output) {
  assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
  trueModule = null;
  receiveInstance(output["instance"], output["module"]);
 }
 function instantiateArrayBuffer(receiver) {
  return getBinaryPromise().then((function(binary) {
   return WebAssembly.instantiate(binary, info);
  })).then(receiver, (function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  }));
 }
 function instantiateAsync() {
  if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
   fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then((function(response) {
    var result = WebAssembly.instantiateStreaming(response, info);
    return result.then(receiveInstantiatedSource, (function(reason) {
     err("wasm streaming compile failed: " + reason);
     err("falling back to ArrayBuffer instantiation");
     instantiateArrayBuffer(receiveInstantiatedSource);
    }));
   }));
  } else {
   return instantiateArrayBuffer(receiveInstantiatedSource);
  }
 }
 if (Module["instantiateWasm"]) {
  try {
   var exports = Module["instantiateWasm"](info, receiveInstance);
   return exports;
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync();
 return {};
}
var tempDouble;
var tempI64;
var ASM_CONSTS = [ (function() {
 postMessage({
  cmd: "processQueuedMainThreadWork"
 });
}), (function($0) {
 if (!ENVIRONMENT_IS_PTHREAD) {
  if (!PThread.pthreads[$0] || !PThread.pthreads[$0].worker) {
   return 0;
  }
  PThread.pthreads[$0].worker.postMessage({
   cmd: "processThreadQueue"
  });
 } else {
  postMessage({
   targetThread: $0,
   cmd: "processThreadQueue"
  });
 }
 return 1;
}), (function() {
 return !!Module["canvas"];
}), (function() {
 noExitRuntime = true;
}) ];
function readAsmConstArgs(sig_ptr, buf) {
 var args = [];
 var sig = AsciiToString(sig_ptr);
 function align_to(ptr, align) {
  return ptr + align - 1 & ~(align - 1);
 }
 for (var i = 0; i < sig.length; i++) {
  var c = sig[i];
  if (c == "d" || c == "f") {
   buf = align_to(buf, 8);
   args.push(GROWABLE_HEAP_LOAD_F64(buf | 0));
   buf += 8;
  } else if (c == "i") {
   buf = align_to(buf, 4);
   args.push(GROWABLE_HEAP_LOAD_I32(buf | 0));
   buf += 4;
  }
 }
 return args;
}
function _emscripten_asm_const_iii(code, sig_ptr, argbuf) {
 var args = readAsmConstArgs(sig_ptr, argbuf);
 return ASM_CONSTS[code].apply(null, args);
}
function initPthreadsJS() {
 PThread.initRuntime();
}
if (!ENVIRONMENT_IS_PTHREAD) __ATINIT__.push({
 func: (function() {
  ___wasm_call_ctors();
 })
});
function demangle(func) {
 warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
 return func;
}
function demangleAll(text) {
 var regex = /\b_Z[\w\d_]+/g;
 return text.replace(regex, (function(x) {
  var y = demangle(x);
  return x === y ? x : y + " [" + x + "]";
 }));
}
function jsStackTrace() {
 var err = new Error;
 if (!err.stack) {
  try {
   throw new Error(0);
  } catch (e) {
   err = e;
  }
  if (!err.stack) {
   return "(no stack trace available)";
  }
 }
 return err.stack.toString();
}
function stackTrace() {
 var js = jsStackTrace();
 if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
 return demangleAll(js);
}
function ___assert_fail(condition, filename, line, func) {
 abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
}
var PROCINFO = {
 ppid: 1,
 pid: 42,
 sid: 42,
 pgid: 42
};
var __pthread_ptr = 0;
var __pthread_is_main_runtime_thread = 0;
var __pthread_is_main_browser_thread = 0;
function __register_pthread_ptr(pthreadPtr, isMainBrowserThread, isMainRuntimeThread) {
 pthreadPtr = pthreadPtr | 0;
 isMainBrowserThread = isMainBrowserThread | 0;
 isMainRuntimeThread = isMainRuntimeThread | 0;
 __pthread_ptr = pthreadPtr;
 __pthread_is_main_browser_thread = isMainBrowserThread;
 __pthread_is_main_runtime_thread = isMainRuntimeThread;
}
Module["__register_pthread_ptr"] = __register_pthread_ptr;
var ERRNO_CODES = {
 EPERM: 63,
 ENOENT: 44,
 ESRCH: 71,
 EINTR: 27,
 EIO: 29,
 ENXIO: 60,
 E2BIG: 1,
 ENOEXEC: 45,
 EBADF: 8,
 ECHILD: 12,
 EAGAIN: 6,
 EWOULDBLOCK: 6,
 ENOMEM: 48,
 EACCES: 2,
 EFAULT: 21,
 ENOTBLK: 105,
 EBUSY: 10,
 EEXIST: 20,
 EXDEV: 75,
 ENODEV: 43,
 ENOTDIR: 54,
 EISDIR: 31,
 EINVAL: 28,
 ENFILE: 41,
 EMFILE: 33,
 ENOTTY: 59,
 ETXTBSY: 74,
 EFBIG: 22,
 ENOSPC: 51,
 ESPIPE: 70,
 EROFS: 69,
 EMLINK: 34,
 EPIPE: 64,
 EDOM: 18,
 ERANGE: 68,
 ENOMSG: 49,
 EIDRM: 24,
 ECHRNG: 106,
 EL2NSYNC: 156,
 EL3HLT: 107,
 EL3RST: 108,
 ELNRNG: 109,
 EUNATCH: 110,
 ENOCSI: 111,
 EL2HLT: 112,
 EDEADLK: 16,
 ENOLCK: 46,
 EBADE: 113,
 EBADR: 114,
 EXFULL: 115,
 ENOANO: 104,
 EBADRQC: 103,
 EBADSLT: 102,
 EDEADLOCK: 16,
 EBFONT: 101,
 ENOSTR: 100,
 ENODATA: 116,
 ETIME: 117,
 ENOSR: 118,
 ENONET: 119,
 ENOPKG: 120,
 EREMOTE: 121,
 ENOLINK: 47,
 EADV: 122,
 ESRMNT: 123,
 ECOMM: 124,
 EPROTO: 65,
 EMULTIHOP: 36,
 EDOTDOT: 125,
 EBADMSG: 9,
 ENOTUNIQ: 126,
 EBADFD: 127,
 EREMCHG: 128,
 ELIBACC: 129,
 ELIBBAD: 130,
 ELIBSCN: 131,
 ELIBMAX: 132,
 ELIBEXEC: 133,
 ENOSYS: 52,
 ENOTEMPTY: 55,
 ENAMETOOLONG: 37,
 ELOOP: 32,
 EOPNOTSUPP: 138,
 EPFNOSUPPORT: 139,
 ECONNRESET: 15,
 ENOBUFS: 42,
 EAFNOSUPPORT: 5,
 EPROTOTYPE: 67,
 ENOTSOCK: 57,
 ENOPROTOOPT: 50,
 ESHUTDOWN: 140,
 ECONNREFUSED: 14,
 EADDRINUSE: 3,
 ECONNABORTED: 13,
 ENETUNREACH: 40,
 ENETDOWN: 38,
 ETIMEDOUT: 73,
 EHOSTDOWN: 142,
 EHOSTUNREACH: 23,
 EINPROGRESS: 26,
 EALREADY: 7,
 EDESTADDRREQ: 17,
 EMSGSIZE: 35,
 EPROTONOSUPPORT: 66,
 ESOCKTNOSUPPORT: 137,
 EADDRNOTAVAIL: 4,
 ENETRESET: 39,
 EISCONN: 30,
 ENOTCONN: 53,
 ETOOMANYREFS: 141,
 EUSERS: 136,
 EDQUOT: 19,
 ESTALE: 72,
 ENOTSUP: 138,
 ENOMEDIUM: 148,
 EILSEQ: 25,
 EOVERFLOW: 61,
 ECANCELED: 11,
 ENOTRECOVERABLE: 56,
 EOWNERDEAD: 62,
 ESTRPIPE: 135
};
var __main_thread_futex_wait_address = 8192;
function _emscripten_futex_wake(addr, count) {
 if (addr <= 0 || addr > HEAP8.length || addr & 3 != 0 || count < 0) return -28;
 if (count == 0) return 0;
 if (count >= 2147483647) count = Infinity;
 var mainThreadWaitAddress = Atomics.load(HEAP32, __main_thread_futex_wait_address >> 2);
 var mainThreadWoken = 0;
 if (mainThreadWaitAddress == addr) {
  var loadedAddr = Atomics.compareExchange(HEAP32, __main_thread_futex_wait_address >> 2, mainThreadWaitAddress, 0);
  if (loadedAddr == mainThreadWaitAddress) {
   --count;
   mainThreadWoken = 1;
   if (count <= 0) return 1;
  }
 }
 var ret = Atomics.notify(HEAP32, addr >> 2, count);
 if (ret >= 0) return ret + mainThreadWoken;
 throw "Atomics.notify returned an unexpected value " + ret;
}
Module["_emscripten_futex_wake"] = _emscripten_futex_wake;
function __kill_thread(pthread_ptr) {
 if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _kill_thread() can only ever be called from main application thread!";
 if (!pthread_ptr) throw "Internal Error! Null pthread_ptr in _kill_thread!";
 GROWABLE_HEAP_STORE_I32(pthread_ptr + 24 | 0, 0);
 var pthread = PThread.pthreads[pthread_ptr];
 pthread.worker.terminate();
 PThread.freeThreadData(pthread);
 PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(pthread.worker), 1);
 pthread.worker.pthread = undefined;
}
function __cancel_thread(pthread_ptr) {
 if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _cancel_thread() can only ever be called from main application thread!";
 if (!pthread_ptr) throw "Internal Error! Null pthread_ptr in _cancel_thread!";
 var pthread = PThread.pthreads[pthread_ptr];
 pthread.worker.postMessage({
  "cmd": "cancel"
 });
}
function __cleanup_thread(pthread_ptr) {
 if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _cleanup_thread() can only ever be called from main application thread!";
 if (!pthread_ptr) throw "Internal Error! Null pthread_ptr in _cleanup_thread!";
 GROWABLE_HEAP_STORE_I32(pthread_ptr + 24 | 0, 0);
 var pthread = PThread.pthreads[pthread_ptr];
 if (pthread) {
  var worker = pthread.worker;
  PThread.returnWorkerToPool(worker);
 }
}
var PThread = {
 MAIN_THREAD_ID: 1,
 mainThreadInfo: {
  schedPolicy: 0,
  schedPrio: 0
 },
 preallocatedWorkers: [],
 unusedWorkers: [],
 runningWorkers: [],
 initRuntime: (function() {
  __register_pthread_ptr(PThread.mainThreadBlock, !ENVIRONMENT_IS_WORKER, 1);
  _emscripten_register_main_browser_thread_id(PThread.mainThreadBlock);
 }),
 initMainThreadBlock: (function() {
  if (ENVIRONMENT_IS_PTHREAD) return undefined;
  var requestedPoolSize = 8;
  PThread.preallocatedWorkers = PThread.createNewWorkers(requestedPoolSize);
  PThread.mainThreadBlock = 7408;
  for (var i = 0; i < 244 / 4; ++i) GROWABLE_HEAP_STORE_I32((PThread.mainThreadBlock / 4 + i) * 4 | 0, 0);
  GROWABLE_HEAP_STORE_I32(PThread.mainThreadBlock + 24 | 0, PThread.mainThreadBlock);
  var headPtr = PThread.mainThreadBlock + 168;
  GROWABLE_HEAP_STORE_I32(headPtr | 0, headPtr);
  var tlsMemory = 7664;
  for (var i = 0; i < 128; ++i) GROWABLE_HEAP_STORE_I32((tlsMemory / 4 + i) * 4 | 0, 0);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 116 >> 2, tlsMemory);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 52 >> 2, PThread.mainThreadBlock);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 56 >> 2, PROCINFO.pid);
 }),
 initWorker: (function() {}),
 pthreads: {},
 exitHandlers: null,
 setThreadStatus: (function() {}),
 runExitHandlers: (function() {
  if (PThread.exitHandlers !== null) {
   while (PThread.exitHandlers.length > 0) {
    PThread.exitHandlers.pop()();
   }
   PThread.exitHandlers = null;
  }
  if (ENVIRONMENT_IS_PTHREAD && threadInfoStruct) ___pthread_tsd_run_dtors();
 }),
 threadExit: (function(exitCode) {
  var tb = _pthread_self();
  if (tb) {
   Atomics.store(HEAPU32, tb + 4 >> 2, exitCode);
   Atomics.store(HEAPU32, tb + 0 >> 2, 1);
   Atomics.store(HEAPU32, tb + 72 >> 2, 1);
   Atomics.store(HEAPU32, tb + 76 >> 2, 0);
   PThread.runExitHandlers();
   _emscripten_futex_wake(tb + 0, 2147483647);
   __register_pthread_ptr(0, 0, 0);
   threadInfoStruct = 0;
   if (ENVIRONMENT_IS_PTHREAD) {
    postMessage({
     "cmd": "exit"
    });
   }
  }
 }),
 threadCancel: (function() {
  PThread.runExitHandlers();
  Atomics.store(HEAPU32, threadInfoStruct + 4 >> 2, -1);
  Atomics.store(HEAPU32, threadInfoStruct + 0 >> 2, 1);
  _emscripten_futex_wake(threadInfoStruct + 0, 2147483647);
  threadInfoStruct = selfThreadId = 0;
  __register_pthread_ptr(0, 0, 0);
  postMessage({
   "cmd": "cancelDone"
  });
 }),
 terminateAllThreads: (function() {
  for (var t in PThread.pthreads) {
   var pthread = PThread.pthreads[t];
   if (pthread && pthread.worker) {
    PThread.returnWorkerToPool(pthread.worker);
   }
  }
  PThread.pthreads = {};
  for (var i = 0; i < PThread.preallocatedWorkers.length; ++i) {
   var worker = PThread.preallocatedWorkers[i];
   assert(!worker.pthread);
   worker.terminate();
  }
  PThread.preallocatedWorkers = [];
  for (var i = 0; i < PThread.unusedWorkers.length; ++i) {
   var worker = PThread.unusedWorkers[i];
   assert(!worker.pthread);
   worker.terminate();
  }
  PThread.unusedWorkers = [];
  for (var i = 0; i < PThread.runningWorkers.length; ++i) {
   var worker = PThread.runningWorkers[i];
   var pthread = worker.pthread;
   assert(pthread, "This Worker should have a pthread it is executing");
   PThread.freeThreadData(pthread);
   worker.terminate();
  }
  PThread.runningWorkers = [];
 }),
 freeThreadData: (function(pthread) {
  if (!pthread) return;
  if (pthread.threadInfoStruct) {
   var tlsMemory = GROWABLE_HEAP_LOAD_I32(pthread.threadInfoStruct + 116 | 0);
   GROWABLE_HEAP_STORE_I32(pthread.threadInfoStruct + 116 | 0, 0);
   _free(tlsMemory);
   _free(pthread.threadInfoStruct);
  }
  pthread.threadInfoStruct = 0;
  if (pthread.allocatedOwnStack && pthread.stackBase) _free(pthread.stackBase);
  pthread.stackBase = 0;
  if (pthread.worker) pthread.worker.pthread = null;
 }),
 returnWorkerToPool: (function(worker) {
  delete PThread.pthreads[worker.pthread.thread];
  PThread.unusedWorkers.push(worker);
  PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
  PThread.freeThreadData(worker.pthread);
  worker.pthread = undefined;
 }),
 receiveObjectTransfer: (function(data) {}),
 allocateUnusedWorkers: (function(numWorkers, onFinishedLoading) {
  if (typeof SharedArrayBuffer === "undefined") return;
  var workers = [];
  var numWorkersToCreate = numWorkers;
  if (PThread.preallocatedWorkers.length > 0) {
   var workersUsed = Math.min(PThread.preallocatedWorkers.length, numWorkers);
   workers = workers.concat(PThread.preallocatedWorkers.splice(0, workersUsed));
   numWorkersToCreate -= workersUsed;
  }
  if (numWorkersToCreate > 0) {
   workers = workers.concat(PThread.createNewWorkers(numWorkersToCreate));
  }
  PThread.attachListenerToWorkers(workers, onFinishedLoading);
  for (var i = 0; i < numWorkers; ++i) {
   var worker = workers[i];
   worker.postMessage({
    "cmd": "load",
    "urlOrBlob": Module["mainScriptUrlOrBlob"] || _scriptDir,
    "wasmMemory": wasmMemory,
    "wasmModule": wasmModule,
    "DYNAMIC_BASE": DYNAMIC_BASE,
    "DYNAMICTOP_PTR": DYNAMICTOP_PTR
   });
   PThread.unusedWorkers.push(worker);
  }
 }),
 attachListenerToWorkers: (function(workers, onFinishedLoading) {
  var numWorkersLoaded = 0;
  var numWorkers = workers.length;
  for (var i = 0; i < numWorkers; ++i) {
   var worker = workers[i];
   ((function(worker) {
    worker.onmessage = (function(e) {
     var d = e["data"];
     var cmd = d["cmd"];
     if (worker.pthread) PThread.currentProxiedOperationCallerThread = worker.pthread.threadInfoStruct;
     if (d["targetThread"] && d["targetThread"] != _pthread_self()) {
      var thread = PThread.pthreads[d.targetThread];
      if (thread) {
       thread.worker.postMessage(e.data, d["transferList"]);
      } else {
       console.error('Internal error! Worker sent a message "' + cmd + '" to target pthread ' + d["targetThread"] + ", but that thread no longer exists!");
      }
      PThread.currentProxiedOperationCallerThread = undefined;
      return;
     }
     if (cmd === "processQueuedMainThreadWork") {
      _emscripten_main_thread_process_queued_calls();
     } else if (cmd === "spawnThread") {
      __spawn_thread(e.data);
     } else if (cmd === "cleanupThread") {
      __cleanup_thread(d["thread"]);
     } else if (cmd === "killThread") {
      __kill_thread(d["thread"]);
     } else if (cmd === "cancelThread") {
      __cancel_thread(d["thread"]);
     } else if (cmd === "loaded") {
      worker.loaded = true;
      if (worker.runPthread) {
       worker.runPthread();
       delete worker.runPthread;
      }
      ++numWorkersLoaded;
      if (numWorkersLoaded === numWorkers && onFinishedLoading) {
       onFinishedLoading();
      }
     } else if (cmd === "print") {
      out("Thread " + d["threadId"] + ": " + d["text"]);
     } else if (cmd === "printErr") {
      err("Thread " + d["threadId"] + ": " + d["text"]);
     } else if (cmd === "alert") {
      alert("Thread " + d["threadId"] + ": " + d["text"]);
     } else if (cmd === "exit") {
      var detached = worker.pthread && Atomics.load(HEAPU32, worker.pthread.thread + 80 >> 2);
      if (detached) {
       PThread.returnWorkerToPool(worker);
      }
     } else if (cmd === "exitProcess") {
      noExitRuntime = false;
      try {
       exit(d["returnCode"]);
      } catch (e) {
       if (e instanceof ExitStatus) return;
       throw e;
      }
     } else if (cmd === "cancelDone") {
      PThread.returnWorkerToPool(worker);
     } else if (cmd === "objectTransfer") {
      PThread.receiveObjectTransfer(e.data);
     } else if (e.data.target === "setimmediate") {
      worker.postMessage(e.data);
     } else {
      err("worker sent an unknown command " + cmd);
     }
     PThread.currentProxiedOperationCallerThread = undefined;
    });
    worker.onerror = (function(e) {
     err("pthread sent an error! " + e.filename + ":" + e.lineno + ": " + e.message);
    });
   }))(worker);
  }
 }),
 createNewWorkers: (function(numWorkers) {
  if (typeof SharedArrayBuffer === "undefined") return [];
  var pthreadMainJs = "sequences.worker.js";
  pthreadMainJs = locateFile(pthreadMainJs);
  var newWorkers = [];
  for (var i = 0; i < numWorkers; ++i) {
   newWorkers.push(new Worker(pthreadMainJs));
  }
  return newWorkers;
 }),
 getNewWorker: (function() {
  if (PThread.unusedWorkers.length == 0) PThread.allocateUnusedWorkers(1);
  if (PThread.unusedWorkers.length > 0) return PThread.unusedWorkers.pop(); else return null;
 }),
 busySpinWait: (function(msecs) {
  var t = performance.now() + msecs;
  while (performance.now() < t) {
  }
 })
};
function ___call_main(argc, argv) {
 var returnCode = _main(argc, argv);
 if (!noExitRuntime) postMessage({
  "cmd": "exitProcess",
  "returnCode": returnCode
 });
 return returnCode;
}
function _emscripten_get_now() {
 abort();
}
function _emscripten_get_now_is_monotonic() {
 return 0 || ENVIRONMENT_IS_NODE || typeof dateNow !== "undefined" || typeof performance === "object" && performance && typeof performance["now"] === "function";
}
function ___setErrNo(value) {
 if (Module["___errno_location"]) GROWABLE_HEAP_STORE_I32(Module["___errno_location"]() | 0, value); else err("failed to set errno from JS");
 return value;
}
function _clock_gettime(clk_id, tp) {
 var now;
 if (clk_id === 0) {
  now = Date.now();
 } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
  now = _emscripten_get_now();
 } else {
  ___setErrNo(28);
  return -1;
 }
 GROWABLE_HEAP_STORE_I32(tp | 0, now / 1e3 | 0);
 GROWABLE_HEAP_STORE_I32(tp + 4 | 0, now % 1e3 * 1e3 * 1e3 | 0);
 return 0;
}
function ___clock_gettime(a0, a1) {
 return _clock_gettime(a0, a1);
}
function ___lock() {}
function ___unlock() {}
function _clock() {
 if (_clock.start === undefined) _clock.start = Date.now();
 return (Date.now() - _clock.start) * (1e6 / 1e3) | 0;
}
function _emscripten_conditional_set_current_thread_status_js(expectedStatus, newStatus) {}
function _emscripten_conditional_set_current_thread_status(expectedStatus, newStatus) {
 expectedStatus = expectedStatus | 0;
 newStatus = newStatus | 0;
}
function _emscripten_futex_wait(addr, val, timeout) {
 if (addr <= 0 || addr > HEAP8.length || addr & 3 != 0) return -28;
 if (ENVIRONMENT_IS_WORKER) {
  var ret = Atomics.wait(HEAP32, addr >> 2, val, timeout);
  if (ret === "timed-out") return -73;
  if (ret === "not-equal") return -6;
  if (ret === "ok") return 0;
  throw "Atomics.wait returned an unexpected value " + ret;
 } else {
  var loadedVal = Atomics.load(HEAP32, addr >> 2);
  if (val != loadedVal) return -6;
  var tNow = performance.now();
  var tEnd = tNow + timeout;
  Atomics.store(HEAP32, __main_thread_futex_wait_address >> 2, addr);
  var ourWaitAddress = addr;
  while (addr == ourWaitAddress) {
   tNow = performance.now();
   if (tNow > tEnd) {
    return -73;
   }
   _emscripten_main_thread_process_queued_calls();
   addr = Atomics.load(HEAP32, __main_thread_futex_wait_address >> 2);
  }
  return 0;
 }
}
function _emscripten_get_heap_size() {
 return HEAP8.length;
}
function _emscripten_get_sbrk_ptr() {
 return 7248;
}
function _emscripten_has_threading_support() {
 return typeof SharedArrayBuffer !== "undefined";
}
function _emscripten_is_main_browser_thread() {
 return __pthread_is_main_browser_thread | 0;
}
function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
}
function _emscripten_proxy_to_main_thread_js(index, sync) {
 var numCallArgs = arguments.length - 2;
 if (numCallArgs > 20 - 1) throw "emscripten_proxy_to_main_thread_js: Too many arguments " + numCallArgs + " to proxied function idx=" + index + ", maximum supported is " + (20 - 1) + "!";
 var stack = stackSave();
 var args = stackAlloc(numCallArgs * 8);
 var b = args >> 3;
 for (var i = 0; i < numCallArgs; i++) {
  GROWABLE_HEAP_STORE_F64((b + i) * 8 | 0, arguments[2 + i]);
 }
 var ret = _emscripten_run_in_main_runtime_thread_js(index, numCallArgs, args, sync);
 stackRestore(stack);
 return ret;
}
var _emscripten_receive_on_main_thread_js_callArgs = [];
function _emscripten_receive_on_main_thread_js(index, numCallArgs, args) {
 _emscripten_receive_on_main_thread_js_callArgs.length = numCallArgs;
 var b = args >> 3;
 for (var i = 0; i < numCallArgs; i++) {
  _emscripten_receive_on_main_thread_js_callArgs[i] = GROWABLE_HEAP_LOAD_F64((b + i) * 8 | 0);
 }
 var isEmAsmConst = index < 0;
 var func = !isEmAsmConst ? proxiedFunctionTable[index] : ASM_CONSTS[-index - 1];
 if (isEmAsmConst) {
  var sigPtr = _emscripten_receive_on_main_thread_js_callArgs[1];
  var varargPtr = _emscripten_receive_on_main_thread_js_callArgs[2];
  var constArgs = readAsmConstArgs(sigPtr, varargPtr);
  return func.apply(null, constArgs);
 }
 assert(func.length == numCallArgs, "Call args mismatch in emscripten_receive_on_main_thread_js");
 return func.apply(null, _emscripten_receive_on_main_thread_js_callArgs);
}
function abortOnCannotGrowMemory(requestedSize) {
 abort("Cannot enlarge memory arrays to size " + requestedSize + " bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + HEAP8.length + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
}
function emscripten_realloc_buffer(size) {
 try {
  wasmMemory.grow(size - buffer.byteLength + 65535 >> 16);
  updateGlobalBufferAndViews(wasmMemory.buffer);
  return 1;
 } catch (e) {
  console.error("emscripten_realloc_buffer: Attempted to grow heap from " + buffer.byteLength + " bytes to " + size + " bytes, but got error: " + e);
 }
}
function _emscripten_resize_heap(requestedSize) {
 var oldSize = _emscripten_get_heap_size();
 if (requestedSize <= oldSize) {
  return false;
 }
 var PAGE_MULTIPLE = 65536;
 var LIMIT = 2147483648 - PAGE_MULTIPLE;
 if (requestedSize > LIMIT) {
  err("Cannot enlarge memory, asked to go up to " + requestedSize + " bytes, but the limit is " + LIMIT + " bytes!");
  return false;
 }
 var MIN_TOTAL_MEMORY = 16777216;
 var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
 while (newSize < requestedSize) {
  if (newSize <= 536870912) {
   newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
  } else {
   newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
  }
  if (newSize === oldSize) {
   warnOnce("Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only " + HEAP8.length);
  }
 }
 newSize = Math.min(newSize, 2198863872);
 if (newSize == oldSize) {
  err("Failed to grow the heap from " + oldSize + ", as we reached the WASM_MEM_MAX limit (" + 2198863872 + ") set during compilation");
  return false;
 }
 var replacement = emscripten_realloc_buffer(newSize);
 if (!replacement) {
  err("Failed to grow the heap from " + oldSize + " bytes to " + newSize + " bytes, not enough memory!");
  return false;
 }
 return true;
}
var JSEvents = {
 keyEvent: 0,
 mouseEvent: 0,
 wheelEvent: 0,
 uiEvent: 0,
 focusEvent: 0,
 deviceOrientationEvent: 0,
 deviceMotionEvent: 0,
 fullscreenChangeEvent: 0,
 pointerlockChangeEvent: 0,
 visibilityChangeEvent: 0,
 touchEvent: 0,
 previousFullscreenElement: null,
 previousScreenX: null,
 previousScreenY: null,
 removeEventListenersRegistered: false,
 removeAllEventListeners: (function() {
  for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
   JSEvents._removeHandler(i);
  }
  JSEvents.eventHandlers = [];
  JSEvents.deferredCalls = [];
 }),
 registerRemoveEventListeners: (function() {
  if (!JSEvents.removeEventListenersRegistered) {
   __ATEXIT__.push(JSEvents.removeAllEventListeners);
   JSEvents.removeEventListenersRegistered = true;
  }
 }),
 deferredCalls: [],
 deferCall: (function(targetFunction, precedence, argsList) {
  function arraysHaveEqualContent(arrA, arrB) {
   if (arrA.length != arrB.length) return false;
   for (var i in arrA) {
    if (arrA[i] != arrB[i]) return false;
   }
   return true;
  }
  for (var i in JSEvents.deferredCalls) {
   var call = JSEvents.deferredCalls[i];
   if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
    return;
   }
  }
  JSEvents.deferredCalls.push({
   targetFunction: targetFunction,
   precedence: precedence,
   argsList: argsList
  });
  JSEvents.deferredCalls.sort((function(x, y) {
   return x.precedence < y.precedence;
  }));
 }),
 removeDeferredCalls: (function(targetFunction) {
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
    JSEvents.deferredCalls.splice(i, 1);
    --i;
   }
  }
 }),
 canPerformEventHandlerRequests: (function() {
  return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
 }),
 runDeferredCalls: (function() {
  if (!JSEvents.canPerformEventHandlerRequests()) {
   return;
  }
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   var call = JSEvents.deferredCalls[i];
   JSEvents.deferredCalls.splice(i, 1);
   --i;
   call.targetFunction.apply(this, call.argsList);
  }
 }),
 inEventHandler: 0,
 currentEventHandler: null,
 eventHandlers: [],
 isInternetExplorer: (function() {
  return navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0;
 }),
 removeAllHandlersOnTarget: (function(target, eventTypeString) {
  for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
   if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
    JSEvents._removeHandler(i--);
   }
  }
 }),
 _removeHandler: (function(i) {
  var h = JSEvents.eventHandlers[i];
  h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
  JSEvents.eventHandlers.splice(i, 1);
 }),
 registerOrRemoveHandler: (function(eventHandler) {
  var jsEventHandler = function jsEventHandler(event) {
   ++JSEvents.inEventHandler;
   JSEvents.currentEventHandler = eventHandler;
   JSEvents.runDeferredCalls();
   eventHandler.handlerFunc(event);
   JSEvents.runDeferredCalls();
   --JSEvents.inEventHandler;
  };
  if (eventHandler.callbackfunc) {
   eventHandler.eventListenerFunc = jsEventHandler;
   eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
   JSEvents.eventHandlers.push(eventHandler);
   JSEvents.registerRemoveEventListeners();
  } else {
   for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
     JSEvents._removeHandler(i--);
    }
   }
  }
 }),
 queueEventHandlerOnThread_iiii: (function(targetThread, eventHandlerFunc, eventTypeId, eventData, userData) {
  var stackTop = stackSave();
  var varargs = stackAlloc(12);
  GROWABLE_HEAP_STORE_I32(varargs | 0, eventTypeId);
  GROWABLE_HEAP_STORE_I32(varargs + 4 | 0, eventData);
  GROWABLE_HEAP_STORE_I32(varargs + 8 | 0, userData);
  _emscripten_async_queue_on_thread_(targetThread, 637534208, eventHandlerFunc, eventData, varargs);
  stackRestore(stackTop);
 }),
 getTargetThreadForEventCallback: (function(targetThread) {
  switch (targetThread) {
  case 1:
   return 0;
  case 2:
   return PThread.currentProxiedOperationCallerThread;
  default:
   return targetThread;
  }
 }),
 getBoundingClientRectOrZeros: (function(target) {
  return target.getBoundingClientRect ? target.getBoundingClientRect() : {
   left: 0,
   top: 0
  };
 }),
 pageScrollPos: (function() {
  if (pageXOffset > 0 || pageYOffset > 0) {
   return [ pageXOffset, pageYOffset ];
  }
  if (typeof document.documentElement.scrollLeft !== "undefined" || typeof document.documentElement.scrollTop !== "undefined") {
   return [ document.documentElement.scrollLeft, document.documentElement.scrollTop ];
  }
  return [ document.body.scrollLeft | 0, document.body.scrollTop | 0 ];
 }),
 getNodeNameForTarget: (function(target) {
  if (!target) return "";
  if (target == window) return "#window";
  if (target == screen) return "#screen";
  return target && target.nodeName ? target.nodeName : "";
 }),
 tick: (function() {
  if (window["performance"] && window["performance"]["now"]) return window["performance"]["now"](); else return Date.now();
 }),
 fullscreenEnabled: (function() {
  return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
 })
};
function stringToNewUTF8(jsString) {
 var length = lengthBytesUTF8(jsString) + 1;
 var cString = _malloc(length);
 stringToUTF8(jsString, cString, length);
 return cString;
}
function _emscripten_set_offscreencanvas_size_on_target_thread_js(targetThread, targetCanvas, width, height) {
 var stackTop = stackSave();
 var varargs = stackAlloc(12);
 var targetCanvasPtr = 0;
 if (targetCanvas) {
  targetCanvasPtr = stringToNewUTF8(targetCanvas);
 }
 GROWABLE_HEAP_STORE_I32(varargs | 0, targetCanvasPtr);
 GROWABLE_HEAP_STORE_I32(varargs + 4 | 0, width);
 GROWABLE_HEAP_STORE_I32(varargs + 8 | 0, height);
 _emscripten_async_queue_on_thread_(targetThread, 657457152, 0, targetCanvasPtr, varargs);
 stackRestore(stackTop);
}
function _emscripten_set_offscreencanvas_size_on_target_thread(targetThread, targetCanvas, width, height) {
 targetCanvas = targetCanvas ? UTF8ToString(targetCanvas) : "";
 _emscripten_set_offscreencanvas_size_on_target_thread_js(targetThread, targetCanvas, width, height);
}
var __specialEventTargets = [ 0, typeof document !== "undefined" ? document : 0, typeof window !== "undefined" ? window : 0 ];
function __findEventTarget(target) {
 warnOnce("Rules for selecting event targets in HTML5 API are changing: instead of using document.getElementById() that only can refer to elements by their DOM ID, new event target selection mechanism uses the more flexible function document.querySelector() that can look up element names, classes, and complex CSS selectors. Build with -s DISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1 to change to the new lookup rules. See https://github.com/emscripten-core/emscripten/pull/7977 for more details.");
 try {
  if (!target) return window;
  if (typeof target === "number") target = __specialEventTargets[target] || UTF8ToString(target);
  if (target === "#window") return window; else if (target === "#document") return document; else if (target === "#screen") return screen; else if (target === "#canvas") return Module["canvas"];
  return typeof target === "string" ? document.getElementById(target) : target;
 } catch (e) {
  return null;
 }
}
function __findCanvasEventTarget(target) {
 if (typeof target === "number") target = UTF8ToString(target);
 if (!target || target === "#canvas") {
  if (typeof GL !== "undefined" && GL.offscreenCanvases["canvas"]) return GL.offscreenCanvases["canvas"];
  return Module["canvas"];
 }
 if (typeof GL !== "undefined" && GL.offscreenCanvases[target]) return GL.offscreenCanvases[target];
 return __findEventTarget(target);
}
function _emscripten_set_canvas_element_size_calling_thread(target, width, height) {
 var canvas = __findCanvasEventTarget(target);
 if (!canvas) return -4;
 if (canvas.canvasSharedPtr) {
  GROWABLE_HEAP_STORE_I32(canvas.canvasSharedPtr | 0, width);
  GROWABLE_HEAP_STORE_I32(canvas.canvasSharedPtr + 4 | 0, height);
 }
 if (canvas.offscreenCanvas || !canvas.controlTransferredOffscreen) {
  if (canvas.offscreenCanvas) canvas = canvas.offscreenCanvas;
  var autoResizeViewport = false;
  if (canvas.GLctxObject && canvas.GLctxObject.GLctx) {
   var prevViewport = canvas.GLctxObject.GLctx.getParameter(canvas.GLctxObject.GLctx.VIEWPORT);
   autoResizeViewport = prevViewport[0] === 0 && prevViewport[1] === 0 && prevViewport[2] === canvas.width && prevViewport[3] === canvas.height;
  }
  canvas.width = width;
  canvas.height = height;
  if (autoResizeViewport) {
   canvas.GLctxObject.GLctx.viewport(0, 0, width, height);
  }
 } else if (canvas.canvasSharedPtr) {
  var targetThread = GROWABLE_HEAP_LOAD_I32(canvas.canvasSharedPtr + 8 | 0);
  _emscripten_set_offscreencanvas_size_on_target_thread(targetThread, target, width, height);
  return 1;
 } else {
  return -4;
 }
 return 0;
}
function _emscripten_set_canvas_element_size_main_thread(target, width, height) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(1, 1, target, width, height);
 return _emscripten_set_canvas_element_size_calling_thread(target, width, height);
}
function _emscripten_set_canvas_element_size(target, width, height) {
 var canvas = __findCanvasEventTarget(target);
 if (canvas) {
  return _emscripten_set_canvas_element_size_calling_thread(target, width, height);
 } else {
  return _emscripten_set_canvas_element_size_main_thread(target, width, height);
 }
}
function _emscripten_set_current_thread_status_js(newStatus) {}
function _emscripten_set_current_thread_status(newStatus) {
 newStatus = newStatus | 0;
}
function _emscripten_set_thread_name_js(threadId, name) {}
function _emscripten_set_thread_name(threadId, name) {
 threadId = threadId | 0;
 name = name | 0;
}
function _emscripten_syscall(which, varargs) {
 switch (which) {
 default:
  throw "surprising proxied syscall: " + which;
 }
}
var GL = {
 counter: 1,
 lastError: 0,
 buffers: [],
 mappedBuffers: {},
 programs: [],
 framebuffers: [],
 renderbuffers: [],
 textures: [],
 uniforms: [],
 shaders: [],
 vaos: [],
 contexts: {},
 currentContext: null,
 offscreenCanvases: {},
 timerQueriesEXT: [],
 programInfos: {},
 stringCache: {},
 unpackAlignment: 4,
 init: (function() {
  GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
  for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
   GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i + 1);
  }
 }),
 recordError: function recordError(errorCode) {
  if (!GL.lastError) {
   GL.lastError = errorCode;
  }
 },
 getNewId: (function(table) {
  var ret = GL.counter++;
  for (var i = table.length; i < ret; i++) {
   table[i] = null;
  }
  return ret;
 }),
 MINI_TEMP_BUFFER_SIZE: 256,
 miniTempBuffer: null,
 miniTempBufferViews: [ 0 ],
 getSource: (function(shader, count, string, length) {
  var source = "";
  for (var i = 0; i < count; ++i) {
   var len = length ? GROWABLE_HEAP_LOAD_I32(length + i * 4 | 0) : -1;
   source += UTF8ToString(GROWABLE_HEAP_LOAD_I32(string + i * 4 | 0), len < 0 ? undefined : len);
  }
  return source;
 }),
 createContext: (function(canvas, webGLContextAttributes) {
  var ctx = canvas.getContext("webgl", webGLContextAttributes) || canvas.getContext("experimental-webgl", webGLContextAttributes);
  if (!ctx) return 0;
  var handle = GL.registerContext(ctx, webGLContextAttributes);
  return handle;
 }),
 registerContext: (function(ctx, webGLContextAttributes) {
  var handle = _malloc(8);
  GROWABLE_HEAP_STORE_I32(handle + 4 | 0, _pthread_self());
  var context = {
   handle: handle,
   attributes: webGLContextAttributes,
   version: webGLContextAttributes.majorVersion,
   GLctx: ctx
  };
  if (ctx.canvas) ctx.canvas.GLctxObject = context;
  GL.contexts[handle] = context;
  if (typeof webGLContextAttributes.enableExtensionsByDefault === "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
   GL.initExtensions(context);
  }
  return handle;
 }),
 makeContextCurrent: (function(contextHandle) {
  GL.currentContext = GL.contexts[contextHandle];
  Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx;
  return !(contextHandle && !GLctx);
 }),
 getContext: (function(contextHandle) {
  return GL.contexts[contextHandle];
 }),
 deleteContext: (function(contextHandle) {
  if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
  if (typeof JSEvents === "object") JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
  if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
  _free(GL.contexts[contextHandle]);
  GL.contexts[contextHandle] = null;
 }),
 acquireInstancedArraysExtension: (function(ctx) {
  var ext = ctx.getExtension("ANGLE_instanced_arrays");
  if (ext) {
   ctx["vertexAttribDivisor"] = (function(index, divisor) {
    ext["vertexAttribDivisorANGLE"](index, divisor);
   });
   ctx["drawArraysInstanced"] = (function(mode, first, count, primcount) {
    ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
   });
   ctx["drawElementsInstanced"] = (function(mode, count, type, indices, primcount) {
    ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
   });
  }
 }),
 acquireVertexArrayObjectExtension: (function(ctx) {
  var ext = ctx.getExtension("OES_vertex_array_object");
  if (ext) {
   ctx["createVertexArray"] = (function() {
    return ext["createVertexArrayOES"]();
   });
   ctx["deleteVertexArray"] = (function(vao) {
    ext["deleteVertexArrayOES"](vao);
   });
   ctx["bindVertexArray"] = (function(vao) {
    ext["bindVertexArrayOES"](vao);
   });
   ctx["isVertexArray"] = (function(vao) {
    return ext["isVertexArrayOES"](vao);
   });
  }
 }),
 acquireDrawBuffersExtension: (function(ctx) {
  var ext = ctx.getExtension("WEBGL_draw_buffers");
  if (ext) {
   ctx["drawBuffers"] = (function(n, bufs) {
    ext["drawBuffersWEBGL"](n, bufs);
   });
  }
 }),
 initExtensions: (function(context) {
  if (!context) context = GL.currentContext;
  if (context.initExtensionsDone) return;
  context.initExtensionsDone = true;
  var GLctx = context.GLctx;
  if (context.version < 2) {
   GL.acquireInstancedArraysExtension(GLctx);
   GL.acquireVertexArrayObjectExtension(GLctx);
   GL.acquireDrawBuffersExtension(GLctx);
  }
  GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  var automaticallyEnabledExtensions = [ "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture", "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth", "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear", "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod", "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float", "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float", "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2" ];
  function shouldEnableAutomatically(extension) {
   var ret = false;
   automaticallyEnabledExtensions.forEach((function(include) {
    if (extension.indexOf(include) != -1) {
     ret = true;
    }
   }));
   return ret;
  }
  var exts = GLctx.getSupportedExtensions() || [];
  exts.forEach((function(ext) {
   if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
    GLctx.getExtension(ext);
   }
  }));
 }),
 populateUniformTable: (function(program) {
  var p = GL.programs[program];
  var ptable = GL.programInfos[program] = {
   uniforms: {},
   maxUniformLength: 0,
   maxAttributeLength: -1,
   maxUniformBlockNameLength: -1
  };
  var utable = ptable.uniforms;
  var numUniforms = GLctx.getProgramParameter(p, 35718);
  for (var i = 0; i < numUniforms; ++i) {
   var u = GLctx.getActiveUniform(p, i);
   var name = u.name;
   ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length + 1);
   if (name.slice(-1) == "]") {
    name = name.slice(0, name.lastIndexOf("["));
   }
   var loc = GLctx.getUniformLocation(p, name);
   if (loc) {
    var id = GL.getNewId(GL.uniforms);
    utable[name] = [ u.size, id ];
    GL.uniforms[id] = loc;
    for (var j = 1; j < u.size; ++j) {
     var n = name + "[" + j + "]";
     loc = GLctx.getUniformLocation(p, n);
     id = GL.getNewId(GL.uniforms);
     GL.uniforms[id] = loc;
    }
   }
  }
 })
};
var __emscripten_webgl_power_preferences = [ "default", "low-power", "high-performance" ];
function _emscripten_webgl_do_create_context(target, attributes) {
 assert(attributes);
 var contextAttributes = {};
 var a = attributes >> 2;
 contextAttributes["alpha"] = !!GROWABLE_HEAP_LOAD_I32((a + (0 >> 2)) * 4 | 0);
 contextAttributes["depth"] = !!GROWABLE_HEAP_LOAD_I32((a + (4 >> 2)) * 4 | 0);
 contextAttributes["stencil"] = !!GROWABLE_HEAP_LOAD_I32((a + (8 >> 2)) * 4 | 0);
 contextAttributes["antialias"] = !!GROWABLE_HEAP_LOAD_I32((a + (12 >> 2)) * 4 | 0);
 contextAttributes["premultipliedAlpha"] = !!GROWABLE_HEAP_LOAD_I32((a + (16 >> 2)) * 4 | 0);
 contextAttributes["preserveDrawingBuffer"] = !!GROWABLE_HEAP_LOAD_I32((a + (20 >> 2)) * 4 | 0);
 var powerPreference = GROWABLE_HEAP_LOAD_I32((a + (24 >> 2)) * 4 | 0);
 contextAttributes["powerPreference"] = __emscripten_webgl_power_preferences[powerPreference];
 contextAttributes["failIfMajorPerformanceCaveat"] = !!GROWABLE_HEAP_LOAD_I32((a + (28 >> 2)) * 4 | 0);
 contextAttributes.majorVersion = GROWABLE_HEAP_LOAD_I32((a + (32 >> 2)) * 4 | 0);
 contextAttributes.minorVersion = GROWABLE_HEAP_LOAD_I32((a + (36 >> 2)) * 4 | 0);
 contextAttributes.enableExtensionsByDefault = GROWABLE_HEAP_LOAD_I32((a + (40 >> 2)) * 4 | 0);
 contextAttributes.explicitSwapControl = GROWABLE_HEAP_LOAD_I32((a + (44 >> 2)) * 4 | 0);
 contextAttributes.proxyContextToMainThread = GROWABLE_HEAP_LOAD_I32((a + (48 >> 2)) * 4 | 0);
 contextAttributes.renderViaOffscreenBackBuffer = GROWABLE_HEAP_LOAD_I32((a + (52 >> 2)) * 4 | 0);
 var canvas = __findCanvasEventTarget(target);
 if (!canvas) {
  return 0;
 }
 if (contextAttributes.explicitSwapControl) {
  return 0;
 }
 var contextHandle = GL.createContext(canvas, contextAttributes);
 return contextHandle;
}
function _emscripten_webgl_create_context(a0, a1) {
 return _emscripten_webgl_do_create_context(a0, a1);
}
var PATH = {
 splitPath: (function(filename) {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 }),
 normalizeArray: (function(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (; up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 }),
 normalize: (function(path) {
  var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter((function(p) {
   return !!p;
  })), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 }),
 dirname: (function(path) {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 }),
 basename: (function(path) {
  if (path === "/") return "/";
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 }),
 extname: (function(path) {
  return PATH.splitPath(path)[3];
 }),
 join: (function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return PATH.normalize(paths.join("/"));
 }),
 join2: (function(l, r) {
  return PATH.normalize(l + "/" + r);
 })
};
var PATH_FS = {
 resolve: (function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path !== "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = path.charAt(0) === "/";
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((function(p) {
   return !!p;
  })), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 }),
 relative: (function(from, to) {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (; start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (; end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 })
};
var TTY = {
 ttys: [],
 init: (function() {}),
 shutdown: (function() {}),
 register: (function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 }),
 stream_ops: {
  open: (function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  }),
  close: (function(stream) {
   stream.tty.ops.flush(stream.tty);
  }),
  flush: (function(stream) {
   stream.tty.ops.flush(stream.tty);
  }),
  read: (function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  }),
  write: (function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  })
 },
 default_tty_ops: {
  get_char: (function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
     var BUFSIZE = 256;
     var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
     var bytesRead = 0;
     try {
      bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
     } catch (e) {
      if (e.toString().indexOf("EOF") != -1) bytesRead = 0; else throw e;
     }
     if (bytesRead > 0) {
      result = buf.slice(0, bytesRead).toString("utf-8");
     } else {
      result = null;
     }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
     result = window.prompt("Input: ");
     if (result !== null) {
      result += "\n";
     }
    } else if (typeof readline == "function") {
     result = readline();
     if (result !== null) {
      result += "\n";
     }
    }
    if (!result) {
     return null;
    }
    tty.input = intArrayFromString(result, true);
   }
   return tty.input.shift();
  }),
  put_char: (function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  }),
  flush: (function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  })
 },
 default_tty1_ops: {
  put_char: (function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  }),
  flush: (function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  })
 }
};
var MEMFS = {
 ops_table: null,
 mount: (function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 }),
 createNode: (function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 }),
 getFileDataAsRegularArray: (function(node) {
  if (node.contents && node.contents.subarray) {
   var arr = [];
   for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
   return arr;
  }
  return node.contents;
 }),
 getFileDataAsTypedArray: (function(node) {
  if (!node.contents) return new Uint8Array;
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 }),
 expandFileStorage: (function(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) | 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  return;
 }),
 resizeFileStorage: (function(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
   return;
  }
  if (!node.contents || node.contents.subarray) {
   var oldContents = node.contents;
   node.contents = new Uint8Array(new ArrayBuffer(newSize));
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
   return;
  }
  if (!node.contents) node.contents = [];
  if (node.contents.length > newSize) node.contents.length = newSize; else while (node.contents.length < newSize) node.contents.push(0);
  node.usedBytes = newSize;
 }),
 node_ops: {
  getattr: (function(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  }),
  setattr: (function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  }),
  lookup: (function(parent, name) {
   throw FS.genericErrors[44];
  }),
  mknod: (function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  }),
  rename: (function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   old_node.parent = new_dir;
  }),
  unlink: (function(parent, name) {
   delete parent.contents[name];
  }),
  rmdir: (function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
  }),
  readdir: (function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  }),
  symlink: (function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  }),
  readlink: (function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  })
 },
 stream_ops: {
  read: (function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   assert(size >= 0);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  }),
  write: (function(stream, buffer, offset, length, position, canOwn) {
   if (canOwn) {
    warnOnce("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)");
   }
   canOwn = false;
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     assert(position === 0, "canOwn must imply no weird position inside the file");
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  }),
  llseek: (function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  }),
  allocate: (function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  }),
  mmap: (function(stream, buffer, offset, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && (contents.buffer === buffer || contents.buffer === buffer.buffer)) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < stream.node.usedBytes) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    var fromHeap = buffer.buffer == HEAP8.buffer;
    ptr = _malloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    (fromHeap ? HEAP8 : buffer).set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  }),
  msync: (function(stream, buffer, offset, length, mmapFlags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   if (mmapFlags & 2) {
    return 0;
   }
   var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  })
 }
};
var IDBFS = {
 dbs: {},
 indexedDB: (function() {
  if (typeof indexedDB !== "undefined") return indexedDB;
  var ret = null;
  if (typeof window === "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  assert(ret, "IDBFS used, but indexedDB not supported");
  return ret;
 }),
 DB_VERSION: 21,
 DB_STORE_NAME: "FILE_DATA",
 mount: (function(mount) {
  return MEMFS.mount.apply(null, arguments);
 }),
 syncfs: (function(mount, populate, callback) {
  IDBFS.getLocalSet(mount, (function(err, local) {
   if (err) return callback(err);
   IDBFS.getRemoteSet(mount, (function(err, remote) {
    if (err) return callback(err);
    var src = populate ? remote : local;
    var dst = populate ? local : remote;
    IDBFS.reconcile(src, dst, callback);
   }));
  }));
 }),
 getDB: (function(name, callback) {
  var db = IDBFS.dbs[name];
  if (db) {
   return callback(null, db);
  }
  var req;
  try {
   req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
  } catch (e) {
   return callback(e);
  }
  if (!req) {
   return callback("Unable to connect to IndexedDB");
  }
  req.onupgradeneeded = (function(e) {
   var db = e.target.result;
   var transaction = e.target.transaction;
   var fileStore;
   if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
    fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
   } else {
    fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
   }
   if (!fileStore.indexNames.contains("timestamp")) {
    fileStore.createIndex("timestamp", "timestamp", {
     unique: false
    });
   }
  });
  req.onsuccess = (function() {
   db = req.result;
   IDBFS.dbs[name] = db;
   callback(null, db);
  });
  req.onerror = (function(e) {
   callback(this.error);
   e.preventDefault();
  });
 }),
 getLocalSet: (function(mount, callback) {
  var entries = {};
  function isRealDir(p) {
   return p !== "." && p !== "..";
  }
  function toAbsolute(root) {
   return (function(p) {
    return PATH.join2(root, p);
   });
  }
  var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  while (check.length) {
   var path = check.pop();
   var stat;
   try {
    stat = FS.stat(path);
   } catch (e) {
    return callback(e);
   }
   if (FS.isDir(stat.mode)) {
    check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
   }
   entries[path] = {
    timestamp: stat.mtime
   };
  }
  return callback(null, {
   type: "local",
   entries: entries
  });
 }),
 getRemoteSet: (function(mount, callback) {
  var entries = {};
  IDBFS.getDB(mount.mountpoint, (function(err, db) {
   if (err) return callback(err);
   try {
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
    transaction.onerror = (function(e) {
     callback(this.error);
     e.preventDefault();
    });
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    var index = store.index("timestamp");
    index.openKeyCursor().onsuccess = (function(event) {
     var cursor = event.target.result;
     if (!cursor) {
      return callback(null, {
       type: "remote",
       db: db,
       entries: entries
      });
     }
     entries[cursor.primaryKey] = {
      timestamp: cursor.key
     };
     cursor.continue();
    });
   } catch (e) {
    return callback(e);
   }
  }));
 }),
 loadLocalEntry: (function(path, callback) {
  var stat, node;
  try {
   var lookup = FS.lookupPath(path);
   node = lookup.node;
   stat = FS.stat(path);
  } catch (e) {
   return callback(e);
  }
  if (FS.isDir(stat.mode)) {
   return callback(null, {
    timestamp: stat.mtime,
    mode: stat.mode
   });
  } else if (FS.isFile(stat.mode)) {
   node.contents = MEMFS.getFileDataAsTypedArray(node);
   return callback(null, {
    timestamp: stat.mtime,
    mode: stat.mode,
    contents: node.contents
   });
  } else {
   return callback(new Error("node type not supported"));
  }
 }),
 storeLocalEntry: (function(path, entry, callback) {
  try {
   if (FS.isDir(entry.mode)) {
    FS.mkdir(path, entry.mode);
   } else if (FS.isFile(entry.mode)) {
    FS.writeFile(path, entry.contents, {
     canOwn: true
    });
   } else {
    return callback(new Error("node type not supported"));
   }
   FS.chmod(path, entry.mode);
   FS.utime(path, entry.timestamp, entry.timestamp);
  } catch (e) {
   return callback(e);
  }
  callback(null);
 }),
 removeLocalEntry: (function(path, callback) {
  try {
   var lookup = FS.lookupPath(path);
   var stat = FS.stat(path);
   if (FS.isDir(stat.mode)) {
    FS.rmdir(path);
   } else if (FS.isFile(stat.mode)) {
    FS.unlink(path);
   }
  } catch (e) {
   return callback(e);
  }
  callback(null);
 }),
 loadRemoteEntry: (function(store, path, callback) {
  var req = store.get(path);
  req.onsuccess = (function(event) {
   callback(null, event.target.result);
  });
  req.onerror = (function(e) {
   callback(this.error);
   e.preventDefault();
  });
 }),
 storeRemoteEntry: (function(store, path, entry, callback) {
  var req = store.put(entry, path);
  req.onsuccess = (function() {
   callback(null);
  });
  req.onerror = (function(e) {
   callback(this.error);
   e.preventDefault();
  });
 }),
 removeRemoteEntry: (function(store, path, callback) {
  var req = store.delete(path);
  req.onsuccess = (function() {
   callback(null);
  });
  req.onerror = (function(e) {
   callback(this.error);
   e.preventDefault();
  });
 }),
 reconcile: (function(src, dst, callback) {
  var total = 0;
  var create = [];
  Object.keys(src.entries).forEach((function(key) {
   var e = src.entries[key];
   var e2 = dst.entries[key];
   if (!e2 || e.timestamp > e2.timestamp) {
    create.push(key);
    total++;
   }
  }));
  var remove = [];
  Object.keys(dst.entries).forEach((function(key) {
   var e = dst.entries[key];
   var e2 = src.entries[key];
   if (!e2) {
    remove.push(key);
    total++;
   }
  }));
  if (!total) {
   return callback(null);
  }
  var errored = false;
  var db = src.type === "remote" ? src.db : dst.db;
  var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
  var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  function done(err) {
   if (err && !errored) {
    errored = true;
    return callback(err);
   }
  }
  transaction.onerror = (function(e) {
   done(this.error);
   e.preventDefault();
  });
  transaction.oncomplete = (function(e) {
   if (!errored) {
    callback(null);
   }
  });
  create.sort().forEach((function(path) {
   if (dst.type === "local") {
    IDBFS.loadRemoteEntry(store, path, (function(err, entry) {
     if (err) return done(err);
     IDBFS.storeLocalEntry(path, entry, done);
    }));
   } else {
    IDBFS.loadLocalEntry(path, (function(err, entry) {
     if (err) return done(err);
     IDBFS.storeRemoteEntry(store, path, entry, done);
    }));
   }
  }));
  remove.sort().reverse().forEach((function(path) {
   if (dst.type === "local") {
    IDBFS.removeLocalEntry(path, done);
   } else {
    IDBFS.removeRemoteEntry(store, path, done);
   }
  }));
 })
};
var NODEFS = {
 isWindows: false,
 staticInit: (function() {
  NODEFS.isWindows = !!process.platform.match(/^win/);
  var flags = process["binding"]("constants");
  if (flags["fs"]) {
   flags = flags["fs"];
  }
  NODEFS.flagsForNodeMap = {
   "1024": flags["O_APPEND"],
   "64": flags["O_CREAT"],
   "128": flags["O_EXCL"],
   "0": flags["O_RDONLY"],
   "2": flags["O_RDWR"],
   "4096": flags["O_SYNC"],
   "512": flags["O_TRUNC"],
   "1": flags["O_WRONLY"]
  };
 }),
 bufferFrom: (function(arrayBuffer) {
  return Buffer["alloc"] ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
 }),
 convertNodeCode: (function(e) {
  var code = e.code;
  assert(code in ERRNO_CODES);
  return ERRNO_CODES[code];
 }),
 mount: (function(mount) {
  assert(ENVIRONMENT_HAS_NODE);
  return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0);
 }),
 createNode: (function(parent, name, mode, dev) {
  if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
   throw new FS.ErrnoError(28);
  }
  var node = FS.createNode(parent, name, mode);
  node.node_ops = NODEFS.node_ops;
  node.stream_ops = NODEFS.stream_ops;
  return node;
 }),
 getMode: (function(path) {
  var stat;
  try {
   stat = fs.lstatSync(path);
   if (NODEFS.isWindows) {
    stat.mode = stat.mode | (stat.mode & 292) >> 2;
   }
  } catch (e) {
   if (!e.code) throw e;
   throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
  }
  return stat.mode;
 }),
 realPath: (function(node) {
  var parts = [];
  while (node.parent !== node) {
   parts.push(node.name);
   node = node.parent;
  }
  parts.push(node.mount.opts.root);
  parts.reverse();
  return PATH.join.apply(null, parts);
 }),
 flagsForNode: (function(flags) {
  flags &= ~2097152;
  flags &= ~2048;
  flags &= ~32768;
  flags &= ~524288;
  var newFlags = 0;
  for (var k in NODEFS.flagsForNodeMap) {
   if (flags & k) {
    newFlags |= NODEFS.flagsForNodeMap[k];
    flags ^= k;
   }
  }
  if (!flags) {
   return newFlags;
  } else {
   throw new FS.ErrnoError(28);
  }
 }),
 node_ops: {
  getattr: (function(node) {
   var path = NODEFS.realPath(node);
   var stat;
   try {
    stat = fs.lstatSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
   if (NODEFS.isWindows && !stat.blksize) {
    stat.blksize = 4096;
   }
   if (NODEFS.isWindows && !stat.blocks) {
    stat.blocks = (stat.size + stat.blksize - 1) / stat.blksize | 0;
   }
   return {
    dev: stat.dev,
    ino: stat.ino,
    mode: stat.mode,
    nlink: stat.nlink,
    uid: stat.uid,
    gid: stat.gid,
    rdev: stat.rdev,
    size: stat.size,
    atime: stat.atime,
    mtime: stat.mtime,
    ctime: stat.ctime,
    blksize: stat.blksize,
    blocks: stat.blocks
   };
  }),
  setattr: (function(node, attr) {
   var path = NODEFS.realPath(node);
   try {
    if (attr.mode !== undefined) {
     fs.chmodSync(path, attr.mode);
     node.mode = attr.mode;
    }
    if (attr.timestamp !== undefined) {
     var date = new Date(attr.timestamp);
     fs.utimesSync(path, date, date);
    }
    if (attr.size !== undefined) {
     fs.truncateSync(path, attr.size);
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  lookup: (function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   var mode = NODEFS.getMode(path);
   return NODEFS.createNode(parent, name, mode);
  }),
  mknod: (function(parent, name, mode, dev) {
   var node = NODEFS.createNode(parent, name, mode, dev);
   var path = NODEFS.realPath(node);
   try {
    if (FS.isDir(node.mode)) {
     fs.mkdirSync(path, node.mode);
    } else {
     fs.writeFileSync(path, "", {
      mode: node.mode
     });
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
   return node;
  }),
  rename: (function(oldNode, newDir, newName) {
   var oldPath = NODEFS.realPath(oldNode);
   var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
   try {
    fs.renameSync(oldPath, newPath);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  unlink: (function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   try {
    fs.unlinkSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  rmdir: (function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   try {
    fs.rmdirSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  readdir: (function(node) {
   var path = NODEFS.realPath(node);
   try {
    return fs.readdirSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  symlink: (function(parent, newName, oldPath) {
   var newPath = PATH.join2(NODEFS.realPath(parent), newName);
   try {
    fs.symlinkSync(oldPath, newPath);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  readlink: (function(node) {
   var path = NODEFS.realPath(node);
   try {
    path = fs.readlinkSync(path);
    path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
    return path;
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  })
 },
 stream_ops: {
  open: (function(stream) {
   var path = NODEFS.realPath(stream.node);
   try {
    if (FS.isFile(stream.node.mode)) {
     stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  close: (function(stream) {
   try {
    if (FS.isFile(stream.node.mode) && stream.nfd) {
     fs.closeSync(stream.nfd);
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  read: (function(stream, buffer, offset, length, position) {
   if (length === 0) return 0;
   try {
    return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
   } catch (e) {
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  write: (function(stream, buffer, offset, length, position) {
   try {
    return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
   } catch (e) {
    throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
   }
  }),
  llseek: (function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     try {
      var stat = fs.fstatSync(stream.nfd);
      position += stat.size;
     } catch (e) {
      throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
     }
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  })
 }
};
var WORKERFS = {
 DIR_MODE: 16895,
 FILE_MODE: 33279,
 reader: null,
 mount: (function(mount) {
  assert(ENVIRONMENT_IS_WORKER);
  if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync;
  var root = WORKERFS.createNode(null, "/", WORKERFS.DIR_MODE, 0);
  var createdParents = {};
  function ensureParent(path) {
   var parts = path.split("/");
   var parent = root;
   for (var i = 0; i < parts.length - 1; i++) {
    var curr = parts.slice(0, i + 1).join("/");
    if (!createdParents[curr]) {
     createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
    }
    parent = createdParents[curr];
   }
   return parent;
  }
  function base(path) {
   var parts = path.split("/");
   return parts[parts.length - 1];
  }
  Array.prototype.forEach.call(mount.opts["files"] || [], (function(file) {
   WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
  }));
  (mount.opts["blobs"] || []).forEach((function(obj) {
   WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
  }));
  (mount.opts["packages"] || []).forEach((function(pack) {
   pack["metadata"].files.forEach((function(file) {
    var name = file.filename.substr(1);
    WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack["blob"].slice(file.start, file.end));
   }));
  }));
  return root;
 }),
 createNode: (function(parent, name, mode, dev, contents, mtime) {
  var node = FS.createNode(parent, name, mode);
  node.mode = mode;
  node.node_ops = WORKERFS.node_ops;
  node.stream_ops = WORKERFS.stream_ops;
  node.timestamp = (mtime || new Date).getTime();
  assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
  if (mode === WORKERFS.FILE_MODE) {
   node.size = contents.size;
   node.contents = contents;
  } else {
   node.size = 4096;
   node.contents = {};
  }
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 }),
 node_ops: {
  getattr: (function(node) {
   return {
    dev: 1,
    ino: undefined,
    mode: node.mode,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: undefined,
    size: node.size,
    atime: new Date(node.timestamp),
    mtime: new Date(node.timestamp),
    ctime: new Date(node.timestamp),
    blksize: 4096,
    blocks: Math.ceil(node.size / 4096)
   };
  }),
  setattr: (function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
  }),
  lookup: (function(parent, name) {
   throw new FS.ErrnoError(44);
  }),
  mknod: (function(parent, name, mode, dev) {
   throw new FS.ErrnoError(63);
  }),
  rename: (function(oldNode, newDir, newName) {
   throw new FS.ErrnoError(63);
  }),
  unlink: (function(parent, name) {
   throw new FS.ErrnoError(63);
  }),
  rmdir: (function(parent, name) {
   throw new FS.ErrnoError(63);
  }),
  readdir: (function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  }),
  symlink: (function(parent, newName, oldPath) {
   throw new FS.ErrnoError(63);
  }),
  readlink: (function(node) {
   throw new FS.ErrnoError(63);
  })
 },
 stream_ops: {
  read: (function(stream, buffer, offset, length, position) {
   if (position >= stream.node.size) return 0;
   var chunk = stream.node.contents.slice(position, position + length);
   var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
   buffer.set(new Uint8Array(ab), offset);
   return chunk.size;
  }),
  write: (function(stream, buffer, offset, length, position) {
   throw new FS.ErrnoError(29);
  }),
  llseek: (function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.size;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  })
 }
};
var ERRNO_MESSAGES = {
 0: "Success",
 1: "Arg list too long",
 2: "Permission denied",
 3: "Address already in use",
 4: "Address not available",
 5: "Address family not supported by protocol family",
 6: "No more processes",
 7: "Socket already connected",
 8: "Bad file number",
 9: "Trying to read unreadable message",
 10: "Mount device busy",
 11: "Operation canceled",
 12: "No children",
 13: "Connection aborted",
 14: "Connection refused",
 15: "Connection reset by peer",
 16: "File locking deadlock error",
 17: "Destination address required",
 18: "Math arg out of domain of func",
 19: "Quota exceeded",
 20: "File exists",
 21: "Bad address",
 22: "File too large",
 23: "Host is unreachable",
 24: "Identifier removed",
 25: "Illegal byte sequence",
 26: "Connection already in progress",
 27: "Interrupted system call",
 28: "Invalid argument",
 29: "I/O error",
 30: "Socket is already connected",
 31: "Is a directory",
 32: "Too many symbolic links",
 33: "Too many open files",
 34: "Too many links",
 35: "Message too long",
 36: "Multihop attempted",
 37: "File or path name too long",
 38: "Network interface is not configured",
 39: "Connection reset by network",
 40: "Network is unreachable",
 41: "Too many open files in system",
 42: "No buffer space available",
 43: "No such device",
 44: "No such file or directory",
 45: "Exec format error",
 46: "No record locks available",
 47: "The link has been severed",
 48: "Not enough core",
 49: "No message of desired type",
 50: "Protocol not available",
 51: "No space left on device",
 52: "Function not implemented",
 53: "Socket is not connected",
 54: "Not a directory",
 55: "Directory not empty",
 56: "State not recoverable",
 57: "Socket operation on non-socket",
 59: "Not a typewriter",
 60: "No such device or address",
 61: "Value too large for defined data type",
 62: "Previous owner died",
 63: "Not super-user",
 64: "Broken pipe",
 65: "Protocol error",
 66: "Unknown protocol",
 67: "Protocol wrong type for socket",
 68: "Math result not representable",
 69: "Read only file system",
 70: "Illegal seek",
 71: "No such process",
 72: "Stale file handle",
 73: "Connection timed out",
 74: "Text file busy",
 75: "Cross-device link",
 100: "Device not a stream",
 101: "Bad font file fmt",
 102: "Invalid slot",
 103: "Invalid request code",
 104: "No anode",
 105: "Block device required",
 106: "Channel number out of range",
 107: "Level 3 halted",
 108: "Level 3 reset",
 109: "Link number out of range",
 110: "Protocol driver not attached",
 111: "No CSI structure available",
 112: "Level 2 halted",
 113: "Invalid exchange",
 114: "Invalid request descriptor",
 115: "Exchange full",
 116: "No data (for no delay io)",
 117: "Timer expired",
 118: "Out of streams resources",
 119: "Machine is not on the network",
 120: "Package not installed",
 121: "The object is remote",
 122: "Advertise error",
 123: "Srmount error",
 124: "Communication error on send",
 125: "Cross mount point (not really error)",
 126: "Given log. name not unique",
 127: "f.d. invalid for this operation",
 128: "Remote address changed",
 129: "Can   access a needed shared lib",
 130: "Accessing a corrupted shared lib",
 131: ".lib section in a.out corrupted",
 132: "Attempting to link in too many libs",
 133: "Attempting to exec a shared library",
 135: "Streams pipe error",
 136: "Too many users",
 137: "Socket type not supported",
 138: "Not supported",
 139: "Protocol family not supported",
 140: "Can't send after socket shutdown",
 141: "Too many references",
 142: "Host is down",
 148: "No medium (in tape drive)",
 156: "Level 2 not synchronized"
};
var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 trackingDelegate: {},
 tracking: {
  openFlags: {
   READ: 1,
   WRITE: 2
  }
 },
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 handleFSError: (function(e) {
  if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
  return ___setErrNo(e.errno);
 }),
 lookupPath: (function(path, opts) {
  path = PATH_FS.resolve(FS.cwd(), path);
  opts = opts || {};
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  for (var key in defaults) {
   if (opts[key] === undefined) {
    opts[key] = defaults[key];
   }
  }
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = PATH.normalizeArray(path.split("/").filter((function(p) {
   return !!p;
  })), false);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 }),
 getPath: (function(node) {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
   }
   path = path ? node.name + "/" + path : node.name;
   node = node.parent;
  }
 }),
 hashName: (function(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 }),
 hashAddNode: (function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 }),
 hashRemoveNode: (function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 }),
 lookupNode: (function(parent, name) {
  var err = FS.mayLookup(parent);
  if (err) {
   throw new FS.ErrnoError(err, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 }),
 createNode: (function(parent, name, mode, rdev) {
  if (!FS.FSNode) {
   FS.FSNode = (function(parent, name, mode, rdev) {
    if (!parent) {
     parent = this;
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
   });
   FS.FSNode.prototype = {};
   var readMode = 292 | 73;
   var writeMode = 146;
   Object.defineProperties(FS.FSNode.prototype, {
    read: {
     get: (function() {
      return (this.mode & readMode) === readMode;
     }),
     set: (function(val) {
      val ? this.mode |= readMode : this.mode &= ~readMode;
     })
    },
    write: {
     get: (function() {
      return (this.mode & writeMode) === writeMode;
     }),
     set: (function(val) {
      val ? this.mode |= writeMode : this.mode &= ~writeMode;
     })
    },
    isFolder: {
     get: (function() {
      return FS.isDir(this.mode);
     })
    },
    isDevice: {
     get: (function() {
      return FS.isChrdev(this.mode);
     })
    }
   });
  }
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 }),
 destroyNode: (function(node) {
  FS.hashRemoveNode(node);
 }),
 isRoot: (function(node) {
  return node === node.parent;
 }),
 isMountpoint: (function(node) {
  return !!node.mounted;
 }),
 isFile: (function(mode) {
  return (mode & 61440) === 32768;
 }),
 isDir: (function(mode) {
  return (mode & 61440) === 16384;
 }),
 isLink: (function(mode) {
  return (mode & 61440) === 40960;
 }),
 isChrdev: (function(mode) {
  return (mode & 61440) === 8192;
 }),
 isBlkdev: (function(mode) {
  return (mode & 61440) === 24576;
 }),
 isFIFO: (function(mode) {
  return (mode & 61440) === 4096;
 }),
 isSocket: (function(mode) {
  return (mode & 49152) === 49152;
 }),
 flagModes: {
  "r": 0,
  "rs": 1052672,
  "r+": 2,
  "w": 577,
  "wx": 705,
  "xw": 705,
  "w+": 578,
  "wx+": 706,
  "xw+": 706,
  "a": 1089,
  "ax": 1217,
  "xa": 1217,
  "a+": 1090,
  "ax+": 1218,
  "xa+": 1218
 },
 modeStringToFlags: (function(str) {
  var flags = FS.flagModes[str];
  if (typeof flags === "undefined") {
   throw new Error("Unknown file open mode: " + str);
  }
  return flags;
 }),
 flagsToPermissionString: (function(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 }),
 nodePermissions: (function(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
   return 2;
  } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
   return 2;
  } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 }),
 mayLookup: (function(dir) {
  var err = FS.nodePermissions(dir, "x");
  if (err) return err;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 }),
 mayCreate: (function(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 }),
 mayDelete: (function(dir, name, isdir) {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var err = FS.nodePermissions(dir, "wx");
  if (err) {
   return err;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 }),
 mayOpen: (function(node, flags) {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 }),
 MAX_OPEN_FDS: 4096,
 nextfd: (function(fd_start, fd_end) {
  fd_start = fd_start || 0;
  fd_end = fd_end || FS.MAX_OPEN_FDS;
  for (var fd = fd_start; fd <= fd_end; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 }),
 getStream: (function(fd) {
  return FS.streams[fd];
 }),
 createStream: (function(stream, fd_start, fd_end) {
  if (!FS.FSStream) {
   FS.FSStream = (function() {});
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     get: (function() {
      return this.node;
     }),
     set: (function(val) {
      this.node = val;
     })
    },
    isRead: {
     get: (function() {
      return (this.flags & 2097155) !== 1;
     })
    },
    isWrite: {
     get: (function() {
      return (this.flags & 2097155) !== 0;
     })
    },
    isAppend: {
     get: (function() {
      return this.flags & 1024;
     })
    }
   });
  }
  var newStream = new FS.FSStream;
  for (var p in stream) {
   newStream[p] = stream[p];
  }
  stream = newStream;
  var fd = FS.nextfd(fd_start, fd_end);
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 }),
 closeStream: (function(fd) {
  FS.streams[fd] = null;
 }),
 chrdev_stream_ops: {
  open: (function(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  }),
  llseek: (function() {
   throw new FS.ErrnoError(70);
  })
 },
 major: (function(dev) {
  return dev >> 8;
 }),
 minor: (function(dev) {
  return dev & 255;
 }),
 makedev: (function(ma, mi) {
  return ma << 8 | mi;
 }),
 registerDevice: (function(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 }),
 getDevice: (function(dev) {
  return FS.devices[dev];
 }),
 getMounts: (function(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 }),
 syncfs: (function(populate, callback) {
  if (typeof populate === "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   console.log("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(err) {
   assert(FS.syncFSRequests > 0);
   FS.syncFSRequests--;
   return callback(err);
  }
  function done(err) {
   if (err) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(err);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach((function(mount) {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  }));
 }),
 mount: (function(type, opts, mountpoint) {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 }),
 unmount: (function(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach((function(hash) {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.indexOf(current.mount) !== -1) {
     FS.destroyNode(current);
    }
    current = next;
   }
  }));
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  assert(idx !== -1);
  node.mount.mounts.splice(idx, 1);
 }),
 lookup: (function(parent, name) {
  return parent.node_ops.lookup(parent, name);
 }),
 mknod: (function(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var err = FS.mayCreate(parent, name);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 }),
 create: (function(path, mode) {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 }),
 mkdir: (function(path, mode) {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 }),
 mkdirTree: (function(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 }),
 mkdev: (function(path, mode, dev) {
  if (typeof dev === "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 }),
 symlink: (function(oldpath, newpath) {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var err = FS.mayCreate(parent, newname);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 }),
 rename: (function(old_path, new_path) {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  try {
   lookup = FS.lookupPath(old_path, {
    parent: true
   });
   old_dir = lookup.node;
   lookup = FS.lookupPath(new_path, {
    parent: true
   });
   new_dir = lookup.node;
  } catch (e) {
   throw new FS.ErrnoError(10);
  }
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var err = FS.mayDelete(old_dir, old_name, isdir);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  err = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   err = FS.nodePermissions(old_dir, "w");
   if (err) {
    throw new FS.ErrnoError(err);
   }
  }
  try {
   if (FS.trackingDelegate["willMovePath"]) {
    FS.trackingDelegate["willMovePath"](old_path, new_path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
  try {
   if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path);
  } catch (e) {
   console.log("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
 }),
 rmdir: (function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var err = FS.mayDelete(parent, name, true);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 }),
 readdir: (function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 }),
 unlink: (function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var err = FS.mayDelete(parent, name, false);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 }),
 readlink: (function(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 }),
 stat: (function(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 }),
 lstat: (function(path) {
  return FS.stat(path, true);
 }),
 chmod: (function(path, mode, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 }),
 lchmod: (function(path, mode) {
  FS.chmod(path, mode, true);
 }),
 fchmod: (function(fd, mode) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chmod(stream.node, mode);
 }),
 chown: (function(path, uid, gid, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 }),
 lchown: (function(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 }),
 fchown: (function(fd, uid, gid) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chown(stream.node, uid, gid);
 }),
 truncate: (function(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var err = FS.nodePermissions(node, "w");
  if (err) {
   throw new FS.ErrnoError(err);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 }),
 ftruncate: (function(fd, len) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 }),
 utime: (function(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 }),
 open: (function(path, flags, mode, fd_start, fd_end) {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
  mode = typeof mode === "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path === "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var err = FS.mayOpen(node, flags);
   if (err) {
    throw new FS.ErrnoError(err);
   }
  }
  if (flags & 512) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  }, fd_start, fd_end);
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
    console.log("FS.trackingDelegate error on read file: " + path);
   }
  }
  try {
   if (FS.trackingDelegate["onOpenFile"]) {
    var trackingFlags = 0;
    if ((flags & 2097155) !== 1) {
     trackingFlags |= FS.tracking.openFlags.READ;
    }
    if ((flags & 2097155) !== 0) {
     trackingFlags |= FS.tracking.openFlags.WRITE;
    }
    FS.trackingDelegate["onOpenFile"](path, trackingFlags);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
  }
  return stream;
 }),
 close: (function(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 }),
 isClosed: (function(stream) {
  return stream.fd === null;
 }),
 llseek: (function(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 }),
 read: (function(stream, buffer, offset, length, position) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 }),
 write: (function(stream, buffer, offset, length, position, canOwn) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  try {
   if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path);
  } catch (e) {
   console.log("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
  }
  return bytesWritten;
 }),
 allocate: (function(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 }),
 mmap: (function(stream, buffer, offset, length, position, prot, flags) {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
 }),
 msync: (function(stream, buffer, offset, length, mmapFlags) {
  if (!stream || !stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 }),
 munmap: (function(stream) {
  return 0;
 }),
 ioctl: (function(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 }),
 readFile: (function(path, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "r";
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error('Invalid encoding type "' + opts.encoding + '"');
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 }),
 writeFile: (function(path, data, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "w";
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data === "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 }),
 cwd: (function() {
  return FS.currentPath;
 }),
 chdir: (function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var err = FS.nodePermissions(lookup.node, "x");
  if (err) {
   throw new FS.ErrnoError(err);
  }
  FS.currentPath = lookup.path;
 }),
 createDefaultDirectories: (function() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 }),
 createDefaultDevices: (function() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: (function() {
    return 0;
   }),
   write: (function(stream, buffer, offset, length, pos) {
    return length;
   })
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var random_device;
  if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
   var randomBuffer = new Uint8Array(1);
   random_device = (function() {
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0];
   });
  } else if (ENVIRONMENT_IS_NODE) {
   try {
    var crypto_module = require("crypto");
    random_device = (function() {
     return crypto_module["randomBytes"](1)[0];
    });
   } catch (e) {}
  } else {}
  if (!random_device) {
   random_device = (function() {
    abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
   });
  }
  FS.createDevice("/dev", "random", random_device);
  FS.createDevice("/dev", "urandom", random_device);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 }),
 createSpecialDirectories: (function() {
  FS.mkdir("/proc");
  FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: (function() {
    var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: (function(parent, name) {
      var fd = +name;
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(8);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: (function() {
         return stream.path;
        })
       }
      };
      ret.parent = ret;
      return ret;
     })
    };
    return node;
   })
  }, {}, "/proc/self/fd");
 }),
 createStandardStreams: (function() {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", "r");
  var stdout = FS.open("/dev/stdout", "w");
  var stderr = FS.open("/dev/stderr", "w");
  assert(stdin.fd === 0, "invalid handle for stdin (" + stdin.fd + ")");
  assert(stdout.fd === 1, "invalid handle for stdout (" + stdout.fd + ")");
  assert(stderr.fd === 2, "invalid handle for stderr (" + stderr.fd + ")");
 }),
 ensureErrnoError: (function() {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.node = node;
   this.setErrno = (function(errno) {
    this.errno = errno;
    for (var key in ERRNO_CODES) {
     if (ERRNO_CODES[key] === errno) {
      this.code = key;
      break;
     }
    }
   });
   this.setErrno(errno);
   this.message = ERRNO_MESSAGES[errno];
   if (this.stack) {
    Object.defineProperty(this, "stack", {
     value: (new Error).stack,
     writable: true
    });
    this.stack = demangleAll(this.stack);
   }
  };
  FS.ErrnoError.prototype = new Error;
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach((function(code) {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  }));
 }),
 staticInit: (function() {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS,
   "IDBFS": IDBFS,
   "NODEFS": NODEFS,
   "WORKERFS": WORKERFS
  };
 }),
 init: (function(input, output, error) {
  assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 }),
 quit: (function() {
  FS.init.initialized = false;
  var fflush = Module["_fflush"];
  if (fflush) fflush(0);
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 }),
 getMode: (function(canRead, canWrite) {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
 }),
 joinPath: (function(parts, forceRelative) {
  var path = PATH.join.apply(null, parts);
  if (forceRelative && path[0] == "/") path = path.substr(1);
  return path;
 }),
 absolutePath: (function(relative, base) {
  return PATH_FS.resolve(base, relative);
 }),
 standardizePath: (function(path) {
  return PATH.normalize(path);
 }),
 findObject: (function(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (ret.exists) {
   return ret.object;
  } else {
   ___setErrNo(ret.error);
   return null;
  }
 }),
 analyzePath: (function(path, dontResolveLastLink) {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 }),
 createFolder: (function(parent, name, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.mkdir(path, mode);
 }),
 createPath: (function(parent, path, canRead, canWrite) {
  parent = typeof parent === "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 }),
 createFile: (function(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.create(path, mode);
 }),
 createDataFile: (function(parent, name, data, canRead, canWrite, canOwn) {
  var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
  var mode = FS.getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data === "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, "w");
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 }),
 createDevice: (function(parent, name, input, output) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: (function(stream) {
    stream.seekable = false;
   }),
   close: (function(stream) {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   }),
   read: (function(stream, buffer, offset, length, pos) {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   }),
   write: (function(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   })
  });
  return FS.mkdev(path, mode, dev);
 }),
 createLink: (function(parent, name, target, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  return FS.symlink(target, path);
 }),
 forceLoadFile: (function(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  var success = true;
  if (typeof XMLHttpRequest !== "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    success = false;
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
  if (!success) ___setErrNo(29);
  return success;
 }),
 createLazyFile: (function(parent, name, url, canRead, canWrite) {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest;
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = (function(from, to) {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    } else {
     return intArrayFromString(xhr.responseText || "", true);
    }
   });
   var lazyArray = this;
   lazyArray.setDataGetter((function(chunkNum) {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] === "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   }));
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest !== "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array;
   Object.defineProperties(lazyArray, {
    length: {
     get: (function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     })
    },
    chunkSize: {
     get: (function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     })
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: (function() {
     return this.contents.length;
    })
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach((function(key) {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    if (!FS.forceLoadFile(node)) {
     throw new FS.ErrnoError(29);
    }
    return fn.apply(null, arguments);
   };
  }));
  stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
   if (!FS.forceLoadFile(node)) {
    throw new FS.ErrnoError(29);
   }
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   assert(size >= 0);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  };
  node.stream_ops = stream_ops;
  return node;
 }),
 createPreloadedFile: (function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
  Browser.init();
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency("cp " + fullname);
  function processData(byteArray) {
   function finish(byteArray) {
    if (preFinish) preFinish();
    if (!dontCreateFile) {
     FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
    if (onload) onload();
    removeRunDependency(dep);
   }
   var handled = false;
   Module["preloadPlugins"].forEach((function(plugin) {
    if (handled) return;
    if (plugin["canHandle"](fullname)) {
     plugin["handle"](byteArray, fullname, finish, (function() {
      if (onerror) onerror();
      removeRunDependency(dep);
     }));
     handled = true;
    }
   }));
   if (!handled) finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
   Browser.asyncLoad(url, (function(byteArray) {
    processData(byteArray);
   }), onerror);
  } else {
   processData(url);
  }
 }),
 indexedDB: (function() {
  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 }),
 DB_NAME: (function() {
  return "EM_FS_" + window.location.pathname;
 }),
 DB_VERSION: 20,
 DB_STORE_NAME: "FILE_DATA",
 saveFilesToDB: (function(paths, onload, onerror) {
  onload = onload || (function() {});
  onerror = onerror || (function() {});
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
   console.log("creating db");
   var db = openRequest.result;
   db.createObjectStore(FS.DB_STORE_NAME);
  };
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   var transaction = db.transaction([ FS.DB_STORE_NAME ], "readwrite");
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach((function(path) {
    var putRequest = files.put(FS.analyzePath(path).object.contents, path);
    putRequest.onsuccess = function putRequest_onsuccess() {
     ok++;
     if (ok + fail == total) finish();
    };
    putRequest.onerror = function putRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   }));
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 }),
 loadFilesFromDB: (function(paths, onload, onerror) {
  onload = onload || (function() {});
  onerror = onerror || (function() {});
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = onerror;
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   try {
    var transaction = db.transaction([ FS.DB_STORE_NAME ], "readonly");
   } catch (e) {
    onerror(e);
    return;
   }
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach((function(path) {
    var getRequest = files.get(path);
    getRequest.onsuccess = function getRequest_onsuccess() {
     if (FS.analyzePath(path).exists) {
      FS.unlink(path);
     }
     FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
     ok++;
     if (ok + fail == total) finish();
    };
    getRequest.onerror = function getRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   }));
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 })
};
var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 mappings: {},
 umask: 511,
 calculateAt: (function(dirfd, path) {
  if (path[0] !== "/") {
   var dir;
   if (dirfd === -100) {
    dir = FS.cwd();
   } else {
    var dirstream = FS.getStream(dirfd);
    if (!dirstream) throw new FS.ErrnoError(8);
    dir = dirstream.path;
   }
   path = PATH.join2(dir, path);
  }
  return path;
 }),
 doStat: (function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  GROWABLE_HEAP_STORE_I32(buf | 0, stat.dev);
  GROWABLE_HEAP_STORE_I32(buf + 4 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 8 | 0, stat.ino);
  GROWABLE_HEAP_STORE_I32(buf + 12 | 0, stat.mode);
  GROWABLE_HEAP_STORE_I32(buf + 16 | 0, stat.nlink);
  GROWABLE_HEAP_STORE_I32(buf + 20 | 0, stat.uid);
  GROWABLE_HEAP_STORE_I32(buf + 24 | 0, stat.gid);
  GROWABLE_HEAP_STORE_I32(buf + 28 | 0, stat.rdev);
  GROWABLE_HEAP_STORE_I32(buf + 32 | 0, 0);
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], GROWABLE_HEAP_STORE_I32(buf + 40 | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(buf + 44 | 0, tempI64[1]);
  GROWABLE_HEAP_STORE_I32(buf + 48 | 0, 4096);
  GROWABLE_HEAP_STORE_I32(buf + 52 | 0, stat.blocks);
  GROWABLE_HEAP_STORE_I32(buf + 56 | 0, stat.atime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 60 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 64 | 0, stat.mtime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 68 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 72 | 0, stat.ctime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 76 | 0, 0);
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], GROWABLE_HEAP_STORE_I32(buf + 80 | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(buf + 84 | 0, tempI64[1]);
  return 0;
 }),
 doMsync: (function(addr, stream, len, flags) {
  var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
  FS.msync(stream, buffer, 0, len, flags);
 }),
 doMkdir: (function(path, mode) {
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 }),
 doMknod: (function(path, mode, dev) {
  switch (mode & 61440) {
  case 32768:
  case 8192:
  case 24576:
  case 4096:
  case 49152:
   break;
  default:
   return -28;
  }
  FS.mknod(path, mode, dev);
  return 0;
 }),
 doReadlink: (function(path, buf, bufsize) {
  if (bufsize <= 0) return -28;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = GROWABLE_HEAP_LOAD_I8(buf + len | 0);
  stringToUTF8(ret, buf, bufsize + 1);
  GROWABLE_HEAP_STORE_I8(buf + len | 0, endChar);
  return len;
 }),
 doAccess: (function(path, amode) {
  if (amode & ~7) {
   return -28;
  }
  var node;
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  node = lookup.node;
  if (!node) {
   return -44;
  }
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && FS.nodePermissions(node, perms)) {
   return -2;
  }
  return 0;
 }),
 doDup: (function(path, flags, suggestFD) {
  var suggest = FS.getStream(suggestFD);
  if (suggest) FS.close(suggest);
  return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
 }),
 doReadv: (function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = GROWABLE_HEAP_LOAD_I32(iov + i * 8 | 0);
   var len = GROWABLE_HEAP_LOAD_I32(iov + (i * 8 + 4) | 0);
   var curr = FS.read(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
   if (curr < len) break;
  }
  return ret;
 }),
 doWritev: (function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = GROWABLE_HEAP_LOAD_I32(iov + i * 8 | 0);
   var len = GROWABLE_HEAP_LOAD_I32(iov + (i * 8 + 4) | 0);
   var curr = FS.write(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
  }
  return ret;
 }),
 varargs: 0,
 get: (function(varargs) {
  SYSCALLS.varargs += 4;
  var ret = GROWABLE_HEAP_LOAD_I32(SYSCALLS.varargs - 4 | 0);
  return ret;
 }),
 getStr: (function() {
  var ret = UTF8ToString(SYSCALLS.get());
  return ret;
 }),
 getStreamFromFD: (function(fd) {
  if (fd === undefined) fd = SYSCALLS.get();
  var stream = FS.getStream(fd);
  if (!stream) throw new FS.ErrnoError(8);
  return stream;
 }),
 get64: (function() {
  var low = SYSCALLS.get(), high = SYSCALLS.get();
  if (low >= 0) assert(high === 0); else assert(high === -1);
  return low;
 }),
 getZero: (function() {
  assert(SYSCALLS.get() === 0);
 })
};
function _fd_close(fd) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(2, 1, fd);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}
function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(3, 1, fd, offset_low, offset_high, whence, newOffset);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var HIGH_OFFSET = 4294967296;
  var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  var DOUBLE_LIMIT = 9007199254740992;
  if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
   return -61;
  }
  FS.llseek(stream, offset, whence);
  tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], GROWABLE_HEAP_STORE_I32(newOffset | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(newOffset + 4 | 0, tempI64[1]);
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}
function _fd_write(fd, iov, iovcnt, pnum) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(4, 1, fd, iov, iovcnt, pnum);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = SYSCALLS.doWritev(stream, iov, iovcnt);
  GROWABLE_HEAP_STORE_I32(pnum | 0, num);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}
function _memcpy(dest, src, num) {
 dest = dest | 0;
 src = src | 0;
 num = num | 0;
 var ret = 0;
 var aligned_dest_end = 0;
 var block_aligned_dest_end = 0;
 var dest_end = 0;
 if ((num | 0) >= 8192) {
  _emscripten_memcpy_big(dest | 0, src | 0, num | 0) | 0;
  return dest | 0;
 }
 ret = dest | 0;
 dest_end = dest + num | 0;
 if ((dest & 3) == (src & 3)) {
  while (dest & 3) {
   if ((num | 0) == 0) return ret | 0;
   GROWABLE_HEAP_STORE_I8(dest >> 0 | 0, GROWABLE_HEAP_LOAD_I8(src >> 0 | 0) | 0);
   dest = dest + 1 | 0;
   src = src + 1 | 0;
   num = num - 1 | 0;
  }
  aligned_dest_end = dest_end & -4 | 0;
  block_aligned_dest_end = aligned_dest_end - 64 | 0;
  while ((dest | 0) <= (block_aligned_dest_end | 0)) {
   GROWABLE_HEAP_STORE_I32(dest | 0, GROWABLE_HEAP_LOAD_I32(src | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 4 | 0, GROWABLE_HEAP_LOAD_I32(src + 4 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 8 | 0, GROWABLE_HEAP_LOAD_I32(src + 8 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 12 | 0, GROWABLE_HEAP_LOAD_I32(src + 12 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 16 | 0, GROWABLE_HEAP_LOAD_I32(src + 16 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 20 | 0, GROWABLE_HEAP_LOAD_I32(src + 20 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 24 | 0, GROWABLE_HEAP_LOAD_I32(src + 24 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 28 | 0, GROWABLE_HEAP_LOAD_I32(src + 28 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 32 | 0, GROWABLE_HEAP_LOAD_I32(src + 32 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 36 | 0, GROWABLE_HEAP_LOAD_I32(src + 36 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 40 | 0, GROWABLE_HEAP_LOAD_I32(src + 40 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 44 | 0, GROWABLE_HEAP_LOAD_I32(src + 44 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 48 | 0, GROWABLE_HEAP_LOAD_I32(src + 48 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 52 | 0, GROWABLE_HEAP_LOAD_I32(src + 52 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 56 | 0, GROWABLE_HEAP_LOAD_I32(src + 56 | 0) | 0);
   GROWABLE_HEAP_STORE_I32(dest + 60 | 0, GROWABLE_HEAP_LOAD_I32(src + 60 | 0) | 0);
   dest = dest + 64 | 0;
   src = src + 64 | 0;
  }
  while ((dest | 0) < (aligned_dest_end | 0)) {
   GROWABLE_HEAP_STORE_I32(dest | 0, GROWABLE_HEAP_LOAD_I32(src | 0) | 0);
   dest = dest + 4 | 0;
   src = src + 4 | 0;
  }
 } else {
  aligned_dest_end = dest_end - 4 | 0;
  while ((dest | 0) < (aligned_dest_end | 0)) {
   GROWABLE_HEAP_STORE_I8(dest >> 0 | 0, GROWABLE_HEAP_LOAD_I8(src >> 0 | 0) | 0);
   GROWABLE_HEAP_STORE_I8(dest + 1 >> 0 | 0, GROWABLE_HEAP_LOAD_I8(src + 1 >> 0 | 0) | 0);
   GROWABLE_HEAP_STORE_I8(dest + 2 >> 0 | 0, GROWABLE_HEAP_LOAD_I8(src + 2 >> 0 | 0) | 0);
   GROWABLE_HEAP_STORE_I8(dest + 3 >> 0 | 0, GROWABLE_HEAP_LOAD_I8(src + 3 >> 0 | 0) | 0);
   dest = dest + 4 | 0;
   src = src + 4 | 0;
  }
 }
 while ((dest | 0) < (dest_end | 0)) {
  GROWABLE_HEAP_STORE_I8(dest >> 0 | 0, GROWABLE_HEAP_LOAD_I8(src >> 0 | 0) | 0);
  dest = dest + 1 | 0;
  src = src + 1 | 0;
 }
 return ret | 0;
}
function _memset(ptr, value, num) {
 ptr = ptr | 0;
 value = value | 0;
 num = num | 0;
 var end = 0, aligned_end = 0, block_aligned_end = 0, value4 = 0;
 end = ptr + num | 0;
 value = value & 255;
 if ((num | 0) >= 67) {
  while ((ptr & 3) != 0) {
   GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
   ptr = ptr + 1 | 0;
  }
  aligned_end = end & -4 | 0;
  value4 = value | value << 8 | value << 16 | value << 24;
  block_aligned_end = aligned_end - 64 | 0;
  while ((ptr | 0) <= (block_aligned_end | 0)) {
   GROWABLE_HEAP_STORE_I32(ptr | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 8 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 12 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 16 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 20 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 24 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 28 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 32 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 36 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 40 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 44 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 48 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 52 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 56 | 0, value4);
   GROWABLE_HEAP_STORE_I32(ptr + 60 | 0, value4);
   ptr = ptr + 64 | 0;
  }
  while ((ptr | 0) < (aligned_end | 0)) {
   GROWABLE_HEAP_STORE_I32(ptr | 0, value4);
   ptr = ptr + 4 | 0;
  }
 }
 while ((ptr | 0) < (end | 0)) {
  GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
  ptr = ptr + 1 | 0;
 }
 return end - num | 0;
}
function _pthread_cleanup_push(routine, arg) {
 if (PThread.exitHandlers === null) {
  PThread.exitHandlers = [];
  if (!ENVIRONMENT_IS_PTHREAD) {
   __ATEXIT__.push((function() {
    PThread.runExitHandlers();
   }));
  }
 }
 PThread.exitHandlers.push((function() {
  dynCall_vi(routine, arg);
 }));
}
function __spawn_thread(threadParams) {
 if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _spawn_thread() can only ever be called from main application thread!";
 var worker = PThread.getNewWorker();
 if (worker.pthread !== undefined) throw "Internal error!";
 if (!threadParams.pthread_ptr) throw "Internal error, no pthread ptr!";
 PThread.runningWorkers.push(worker);
 var tlsMemory = _malloc(128 * 4);
 for (var i = 0; i < 128; ++i) {
  GROWABLE_HEAP_STORE_I32(tlsMemory + i * 4 | 0, 0);
 }
 var stackHigh = threadParams.stackBase + threadParams.stackSize;
 var pthread = PThread.pthreads[threadParams.pthread_ptr] = {
  worker: worker,
  stackBase: threadParams.stackBase,
  stackSize: threadParams.stackSize,
  allocatedOwnStack: threadParams.allocatedOwnStack,
  thread: threadParams.pthread_ptr,
  threadInfoStruct: threadParams.pthread_ptr
 };
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 0 >> 2, 0);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 4 >> 2, 0);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 20 >> 2, 0);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 80 >> 2, threadParams.detached);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 116 >> 2, tlsMemory);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 60 >> 2, 0);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 52 >> 2, pthread.threadInfoStruct);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 56 >> 2, PROCINFO.pid);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 >> 2, threadParams.stackSize);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 96 >> 2, threadParams.stackSize);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 92 >> 2, stackHigh);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 8 >> 2, stackHigh);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 12 >> 2, threadParams.detached);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 20 >> 2, threadParams.schedPolicy);
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 24 >> 2, threadParams.schedPrio);
 var global_libc = _emscripten_get_global_libc();
 var global_locale = global_libc + 40;
 Atomics.store(HEAPU32, pthread.threadInfoStruct + 188 >> 2, global_locale);
 worker.pthread = pthread;
 var msg = {
  "cmd": "run",
  "start_routine": threadParams.startRoutine,
  "arg": threadParams.arg,
  "threadInfoStruct": threadParams.pthread_ptr,
  "selfThreadId": threadParams.pthread_ptr,
  "parentThreadId": threadParams.parent_pthread_ptr,
  "stackBase": threadParams.stackBase,
  "stackSize": threadParams.stackSize
 };
 worker.runPthread = (function() {
  msg.time = performance.now();
  worker.postMessage(msg, threadParams.transferList);
 });
 if (worker.loaded) {
  worker.runPthread();
  delete worker.runPthread;
 }
}
function _pthread_getschedparam(thread, policy, schedparam) {
 if (!policy && !schedparam) return ERRNO_CODES.EINVAL;
 if (!thread) {
  err("pthread_getschedparam called with a null thread pointer!");
  return ERRNO_CODES.ESRCH;
 }
 var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
 if (self !== thread) {
  err("pthread_getschedparam attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
  return ERRNO_CODES.ESRCH;
 }
 var schedPolicy = Atomics.load(HEAPU32, thread + 120 + 20 >> 2);
 var schedPrio = Atomics.load(HEAPU32, thread + 120 + 24 >> 2);
 if (policy) GROWABLE_HEAP_STORE_I32(policy | 0, schedPolicy);
 if (schedparam) GROWABLE_HEAP_STORE_I32(schedparam | 0, schedPrio);
 return 0;
}
function _pthread_self() {
 return __pthread_ptr | 0;
}
Module["_pthread_self"] = _pthread_self;
function _pthread_create(pthread_ptr, attr, start_routine, arg) {
 if (typeof SharedArrayBuffer === "undefined") {
  err("Current environment does not support SharedArrayBuffer, pthreads are not available!");
  return 6;
 }
 if (!pthread_ptr) {
  err("pthread_create called with a null thread pointer!");
  return 28;
 }
 var transferList = [];
 var error = 0;
 if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
  return _emscripten_sync_run_in_main_thread_4(687865856, pthread_ptr, attr, start_routine, arg);
 }
 if (error) return error;
 var stackSize = 0;
 var stackBase = 0;
 var detached = 0;
 var schedPolicy = 0;
 var schedPrio = 0;
 if (attr) {
  stackSize = GROWABLE_HEAP_LOAD_I32(attr | 0);
  stackSize += 81920;
  stackBase = GROWABLE_HEAP_LOAD_I32(attr + 8 | 0);
  detached = GROWABLE_HEAP_LOAD_I32(attr + 12 | 0) !== 0;
  var inheritSched = GROWABLE_HEAP_LOAD_I32(attr + 16 | 0) === 0;
  if (inheritSched) {
   var prevSchedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
   var prevSchedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
   var parentThreadPtr = PThread.currentProxiedOperationCallerThread ? PThread.currentProxiedOperationCallerThread : _pthread_self();
   _pthread_getschedparam(parentThreadPtr, attr + 20, attr + 24);
   schedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
   schedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
   GROWABLE_HEAP_STORE_I32(attr + 20 | 0, prevSchedPolicy);
   GROWABLE_HEAP_STORE_I32(attr + 24 | 0, prevSchedPrio);
  } else {
   schedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
   schedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
  }
 } else {
  stackSize = 2097152;
 }
 var allocatedOwnStack = stackBase == 0;
 if (allocatedOwnStack) {
  stackBase = _memalign(16, stackSize);
 } else {
  stackBase -= stackSize;
  assert(stackBase > 0);
 }
 var threadInfoStruct = _malloc(244);
 for (var i = 0; i < 244 >> 2; ++i) GROWABLE_HEAP_STORE_I32(((threadInfoStruct >> 2) + i) * 4 | 0, 0);
 GROWABLE_HEAP_STORE_I32(pthread_ptr | 0, threadInfoStruct);
 GROWABLE_HEAP_STORE_I32(threadInfoStruct + 24 | 0, threadInfoStruct);
 var headPtr = threadInfoStruct + 168;
 GROWABLE_HEAP_STORE_I32(headPtr | 0, headPtr);
 var threadParams = {
  stackBase: stackBase,
  stackSize: stackSize,
  allocatedOwnStack: allocatedOwnStack,
  schedPolicy: schedPolicy,
  schedPrio: schedPrio,
  detached: detached,
  startRoutine: start_routine,
  pthread_ptr: threadInfoStruct,
  parent_pthread_ptr: _pthread_self(),
  arg: arg,
  transferList: transferList
 };
 if (ENVIRONMENT_IS_PTHREAD) {
  threadParams.cmd = "spawnThread";
  postMessage(threadParams, transferList);
 } else {
  __spawn_thread(threadParams);
 }
 return 0;
}
function __pthread_testcancel_js() {
 if (!ENVIRONMENT_IS_PTHREAD) return;
 if (!threadInfoStruct) return;
 var cancelDisabled = Atomics.load(HEAPU32, threadInfoStruct + 72 >> 2);
 if (cancelDisabled) return;
 var canceled = Atomics.load(HEAPU32, threadInfoStruct + 0 >> 2);
 if (canceled == 2) throw "Canceled!";
}
function _pthread_join(thread, status) {
 if (!thread) {
  err("pthread_join attempted on a null thread pointer!");
  return ERRNO_CODES.ESRCH;
 }
 if (ENVIRONMENT_IS_PTHREAD && selfThreadId == thread) {
  err("PThread " + thread + " is attempting to join to itself!");
  return ERRNO_CODES.EDEADLK;
 } else if (!ENVIRONMENT_IS_PTHREAD && PThread.mainThreadBlock == thread) {
  err("Main thread " + thread + " is attempting to join to itself!");
  return ERRNO_CODES.EDEADLK;
 }
 var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
 if (self !== thread) {
  err("pthread_join attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
  return ERRNO_CODES.ESRCH;
 }
 var detached = Atomics.load(HEAPU32, thread + 80 >> 2);
 if (detached) {
  err("Attempted to join thread " + thread + ", which was already detached!");
  return ERRNO_CODES.EINVAL;
 }
 for (;;) {
  var threadStatus = Atomics.load(HEAPU32, thread + 0 >> 2);
  if (threadStatus == 1) {
   var threadExitCode = Atomics.load(HEAPU32, thread + 4 >> 2);
   if (status) GROWABLE_HEAP_STORE_I32(status | 0, threadExitCode);
   Atomics.store(HEAPU32, thread + 80 >> 2, 1);
   if (!ENVIRONMENT_IS_PTHREAD) __cleanup_thread(thread); else postMessage({
    "cmd": "cleanupThread",
    "thread": thread
   });
   return 0;
  }
  __pthread_testcancel_js();
  if (!ENVIRONMENT_IS_PTHREAD) _emscripten_main_thread_process_queued_calls();
  _emscripten_futex_wait(thread + 0, threadStatus, ENVIRONMENT_IS_PTHREAD ? 100 : 1);
 }
}
function _setTempRet0($i) {
 setTempRet0($i | 0);
}
if (!ENVIRONMENT_IS_PTHREAD) PThread.initMainThreadBlock(); else PThread.initWorker();
if (ENVIRONMENT_IS_NODE) {
 _emscripten_get_now = function _emscripten_get_now_actual() {
  var t = process["hrtime"]();
  return t[0] * 1e3 + t[1] / 1e6;
 };
} else if (ENVIRONMENT_IS_PTHREAD) {
 _emscripten_get_now = (function() {
  return performance["now"]() - __performance_now_clock_drift;
 });
} else if (typeof dateNow !== "undefined") {
 _emscripten_get_now = dateNow;
} else if (typeof performance === "object" && performance && typeof performance["now"] === "function") {
 _emscripten_get_now = (function() {
  return performance["now"]();
 });
} else {
 _emscripten_get_now = Date.now;
}
var GLctx;
GL.init();
FS.staticInit();
Module["FS_createFolder"] = FS.createFolder;
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createLink"] = FS.createLink;
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;
if (ENVIRONMENT_HAS_NODE) {
 var fs = require("fs");
 var NODEJS_PATH = require("path");
 NODEFS.staticInit();
}
var proxiedFunctionTable = [ null, _emscripten_set_canvas_element_size_main_thread, _fd_close, _fd_seek, _fd_write ];
var ASSERTIONS = true;
function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}
function intArrayToString(array) {
 var ret = [];
 for (var i = 0; i < array.length; i++) {
  var chr = array[i];
  if (chr > 255) {
   if (ASSERTIONS) {
    assert(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
   }
   chr &= 255;
  }
  ret.push(String.fromCharCode(chr));
 }
 return ret.join("");
}
var asmGlobalArg = {};
var asmLibraryArg = {
 "__assert_fail": ___assert_fail,
 "__call_main": ___call_main,
 "__clock_gettime": ___clock_gettime,
 "__lock": ___lock,
 "__unlock": ___unlock,
 "clock": _clock,
 "emscripten_asm_const_iii": _emscripten_asm_const_iii,
 "emscripten_conditional_set_current_thread_status": _emscripten_conditional_set_current_thread_status,
 "emscripten_futex_wait": _emscripten_futex_wait,
 "emscripten_futex_wake": _emscripten_futex_wake,
 "emscripten_get_now": _emscripten_get_now,
 "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr,
 "emscripten_has_threading_support": _emscripten_has_threading_support,
 "emscripten_is_main_browser_thread": _emscripten_is_main_browser_thread,
 "emscripten_memcpy_big": _emscripten_memcpy_big,
 "emscripten_receive_on_main_thread_js": _emscripten_receive_on_main_thread_js,
 "emscripten_resize_heap": _emscripten_resize_heap,
 "emscripten_set_canvas_element_size": _emscripten_set_canvas_element_size,
 "emscripten_set_current_thread_status": _emscripten_set_current_thread_status,
 "emscripten_set_thread_name": _emscripten_set_thread_name,
 "emscripten_syscall": _emscripten_syscall,
 "emscripten_webgl_create_context": _emscripten_webgl_create_context,
 "fd_close": _fd_close,
 "fd_seek": _fd_seek,
 "fd_write": _fd_write,
 "initPthreadsJS": initPthreadsJS,
 "memory": wasmMemory,
 "pthread_cleanup_push": _pthread_cleanup_push,
 "pthread_create": _pthread_create,
 "pthread_join": _pthread_join,
 "pthread_self": _pthread_self,
 "setTempRet0": _setTempRet0,
 "table": wasmTable
};
var asm = createWasm();
var real____wasm_call_ctors = asm["__wasm_call_ctors"];
asm["__wasm_call_ctors"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____wasm_call_ctors.apply(null, arguments);
});
var real__malloc = asm["malloc"];
asm["malloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__malloc.apply(null, arguments);
});
var real__primes_count_approx = asm["primes_count_approx"];
asm["primes_count_approx"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__primes_count_approx.apply(null, arguments);
});
var real__primes_sequentiel = asm["primes_sequentiel"];
asm["primes_sequentiel"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__primes_sequentiel.apply(null, arguments);
});
var real__free = asm["free"];
asm["free"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__free.apply(null, arguments);
});
var real__primes_parallel = asm["primes_parallel"];
asm["primes_parallel"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__primes_parallel.apply(null, arguments);
});
var real__collats_sequence = asm["collats_sequence"];
asm["collats_sequence"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__collats_sequence.apply(null, arguments);
});
var real__fibonachi = asm["fibonachi"];
asm["fibonachi"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__fibonachi.apply(null, arguments);
});
var real____errno_location = asm["__errno_location"];
asm["__errno_location"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____errno_location.apply(null, arguments);
});
var real__emscripten_get_global_libc = asm["emscripten_get_global_libc"];
asm["emscripten_get_global_libc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_get_global_libc.apply(null, arguments);
});
var real____emscripten_pthread_data_constructor = asm["__emscripten_pthread_data_constructor"];
asm["__emscripten_pthread_data_constructor"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____emscripten_pthread_data_constructor.apply(null, arguments);
});
var real__fflush = asm["fflush"];
asm["fflush"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__fflush.apply(null, arguments);
});
var real__setThrew = asm["setThrew"];
asm["setThrew"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__setThrew.apply(null, arguments);
});
var real__memalign = asm["memalign"];
asm["memalign"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__memalign.apply(null, arguments);
});
var real____pthread_tsd_run_dtors = asm["__pthread_tsd_run_dtors"];
asm["__pthread_tsd_run_dtors"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____pthread_tsd_run_dtors.apply(null, arguments);
});
var real__emscripten_main_thread_process_queued_calls = asm["emscripten_main_thread_process_queued_calls"];
asm["emscripten_main_thread_process_queued_calls"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_main_thread_process_queued_calls.apply(null, arguments);
});
var real__emscripten_current_thread_process_queued_calls = asm["emscripten_current_thread_process_queued_calls"];
asm["emscripten_current_thread_process_queued_calls"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_current_thread_process_queued_calls.apply(null, arguments);
});
var real__emscripten_register_main_browser_thread_id = asm["emscripten_register_main_browser_thread_id"];
asm["emscripten_register_main_browser_thread_id"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_register_main_browser_thread_id.apply(null, arguments);
});
var real__emscripten_main_browser_thread_id = asm["emscripten_main_browser_thread_id"];
asm["emscripten_main_browser_thread_id"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_main_browser_thread_id.apply(null, arguments);
});
var real__emscripten_async_run_in_main_thread = asm["emscripten_async_run_in_main_thread"];
asm["emscripten_async_run_in_main_thread"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_async_run_in_main_thread.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread = asm["emscripten_sync_run_in_main_thread"];
asm["emscripten_sync_run_in_main_thread"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_0 = asm["emscripten_sync_run_in_main_thread_0"];
asm["emscripten_sync_run_in_main_thread_0"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_0.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_1 = asm["emscripten_sync_run_in_main_thread_1"];
asm["emscripten_sync_run_in_main_thread_1"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_1.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_2 = asm["emscripten_sync_run_in_main_thread_2"];
asm["emscripten_sync_run_in_main_thread_2"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_2.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_xprintf_varargs = asm["emscripten_sync_run_in_main_thread_xprintf_varargs"];
asm["emscripten_sync_run_in_main_thread_xprintf_varargs"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_xprintf_varargs.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_3 = asm["emscripten_sync_run_in_main_thread_3"];
asm["emscripten_sync_run_in_main_thread_3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_3.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_4 = asm["emscripten_sync_run_in_main_thread_4"];
asm["emscripten_sync_run_in_main_thread_4"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_4.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_5 = asm["emscripten_sync_run_in_main_thread_5"];
asm["emscripten_sync_run_in_main_thread_5"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_5.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_6 = asm["emscripten_sync_run_in_main_thread_6"];
asm["emscripten_sync_run_in_main_thread_6"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_6.apply(null, arguments);
});
var real__emscripten_sync_run_in_main_thread_7 = asm["emscripten_sync_run_in_main_thread_7"];
asm["emscripten_sync_run_in_main_thread_7"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_7.apply(null, arguments);
});
var real__emscripten_run_in_main_runtime_thread_js = asm["emscripten_run_in_main_runtime_thread_js"];
asm["emscripten_run_in_main_runtime_thread_js"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_run_in_main_runtime_thread_js.apply(null, arguments);
});
var real__emscripten_async_queue_on_thread_ = asm["emscripten_async_queue_on_thread_"];
asm["emscripten_async_queue_on_thread_"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_async_queue_on_thread_.apply(null, arguments);
});
var real__proxy_main = asm["proxy_main"];
asm["proxy_main"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__proxy_main.apply(null, arguments);
});
var real__emscripten_tls_init = asm["emscripten_tls_init"];
asm["emscripten_tls_init"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_tls_init.apply(null, arguments);
});
var real_stackSave = asm["stackSave"];
asm["stackSave"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackSave.apply(null, arguments);
});
var real_stackAlloc = asm["stackAlloc"];
asm["stackAlloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackAlloc.apply(null, arguments);
});
var real_stackRestore = asm["stackRestore"];
asm["stackRestore"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackRestore.apply(null, arguments);
});
var real___growWasmMemory = asm["__growWasmMemory"];
asm["__growWasmMemory"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___growWasmMemory.apply(null, arguments);
});
var real_dynCall_ii = asm["dynCall_ii"];
asm["dynCall_ii"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_ii.apply(null, arguments);
});
var real_dynCall_iiii = asm["dynCall_iiii"];
asm["dynCall_iiii"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiii.apply(null, arguments);
});
var real_dynCall_jiji = asm["dynCall_jiji"];
asm["dynCall_jiji"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_jiji.apply(null, arguments);
});
var real_dynCall_iidiiii = asm["dynCall_iidiiii"];
asm["dynCall_iidiiii"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iidiiii.apply(null, arguments);
});
var real_dynCall_vii = asm["dynCall_vii"];
asm["dynCall_vii"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_vii.apply(null, arguments);
});
var real_dynCall_vi = asm["dynCall_vi"];
asm["dynCall_vi"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_vi.apply(null, arguments);
});
Module["asm"] = asm;
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["__wasm_call_ctors"].apply(null, arguments);
});
var _malloc = Module["_malloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["malloc"].apply(null, arguments);
});
var _primes_count_approx = Module["_primes_count_approx"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["primes_count_approx"].apply(null, arguments);
});
var _primes_sequentiel = Module["_primes_sequentiel"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["primes_sequentiel"].apply(null, arguments);
});
var _free = Module["_free"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["free"].apply(null, arguments);
});
var _primes_parallel = Module["_primes_parallel"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["primes_parallel"].apply(null, arguments);
});
var _collats_sequence = Module["_collats_sequence"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["collats_sequence"].apply(null, arguments);
});
var _fibonachi = Module["_fibonachi"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["fibonachi"].apply(null, arguments);
});
var ___errno_location = Module["___errno_location"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["__errno_location"].apply(null, arguments);
});
var _emscripten_get_global_libc = Module["_emscripten_get_global_libc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_get_global_libc"].apply(null, arguments);
});
var ___emscripten_pthread_data_constructor = Module["___emscripten_pthread_data_constructor"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["__emscripten_pthread_data_constructor"].apply(null, arguments);
});
var _fflush = Module["_fflush"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["fflush"].apply(null, arguments);
});
var _setThrew = Module["_setThrew"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["setThrew"].apply(null, arguments);
});
var _memalign = Module["_memalign"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["memalign"].apply(null, arguments);
});
var ___pthread_tsd_run_dtors = Module["___pthread_tsd_run_dtors"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["__pthread_tsd_run_dtors"].apply(null, arguments);
});
var _emscripten_main_thread_process_queued_calls = Module["_emscripten_main_thread_process_queued_calls"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_main_thread_process_queued_calls"].apply(null, arguments);
});
var _emscripten_current_thread_process_queued_calls = Module["_emscripten_current_thread_process_queued_calls"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_current_thread_process_queued_calls"].apply(null, arguments);
});
var _emscripten_register_main_browser_thread_id = Module["_emscripten_register_main_browser_thread_id"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_register_main_browser_thread_id"].apply(null, arguments);
});
var _emscripten_main_browser_thread_id = Module["_emscripten_main_browser_thread_id"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_main_browser_thread_id"].apply(null, arguments);
});
var _emscripten_async_run_in_main_thread = Module["_emscripten_async_run_in_main_thread"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_async_run_in_main_thread"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread = Module["_emscripten_sync_run_in_main_thread"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_0 = Module["_emscripten_sync_run_in_main_thread_0"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_0"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_1 = Module["_emscripten_sync_run_in_main_thread_1"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_1"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_2 = Module["_emscripten_sync_run_in_main_thread_2"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_2"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_xprintf_varargs = Module["_emscripten_sync_run_in_main_thread_xprintf_varargs"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_xprintf_varargs"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_3 = Module["_emscripten_sync_run_in_main_thread_3"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_3"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_4 = Module["_emscripten_sync_run_in_main_thread_4"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_4"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_5 = Module["_emscripten_sync_run_in_main_thread_5"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_5"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_6 = Module["_emscripten_sync_run_in_main_thread_6"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_6"].apply(null, arguments);
});
var _emscripten_sync_run_in_main_thread_7 = Module["_emscripten_sync_run_in_main_thread_7"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_sync_run_in_main_thread_7"].apply(null, arguments);
});
var _emscripten_run_in_main_runtime_thread_js = Module["_emscripten_run_in_main_runtime_thread_js"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_run_in_main_runtime_thread_js"].apply(null, arguments);
});
var _emscripten_async_queue_on_thread_ = Module["_emscripten_async_queue_on_thread_"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_async_queue_on_thread_"].apply(null, arguments);
});
var _proxy_main = Module["_proxy_main"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["proxy_main"].apply(null, arguments);
});
var _emscripten_tls_init = Module["_emscripten_tls_init"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["emscripten_tls_init"].apply(null, arguments);
});
var stackSave = Module["stackSave"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["stackSave"].apply(null, arguments);
});
var stackAlloc = Module["stackAlloc"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["stackAlloc"].apply(null, arguments);
});
var stackRestore = Module["stackRestore"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["stackRestore"].apply(null, arguments);
});
var __growWasmMemory = Module["__growWasmMemory"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["__growWasmMemory"].apply(null, arguments);
});
var dynCall_ii = Module["dynCall_ii"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["dynCall_ii"].apply(null, arguments);
});
var dynCall_iiii = Module["dynCall_iiii"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["dynCall_iiii"].apply(null, arguments);
});
var dynCall_jiji = Module["dynCall_jiji"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["dynCall_jiji"].apply(null, arguments);
});
var dynCall_iidiiii = Module["dynCall_iidiiii"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["dynCall_iidiiii"].apply(null, arguments);
});
var dynCall_vii = Module["dynCall_vii"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["dynCall_vii"].apply(null, arguments);
});
var dynCall_vi = Module["dynCall_vi"] = (function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["dynCall_vi"].apply(null, arguments);
});
Module["asm"] = asm;
if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromString")) Module["intArrayFromString"] = (function() {
 abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "intArrayToString")) Module["intArrayToString"] = (function() {
 abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;
Module["setValue"] = setValue;
Module["getValue"] = getValue;
if (!Object.getOwnPropertyDescriptor(Module, "allocate")) Module["allocate"] = (function() {
 abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["getMemory"] = getMemory;
if (!Object.getOwnPropertyDescriptor(Module, "AsciiToString")) Module["AsciiToString"] = (function() {
 abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii")) Module["stringToAscii"] = (function() {
 abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString")) Module["UTF8ArrayToString"] = (function() {
 abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ToString")) Module["UTF8ToString"] = (function() {
 abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array")) Module["stringToUTF8Array"] = (function() {
 abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8")) Module["stringToUTF8"] = (function() {
 abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8")) Module["lengthBytesUTF8"] = (function() {
 abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "UTF16ToString")) Module["UTF16ToString"] = (function() {
 abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF16")) Module["stringToUTF16"] = (function() {
 abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16")) Module["lengthBytesUTF16"] = (function() {
 abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "UTF32ToString")) Module["UTF32ToString"] = (function() {
 abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF32")) Module["stringToUTF32"] = (function() {
 abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32")) Module["lengthBytesUTF32"] = (function() {
 abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8")) Module["allocateUTF8"] = (function() {
 abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = (function() {
 abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun")) Module["addOnPreRun"] = (function() {
 abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "addOnInit")) Module["addOnInit"] = (function() {
 abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain")) Module["addOnPreMain"] = (function() {
 abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["addOnExit"] = addOnExit;
if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun")) Module["addOnPostRun"] = (function() {
 abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "writeStringToMemory")) Module["writeStringToMemory"] = (function() {
 abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory")) Module["writeArrayToMemory"] = (function() {
 abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory")) Module["writeAsciiToMemory"] = (function() {
 abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
if (!Object.getOwnPropertyDescriptor(Module, "ENV")) Module["ENV"] = (function() {
 abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "FS")) Module["FS"] = (function() {
 abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["FS_createFolder"] = FS.createFolder;
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createLink"] = FS.createLink;
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;
if (!Object.getOwnPropertyDescriptor(Module, "GL")) Module["GL"] = (function() {
 abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "dynamicAlloc")) Module["dynamicAlloc"] = (function() {
 abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "loadDynamicLibrary")) Module["loadDynamicLibrary"] = (function() {
 abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "loadWebAssemblyModule")) Module["loadWebAssemblyModule"] = (function() {
 abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "getLEB")) Module["getLEB"] = (function() {
 abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables")) Module["getFunctionTables"] = (function() {
 abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables")) Module["alignFunctionTables"] = (function() {
 abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions")) Module["registerFunctions"] = (function() {
 abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "addFunction")) Module["addFunction"] = (function() {
 abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "removeFunction")) Module["removeFunction"] = (function() {
 abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = (function() {
 abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint")) Module["prettyPrint"] = (function() {
 abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "makeBigInt")) Module["makeBigInt"] = (function() {
 abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = (function() {
 abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting")) Module["getCompilerSetting"] = (function() {
 abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stackSave")) Module["stackSave"] = (function() {
 abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stackRestore")) Module["stackRestore"] = (function() {
 abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc")) Module["stackAlloc"] = (function() {
 abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["establishStackSpace"] = establishStackSpace;
if (!Object.getOwnPropertyDescriptor(Module, "print")) Module["print"] = (function() {
 abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "printErr")) Module["printErr"] = (function() {
 abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0")) Module["getTempRet0"] = (function() {
 abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0")) Module["setTempRet0"] = (function() {
 abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "callMain")) Module["callMain"] = (function() {
 abort("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "abort")) Module["abort"] = (function() {
 abort("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "Pointer_stringify")) Module["Pointer_stringify"] = (function() {
 abort("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
if (!Object.getOwnPropertyDescriptor(Module, "warnOnce")) Module["warnOnce"] = (function() {
 abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Module["writeStackCookie"] = writeStackCookie;
Module["checkStackCookie"] = checkStackCookie;
Module["abortStackOverflow"] = abortStackOverflow;
Module["PThread"] = PThread;
Module["ExitStatus"] = ExitStatus;
Module["tempDoublePtr"] = tempDoublePtr;
Module["wasmMemory"] = wasmMemory;
Module["_pthread_self"] = _pthread_self;
Module["ExitStatus"] = ExitStatus;
Module["tempDoublePtr"] = tempDoublePtr;
Module["dynCall_ii"] = dynCall_ii;
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL")) Object.defineProperty(Module, "ALLOC_NORMAL", {
 configurable: true,
 get: (function() {
  abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 })
});
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK")) Object.defineProperty(Module, "ALLOC_STACK", {
 configurable: true,
 get: (function() {
  abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 })
});
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_DYNAMIC")) Object.defineProperty(Module, "ALLOC_DYNAMIC", {
 configurable: true,
 get: (function() {
  abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 })
});
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NONE")) Object.defineProperty(Module, "ALLOC_NONE", {
 configurable: true,
 get: (function() {
  abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 })
});
Module["calledRun"] = calledRun;
var calledRun;
function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}
var calledMain = false;
dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};
function run(args) {
 args = args || arguments_;
 if (runDependencies > 0) {
  return;
 }
 writeStackCookie();
 preRun();
 if (runDependencies > 0) return;
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout((function() {
   setTimeout((function() {
    Module["setStatus"]("");
   }), 1);
   doRun();
  }), 1);
 } else {
  doRun();
 }
 checkStackCookie();
}
Module["run"] = run;
function checkUnflushedContent() {
 var print = out;
 var printErr = err;
 var has = false;
 out = err = (function(x) {
  has = true;
 });
 try {
  var flush = Module["_fflush"];
  if (flush) flush(0);
  [ "stdout", "stderr" ].forEach((function(name) {
   var info = FS.analyzePath("/dev/" + name);
   if (!info) return;
   var stream = info.object;
   var rdev = stream.rdev;
   var tty = TTY.ttys[rdev];
   if (tty && tty.output && tty.output.length) {
    has = true;
   }
  }));
 } catch (e) {}
 out = print;
 err = printErr;
 if (has) {
  warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.");
 }
}
function exit(status, implicit) {
 checkUnflushedContent();
 if (implicit && noExitRuntime && status === 0) {
  return;
 }
 if (noExitRuntime) {
  if (!implicit) {
   err("program exited (with status: " + status + "), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)");
  }
 } else {
  PThread.terminateAllThreads();
  ABORT = true;
  EXITSTATUS = status;
  exitRuntime();
  if (Module["onExit"]) Module["onExit"](status);
 }
 quit_(status, new ExitStatus(status));
}
if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}
if (!ENVIRONMENT_IS_PTHREAD) noExitRuntime = true;
if (!ENVIRONMENT_IS_PTHREAD) run();
if (typeof window === "object" && (typeof ENVIRONMENT_IS_PTHREAD === "undefined" || !ENVIRONMENT_IS_PTHREAD)) {
 function emrun_register_handlers() {
  var emrun_num_post_messages_in_flight = 0;
  var emrun_should_close_itself = false;
  function postExit(msg) {
   var http = new XMLHttpRequest;
   http.open("POST", "stdio.html", false);
   http.send(msg);
   try {
    window.close();
   } catch (e) {}
  }
  function post(msg) {
   var http = new XMLHttpRequest;
   ++emrun_num_post_messages_in_flight;
   http.onreadystatechange = (function() {
    if (http.readyState == 4) {
     if (--emrun_num_post_messages_in_flight == 0 && emrun_should_close_itself) postExit("^exit^" + EXITSTATUS);
    }
   });
   http.open("POST", "stdio.html", true);
   http.send(msg);
  }
  if (document.URL.search("localhost") != -1 || document.URL.search(":6931/") != -1) {
   var emrun_http_sequence_number = 1;
   var prevPrint = out;
   var prevErr = err;
   function emrun_exit() {
    if (emrun_num_post_messages_in_flight == 0) postExit("^exit^" + EXITSTATUS); else emrun_should_close_itself = true;
   }
   Module["addOnExit"](emrun_exit);
   out = function emrun_print(text) {
    post("^out^" + emrun_http_sequence_number++ + "^" + encodeURIComponent(text));
    prevPrint(text);
   };
   err = function emrun_printErr(text) {
    post("^err^" + emrun_http_sequence_number++ + "^" + encodeURIComponent(text));
    prevErr(text);
   };
   function tryToSendPageload() {
    try {
     post("^pageload^");
    } catch (e) {
     setTimeout(tryToSendPageload, 50);
    }
   }
   tryToSendPageload();
  }
 }
 function emrun_file_dump(filename, data) {
  var http = new XMLHttpRequest;
  out('Dumping out file "' + filename + '" with ' + data.length + " bytes of data.");
  http.open("POST", "stdio.html?file=" + filename, true);
  http.send(data);
 }
 if (typeof Module !== "undefined" && typeof document !== "undefined") emrun_register_handlers();
}



