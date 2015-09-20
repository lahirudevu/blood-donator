var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ContributionConstants = require('../constants/ContributionConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var contributors = {
         aa: {id:"aa",complete:false,text:"madhumal"},
         bb: {id:"bb",complete:false,text:"gayan"},
         cc: {id:"cc",complete:false,text:"iswan"},
         dd: {id:"dd",complete:false,text:"dhanushka"}
    };

function create(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  contributors[id] = {
    id: id,
    complete: false,
    text: text
  };
}

var ContributionStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return contributors;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {

  var text;

  switch(action.actionType) {
    case ContributionConstants.CONTRIB_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        ContributionStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = ContributionStore;