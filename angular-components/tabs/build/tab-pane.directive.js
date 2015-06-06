angular.module('tact.tabs')
    .directive('tactTabPane',[
        tabPaneDirective
    ]);

function tabPaneDirective(){
    function tabPaneCompile(element,attrs){
        return {
            pre:tabPanePreLink,
            post:tabPanePostLink
        };
    }

    function tabPaneController($scope){
        var tbPneCtrl = this;
    }

    function tabPanePreLink(scope,element,attrs,tbCtrl){
        tbCtrl.addPane(scope);
    }

    function tabPanePostLink(scope,element,attrs,tbCtrl){

    }

    return {
        compile:tabPaneCompile,
        controller:[
            '$scope',
            tabPaneController
        ],
        controllerAs:'tbPneCtrl',
        require:'^tactTabs',
        restrict:'E',
        scope:{
            title:'@'
        },
        transclude:true,
        template:'<ng-transclude data-ng-show="selected"></ng-transclude>'
    };
}
