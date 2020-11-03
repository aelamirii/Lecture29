(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.factory('ShoppingListFactory', ShoppingListFactory)
// .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.directive('shoppingList', ShoppingList)
;


function ShoppingList() {

  var ddo = {
      templateUrl: 'shoppingList.html',
      scope: {
        list_Directive: '<myList',
        title_Directive: '@myTitle'
      },
      // controller: 'ShoppingListDirectiveController as list',
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
  };
  return ddo;
};


function ShoppingListDirectiveController() {

  var list = this;

  list.CookiesInList = function () {

    // console.log("sssss",list.list_Directive.getItems.length);

    for(var i=0; i < list.list_Directive.getItems.length ; i++)
    {
      var name = list.list_Directive.getItems[i].name;
      // console.log("Name :"+name+":");
      if(name.toLowerCase().indexOf("cookies") !== -1)
      return true;
    }
    return false;
  };

}



ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = "Shopping List 1 ";
  list.Titel_Controller = Org_Title + "("+list.getItems.length+")"

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity);
      list.Titel_Controller = Org_Title + "("+list.getItems.length+")"
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }
  };

  list.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
    list.Titel_Controller = Org_Title + "("+list.getItems.length+")"
  };

};




function ShoppingList_Service(maxItems) {

  var service = this;

  var Items = [];


  service.addItem = function (itemName, itemQuantity) {

    if( ( maxItems === undefined ) ||
        ( maxItems !== undefined && Items.length < maxItems )
    )
    {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    }
    else {
      throw new Error("Max items ("+ maxItems +") was reached");
    }

  };

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem , 1 );
  };

};



function ShoppingListFactory() {

  var factory = function (maxItems) {
    return new ShoppingList_Service(maxItems);
  };
  return factory;
};



})();
