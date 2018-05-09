// import { Pagination } from '../dist/index';

const Pagination = require('../dist/index').Pagination;
const UserFuncTest = require('./user-list');

var pagination = new Pagination({
    getDataFunc: function (page, perPage) {
        return UserFuncTest.searchUser(page, perPage, function (item) {
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
    perPage: 5
});
// pagination.firstPage().then(function (data) {
//     console.log(data);
// });

// pagination.nextPage().then(function (data) {
//     console.log(data);
// });
pagination.config.numOfPage = 20;
pagination.config.enableMaxPageMode = true;
pagination.config.maxPageInPagination = 10;
function test(page) {
    pagination.getPage(page).then((data) => {
        console.log('==========================================');
        console.log('page: ' + pagination.config.page);
        console.log(pagination.pageList);
        console.log('==========================================');
    });
}

var count = 0;
var interval = setInterval(function () {
    count++;
    if (count >= pagination.config.numOfPage) {
        clearInterval(interval);
        return;
    }
    test(count)
}, 300)