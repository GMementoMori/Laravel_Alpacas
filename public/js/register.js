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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/register.js":
/*!**********************************!*\
  !*** ./resources/js/register.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
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
  $('.button.login').click(function () {
    var _token = $('meta[name="csrf-token"]').attr('content');

    var username = $('#name').val();
    var pass = $('#pass').val();
    var htmlErrors;
    htmlErrors = '<div class="alert alert-danger alert-dismissible fade show" style="z-index:1;">';
    htmlErrors += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    htmlErrors += '<ul id="danger-list">';
    htmlErrors += '</ul>';
    htmlErrors += '</div>';
    $.ajax({
      type: "POST",
      url: "/login",
      data: {
        name: username,
        pass: pass,
        _token: _token
      },
      success: function success(response) {
        if (!response['error']) {
          window.location.href = response['link'];
        } else {
          $('#div-errors').removeClass('d-none');
          $('#div-errors').html(htmlErrors);
          $('#danger-list').append('<li><strong></strong> ' + response['error'] + '</li>');
        }
      },
      error: function error(xhr) {
        $('#div-errors').removeClass('d-none');
        $('#div-errors').html(htmlErrors);
        $.each(xhr.responseJSON.errors, function (key, value) {
          $('#danger-list').append('<li><strong>Danger!</strong> ' + value + '</li>');
        });
      }
    });
  });
  $('.button.register').click(function () {
    var _token = $('meta[name="csrf-token"]').attr('content');

    var username = $('#regname').val();
    var email = $('#regemail').val();
    var pass = $('#regpass').val();
    $.ajax({
      type: "POST",
      url: "/register",
      data: {
        name: username,
        email: email,
        pass: pass,
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
  }); // $(".button").click(function(e) {
  //     var pX = e.pageX,
  //         pY = e.pageY,
  //         oX = parseInt($(this).offset().left),
  //         oY = parseInt($(this).offset().top);
  //
  //     $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
  //     $('.x-' + oX + '.y-' + oY + '').animate({
  //         "width": "500px",
  //         "height": "500px",
  //         "top": "-250px",
  //         "left": "-250px",
  //
  //     }, 600);
  //     $("button", this).addClass('active');
  // })

  $(".alt-2").click(function () {
    if (!$(this).hasClass('material-button')) {
      $(".shape").css({
        "width": "100%",
        "height": "100%",
        "transform": "rotate(0deg)"
      });
      setTimeout(function () {
        $(".overbox").css({
          "overflow": "initial"
        });
      }, 600);
      $(this).animate({
        "width": "140px",
        "height": "140px"
      }, 500, function () {
        $(".box").removeClass("back");
        $(this).removeClass('active');
      });
      $(".overbox .title").fadeOut(300);
      $(".overbox .input").fadeOut(300);
      $(".overbox .button").fadeOut(300);
      $(".alt-2").addClass('material-buton');
    }
  });
  $(".material-button").click(function () {
    if ($(this).hasClass('material-button')) {
      setTimeout(function () {
        $(".overbox").css({
          "overflow": "hidden"
        });
        $(".box").addClass("back");
      }, 200);
      $(this).addClass('active').animate({
        "width": "700px",
        "height": "700px"
      });
      setTimeout(function () {
        $(".shape").css({
          "width": "50%",
          "height": "50%",
          "transform": "rotate(45deg)"
        });
        $(".overbox .title").fadeIn(300);
        $(".overbox .input").fadeIn(300);
        $(".overbox .button").fadeIn(300);
      }, 700);
      $(this).removeClass('material-button');
    }

    if ($(".alt-2").hasClass('material-buton')) {
      $(".alt-2").removeClass('material-buton');
      $(".alt-2").addClass('material-button');
    }
  });
});

/***/ }),

/***/ 1:
/*!****************************************!*\
  !*** multi ./resources/js/register.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/olehkhramtsov/Web/Laravel/tamagochi/resources/js/register.js */"./resources/js/register.js");


/***/ })

/******/ });