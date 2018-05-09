// import { Pagination } from '../dist/index';

const Pagination = require('../dist/index').Pagination;
const UserFuncTest = require('./user-list');

var pagination = new Pagination({
    getDataFunc: function (page, perPage) {
        return UserFuncTest.searchUser(page, perPage, function(item){
            return item.age > 30;
        });
    },
    mapDataFunc: function (data) {
        return data.map(function (item) {
            return {
                fullName: item.name.first + ' ' + item.name.last,
                age: item.age
            }
        });
    },
    perPage: 20
});
pagination.firstPage().then(function (data) {
    console.log(data);
});

pagination.nextPage().then(function (data) {
    console.log(data);
});