import Ember from 'ember';

export default Ember.Controller.extend({
  username: 'Gianni',
  places: Ember.computed('model', function(){
    return this.store.peekAll('place');
  }),
  actions: {
    addPlace() {
      this.store.createRecord('place', {
        fullName: this.get('fullName'),
        country: this.get('country')
      });
      this.set('fullName', undefined);
      this.set('country', undefined);
    }
  }
});
