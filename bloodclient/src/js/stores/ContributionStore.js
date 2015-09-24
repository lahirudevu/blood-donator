var alt = require('../alt');
var assign = require('object-assign');
var ContributionActions = require('../actions/ContributionActions');

var CHANGE_EVENT = 'change';

var contributors = {
    aa: {
        id: "aa",
        complete: false,
        text: "madhumal"
    },
    bb: {
        id: "bb",
        complete: false,
        text: "gayan"
    },
    cc: {
        id: "cc",
        complete: false,
        text: "iswan"
    },
    dd: {
        id: "dd",
        complete: false,
        text: "dhanushka"
    }
};

function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    contributors[id] = {
        id: id,
        complete: false,
        text: text
    };
}

class ContributionStore {
    constructor() {
        this.bindActions(ContributionActions);
    }

    static getAll() {
        return contributors;
    }

    onCreate(text) {
        text = text.trim()
        if (text === '') {
            return false
        }
        create(text);
    }
}

export default alt.createStore(ContributionStore,'ContributionStore');
