

var template = require("../templates/sidebar");
var jquery = require("jquery");
var lodash = require("lodash");

function sidebar(deferredLoading) {

  function bindEvents() {
    this.element.bind("click", function (event) {
      var target = jquery(event.target);
      target.parent(".sidebar").toggleClass("pullLeft");
    });
    jquery(window).resize(lodash.debounce(function onResize(event) {
      resizeHandler(event);
    }, 200));
  }
  function resizeHandler(e) {
    if(this.outerHeight > window.outerHeight) {
      return;
    }
    this.element.find("#commentsholder").empty();
    loadComments(this.url);
  }

  function attach(element, url) {
    var el = element || "body";
    jquery(el).append(template);
    this.element = jquery(el).find(".sidebar");
    this.url = url || window.location;
    bindEvents();
    loadComments(url);
    this.outerHeight = window.outerHeight;
  }

  function loadComments(url) {
    var sidebarWidth = parseInt(jquery("body").css("width") || 0, 10);
    gapi.comments.render("commentsholder", {
      href: url || window.location,
      width: Math.round((sidebarWidth * (1/2)).toString()),
      first_party_property: 'BLOGGER',
      view_type: 'FILTERED_POSTMOD'
    });
  }

  if (!deferredLoading) {
      var angular = angular || null;
      if (angular && angular.element) {
        angular.element(document).ready(function() {
          attach();
        }.bind(this))
      } else {
        jquery(document).ready(function() {
          attach();
        }.bind(this));
      }
  }
  return {
    attach: attach,
    loadComments: loadComments
  };
}
module.exports = sidebar();
