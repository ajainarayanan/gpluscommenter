

var template = require("../templates/sidebar");
var jquery = require("jquery");

function sidebar(deferredLoading) {

  function bindEvents() {
    this.element.bind("click", function (event) {
      var target = jquery(event.target);
      target.parent(".sidebar").toggleClass("pullLeft");
    });
  }

  function attach(element, url) {
    var el = element || "body";
    jquery(el).append(template);
    this.element = jquery(el).find(".sidebar");
    bindEvents();
    loadComments(url);
  }
  function loadComments(url) {
    gapi.comments.render("commentsholder", {
      href: url || window.location,
      width: '321',
      first_party_property: 'BLOGGER',
      view_type: 'FILTERED_POSTMOD'
    });
  }
  if (!deferredLoading) {
      attach();
  }
  return {
    attach: attach,
    loadComments: loadComments
  };
}
module.exports = sidebar();
