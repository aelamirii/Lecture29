(function () {
'use strict';

angular.module('ShoppingLisetDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1 )
.factory('ShoppingListFactory', ShoppingListFactory)
// .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.directive('shoppingList', ShoppingList)
;



function ShoppingList() {

  var ddo = {
    templateUrl: 'shoppingList1.html',
    scope: {
      list_Directive: '=myList',
      title_Directive: '@myTitle'
    },
    // controller: 'ShoppingListDirectiveController as list_DirectiveController',
    controller: ShoppingListDirectiveController,
    controllerAs: 'list_DirectiveController',
    bindToController: true
  };
  return ddo;
};


function ShoppingListDirectiveController() {

  var temp_list = this;

  temp_list.CookiesInList = function () {


    for(var i = 0; i < temp_list.list_Directive.getItems.length; i++ )
    {
      var name = temp_list.list_Directive.getItems[i].name;
      if(name.toLowerCase().indexOf("cookies") !== -1)
      return true;

    }
      return false;
  };


};



ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = "Shopping List 1 ";
  list.Title_Controller = Org_Title + "("+ list.getItems.length +")";


  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity );
      list.Title_Controller = Org_Title + "("+ list.getItems.length +")";
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }
  };

  list.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
    list.Title_Controller = Org_Title + "("+ list.getItems.length +")";
  };


};




function SHoppingList_Service(maxItems) {

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

      Items.push(item)  ;
    }
    else {
      throw new Error("Max items ("+ maxItems +") was reached");
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

  var factory = function (maxItems) {
    return new SHoppingList_Service(maxItems);
  };
  return factory;
};




})();
