

var template = require("../templates/sidebar");
var jquery = require("jquery");
var lodash = require("lodash");

function sidebar(deferredLoading) {
  if (!deferredLoading) {
      var angular = angular || null;
      if (angular && angular.element) {
        angular.element(document).ready(function() {
          this.attach();
        }.bind(this))
      } else {
        jquery(document).ready(function() {
          this.attach();
        }.bind(this));
      }
  }
  this.isKeyboard = false;
  lodash.bindAll(this);
  return this;
}

sidebar.prototype.bindEvents = function (){
  this.element.bind("click", function (event) {
    var target = jquery(event.target);
    target.parent(".sidebar").toggleClass("pullLeft");
  });
  jquery(window).resize(lodash.debounce(function onResize(event) {
    this.resizeHandler(event)
  }.bind(this), 200));
}

sidebar.prototype.resizeHandler = function(e) {
  if(!this.isKeyboard && this.innerHeight > window.innerHeight) {
    this.isKeyboard = true;
    return;
  } else if (this.isKeyboard) {
    this.isKeyboard = false;
    return;
  }
  this.element.find("#commentsholder").empty();
  this.loadComments(this.url);
}

sidebar.prototype.attach = function(element, url) {
  var el = element || "body";
  jquery(el).append(template);
  this.element = jquery(el).find(".sidebar");
  this.url = url || window.location;
  this.bindEvents();
  this.loadComments(url);
  this.innerHeight = window.innerHeight;
}

sidebar.prototype.loadComments = function(url) {
  var sidebarWidth = parseInt(jquery("body").css("width") || 0, 10);
  gapi.comments.render("commentsholder", {
    href: url || window.location,
    width: Math.round((sidebarWidth * 0.65).toString()),
    first_party_property: 'BLOGGER',
    view_type: 'FILTERED_POSTMOD'
  });
}


module.exports = new sidebar();
