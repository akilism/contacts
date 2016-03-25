const Task = require('data.task');
const Maybe = require('data.maybe');

// import {lensProp, lensIndex,compose, map, toUpper, reverse, replace} from 'ramda';
const _ = require('ramda');

// import {mapped, over, view, set, lens, iso, from} from 'ramda-lens';
const L = require('ramda-lens');

// import {Map, List} from 'immutable';
const I = require('immutable');

const addrs = [{street: '99 Walnut Dr.', zip: '04821'}, {street: '2321 Crane Way', zip: '08082'}];
const user = {id: 3, name: 'Charles Bronson', addresses: addrs};


const addresses = _.lensProp('addresses');
const street = _.lensProp('street');
const allStreets = _.compose(addresses, L.mapped, street);

const getUser = (id) => {
	return new Task((reject, resolve) => {
		setTimeout(() => {
			resolve(user);
		}, 400);
	});
};

const profilePage = _.compose(_.map((x) => {
	return `<span>${x.street}</span>`;
}), L.view(addresses));

const updateUser = L.over(allStreets, _.replace(/\d+/, '****'));

const renderProfile = _.compose(_.map(_.compose(profilePage, updateUser)), getUser);

renderProfile(1).fork(console.log, console.log);
