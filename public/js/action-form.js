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
  for (action in actions) {
    $('.box-buttons').append('<div class="alpaca-actions">' + action + '</div>');
  }

  $(".active").click(function () {
    $(this).removeClass('active');
  });
  $(".alpaca-actions").click(function () {
    $('.list-current-variants').html('');

    if ($(this).hasClass('active')) {
      $(".alpaca-actions").each(function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        }
      });
      $('.list-current-variants').hide();
    } else {
      $(".alpaca-actions").each(function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        }
      });
      $(this).addClass('active');

      for (action in actions[$(this).text()]) {
        $('.list-current-variants').append('<div class="current-variants-actions" data-action-id="' + actions[$(this).text()][action][0] + '" data-type-action="' + $(this).text() + '">' + actions[$(this).text()][action][1] + '</div>');
      }

      $('.list-current-variants').show();
    }
  });
  $(document).on("click", ".current-variants-actions", function () {
    var _token = $('meta[name="csrf-token"]').attr('content');

    var typeAction = $(this).attr('data-type-action').toLowerCase();
    var idAction = $(this).attr('data-action-id');
    $.ajax({
      type: "POST",
      url: "/alpaca-actions",
      data: {
        action: typeAction,
        idAction: idAction,
        _token: _token
      },
      success: function success(response) {
        if (response['success']) {
          window.location.href = response['link'];
        }
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