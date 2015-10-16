import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Place', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /places without data', function(assert) {
  visit('/places');

  andThen(function() {
    assert.equal(currentPath(), 'places.index');
    assert.equal(find('#blankslate').text().trim(), 'No Places found');
  });
});

test('visiting /places with data', function(assert) {
  server.create('place');
  visit('/places');

  andThen(function() {
    assert.equal(currentPath(), 'places.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new place', function(assert) {
  visit('/places');
  click('a:contains(New Place)');

  andThen(function() {
    assert.equal(currentPath(), 'places.new');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Country) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing place', function(assert) {
  server.create('place');
  visit('/places');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'places.edit');

    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Country) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing place', function(assert) {
  server.create('place');
  visit('/places');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'places.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Country:)').next().text(), 'MyString');
  });
});

test('delete a place', function(assert) {
  server.create('place');
  visit('/places');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'places.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
