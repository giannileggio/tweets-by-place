import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("places", function() {
    this.route("new");

    this.route("edit", {
      path: ":place_id/edit"
    });

    this.route("show", {
      path: ":place_id"
    });
  });
});

export default Router;