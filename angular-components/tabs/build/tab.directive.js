angular.module('tact.tabs')
    .directive('tactTabs',[
        tabsDirective
    ]);

function tabsDirective(){
    function tabsCompile(element,attrs){
        if(attrs.hasOwnProperty('horizontal')){
            element.find('ul').attr({
                'data-tabs': 'horizontal'
            });
        }

        function tabsPreLink(scope,element,attrs,tbCtrl){

        }

        function tabsPostLink(scope,element,attrs,tbCtrl){

        }

        return {
            pre:tabsPreLink,
            post:tabsPostLink
        };
    }

    function tabsController($scope){
        var tbCtrl = this,
            panes = $scope.panes = [];

        function addPane(pane){
            if(panes.length === 0){
                tbCtrl.selectPane(pane);
            }

            $scope.panes[$scope.panes.length] = pane;
        }

        function selectPane(pane){
            var disabledTabs = $scope.disabledTabs;

            if(disabledTabs && disabledTabs.indexOf(pane.title) !== -1){
                return;
            }

            for(var i = 0, len = panes.length; i < len; i++){
                panes[i].selected = false;
            }

            pane.selected = true;

            if($scope.activateFunctions && $scope.activateFunctions[pane.title]){
                $scope.activateFunctions[pane.title].call(undefined);
            }
        }

        tbCtrl.addPane = addPane;
        tbCtrl.selectPane = selectPane;
    }

    return {
        compile:tabsCompile,
        controller:[
            '$scope',
            tabsController
        ],
        controllerAs:'tbCtrl',
        restrict:'E',
        scope:{
            activateFunctions:'=?',
            disabledTabs:'=?',
            listClass:'@?',
            panes:'=?',
            tabClass:'@?'
        },
        transclude:true,
        template:'<ul data-tabs class="{{listClass}}"><li class="{{tabClass}}" data-ng-class="{\'active\': pane.selected, \'disabled\': disabledTabs.indexOf(pane.title) !== -1}" data-ng-repeat="pane in panes"><a href data-ng-click="tbCtrl.selectPane(pane);">{{pane.title}}</a></li></ul><div data-tab-pane data-ng-transclude></div>'
    };
}
