(function(angular,window,document,undefined){angular.module('tact.pills',[]);;

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
};

angular.module('tact.pills')
    .directive('tactPills',[
        pillsDirective
    ]);

function pillsDirective(){
    function pillsCompile(element,attrs){
        if(attrs.hasOwnProperty('horizontal')){
            element.find('ul').attr({
                'data-pills': 'horizontal'
            });
        }

        function pillsPreLink(scope,element,attrs,plCtrl){

        }

        function pillsPostLink(scope,element,attrs,plCtrl){

        }

        return {
            pre:pillsPreLink,
            post:pillsPostLink
        };
    }

    function pillsController($scope){
        var plCtrl = this,
            panes = $scope.panes = [];

        function addPane(pane){
            if(panes.length === 0){
                plCtrl.selectPane(pane);
            }

            $scope.panes[$scope.panes.length] = pane;
        }

        function selectPane(pane){
            for(var i = 0, len = panes.length; i < len; i++){
                panes[i].selected = false;
            }

            pane.selected = true;
        }

        plCtrl.addPane = addPane;
        plCtrl.selectPane = selectPane;
    }

    return {
        compile:pillsCompile,
        controller:[
            '$scope',
            pillsController
        ],
        controllerAs:'plCtrl',
        restrict:'E',
        scope:{
            listClass:'@?',
            panes:'=?',
            pillClass:'@?'
        },
        transclude:true,
        template:'<ul data-pills class="{{listClass}}"><li class="{{pillClass}}" data-ng-repeat="pane in panes" data-ng-class="{\'active\': pane.selected}"><a href data-ng-click="plCtrl.selectPane(pane);">{{pane.title}}</a></li></ul><div data-pill-pane data-ng-transclude></div>'
    };
}})(window.angular,window,document);
