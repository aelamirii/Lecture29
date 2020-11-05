(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.directive('shoppingList', ShoppingList)
;


function ShoppingList() {

  var ddo = {
      templateUrl: 'shoppingList2.html',
      scope: {
        list_Directive: '=myList',
        title_Directive: '@myTitle'
      },
      // controller: 'ShoppingListDirectiveController as ShoppingListDirectiveController',
      controller: ShoppingListDirectiveController,
      controllerAs: 'list_DirectiveController',
      bindToController: true
  };
  return ddo;
};


function ShoppingListDirectiveController() {

  var list = this;

  list.CookiesInList = function () {

    for(var i=0; i < list.list_Directive.getItems.length; i++)
    {
      var name = list.list_Directive.getItems[i].name;
      if(name.toLowerCase().indexOf("cookies") !== -1)
      return true;

    }
      return false;
  };
};



ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = "Shopping List 1 ";
  list.Title_Controller = Org_Title + " ("+ list.getItems.length +") ";

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity);
      list.Title_Controller = Org_Title + " ("+ list.getItems.length +") ";
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }
  };

  list.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
    list.Title_Controller = Org_Title + " ("+ list.getItems.length +") ";
  };

};






function ShoppingList_Service(maxItem) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {

    if( ( maxItem === undefined ) ||
        ( maxItem !== undefined && Items.length < maxItem )
    )
    {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    }
    else {
      throw new Error("Max Items ("+ maxItems +") was reached ");
    }

  };

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem, 1 );
  };

};


function ShoppingListFactory() {

  var factory = function (maxItem) {
    return new ShoppingList_Service(maxItem);
  };
  return factory;
};



})();
