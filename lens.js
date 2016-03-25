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


// Make a lens for the name property.
const name = _.lensProp('name');

console.log(L.view(name, user));
// Charles Bronson

console.log(L.set(name, 'Richard Branson', user));
// {id: 3, name: 'Richard Branson', addresses: [{street: '99 Walnut Dr.', zip: '04821'}, {street: '2321 Crane Way', zip: '08082'}]}

console.log(L.over(name, _.toUpper, user));
// {id: 3, name: 'CHARLES BRONSON', addresses: [{street: '99 Walnut Dr.', zip: '04821'}, {street: '2321 Crane Way', zip: '08082'}]}

const addresses = _.lensProp('addresses');
const street = _.lensProp('street');
const first = _.lensIndex(0);

const firstStreet = _.compose(addresses, first, street);

console.log(L.view(firstStreet, user));
// 99 Walnut Dr.

console.log(L.over(firstStreet, _.reverse, user));
// { id: 3, name: 'Charles Bronson', addresses: [ { street: '.rD tunlaW 99', zip: '04821' }, { street: '2321 Crane Way', zip: '08082' } ] }

console.log(L.over(_.compose(L.mapped, L.mapped, L.mapped, name), _.toUpper, Task.of(Maybe.of([user]))));
// Task(Maybe([{ id: 3, name: 'CHARLES BRONSON', addresses: [Object] }]))
