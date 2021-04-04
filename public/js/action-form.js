/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/action-form.js":
/*!*************************************!*\
  !*** ./resources/js/action-form.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
  function rgb2hex(orig) {
    var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
  }

  function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;else if (r < 0) r = 0;
    var b = (num >> 8 & 0x00FF) + amt;
    if (b > 255) b = 255;else if (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
  }

  $(".input input").focus(function () {
    $(this).parent(".input").each(function () {
      $("label", this).css({
        "line-height": "18px",
        "font-size": "18px",
        "font-weight": "100",
        "top": "0px"
      });
      $(".spin", this).css({
        "width": "100%"
      });
    });
  }).blur(function () {
    $(".spin").css({
      "width": "0px"
    });

    if ($(this).val() == "") {
      $(this).parent(".input").each(function () {
        $("label", this).css({
          "line-height": "60px",
          "font-size": "24px",
          "font-weight": "300",
          "top": "10px"
        });
      });
    }
  });
  $(".color").click(function () {
    $(".color").each(function () {
      if ($(this).hasClass('select')) {
        $(this).removeClass('select');
      }
    });

    if ($(this).hasClass('select')) {
      $(this).removeClass('select');
    } else {
      $(this).addClass('select');
      var main = rgb2hex($(this).css('background-color'));
      var lColor = LightenDarkenColor(main, 50);
      var noseColor = LightenDarkenColor(main, 70);
      var dColor = LightenDarkenColor(main, -80);
      $("body").get(0).style.setProperty("--main", main);
      $("body").get(0).style.setProperty("--l-color", lColor);
      $("body").get(0).style.setProperty("--nose-color", noseColor);
      $("body").get(0).style.setProperty("--d-color", dColor);
    }
  });
  $(".gender-button").click(function () {
    $(".gender-button").each(function () {
      if ($(this).hasClass('select-gender')) {
        $(this).removeClass('select-gender').css({
          "border-color": "rgba(0, 0, 0, 0.1)",
          "color": "rgba(0, 0, 0, 0.1)"
        });
      }
    });

    if ($(this).hasClass('select-gender')) {
      $(this).removeClass('select-gender').css({
        "border-color": "rgba(0, 0, 0, 0.1)",
        "color": "rgba(0, 0, 0, 0.1)"
      });
    } else {
      $(this).addClass('select-gender').css({
        "border-color": "#ED2553",
        "color": "#ED2553"
      });
    }
  });
  $('#submit-create').click(function () {
    var _token = $('meta[name="csrf-token"]').attr('content');

    var name = $('#name').val();
    var gender = $('.select-gender').attr('data-gender');
    var color = $('.color.select').attr('data-color');
    $.ajax({
      type: "POST",
      url: "/alpaca-create",
      data: {
        name: name,
        gender: gender,
        color: color,
        _token: _token
      },
      success: function success(response) {
        window.location.href = response['link'];
      },
      error: function error(xhr) {
        $('.alert-danger.d-none').removeClass('d-none');
        $('#danger-list').html('');
        $.each(xhr.responseJSON.errors, function (key, value) {
          $('#danger-list').append('<li><strong>Danger!</strong> ' + value + '</li>');
        });
      }
    });
  });
});

/***/ }),

/***/ 5:
/*!*******************************************!*\
  !*** multi ./resources/js/action-form.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/olehkhramtsov/Web/Laravel/tamagochi/resources/js/action-form.js */"./resources/js/action-form.js");


/***/ })

/******/ });