angular.module('tact.pills')
    .directive('tactPillPane',[
        pillPaneDirective
    ]);

function pillPaneDirective(){
    function pillPaneCompile(element,attrs){
        return {
            pre:pillPanePreLink,
            post:pillPanePostLink
        };
    }

    function pillPaneController($scope){

    }

    function pillPanePreLink(scope,element,attrs,plCtrl){
        plCtrl.addPane(scope);
    }

    function pillPanePostLink(scope,element,attrs,plCtrl){

    }

    return {
        compile:pillPaneCompile,
        controller:[
            '$scope',
            pillPaneController
        ],
        controllerAs:'plPneCtrl',
        require:'^tactPills',
        restrict:'E',
        scope:{
            title:'@'
        },
        transclude:true,
        template:'<ng-transclude data-ng-show="selected"></ng-transclude>'
    };
}
