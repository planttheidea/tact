angular.module('tact.datepicker')
    .directive('tactDatepicker',[
        datepickerDirective
    ]);

function datepickerDirective(){
    function datepickerCompile(element,attrs){
        var $input = element.find('input'),
            $button = (function(){
                var $buttons = element.find('button');

                for(var i = $buttons.length; i--;){
                    var $button = angular.element($buttons[i]);

                    if($button.parent().hasClass('datepicker-open-button')){
                        return $button
                    }
                }
            })();

        function datepickerPostLink(scope,element,attrs,dtpckrCtrl){
            scope.$watch('model',function(date){
                if(date){
                    scope.currentMoment = moment(new Date(date));
                    scope.datepickerMoment = moment(new Date(date));
                }
            });

            scope.$watch('datepickerMoment',function(datepickerMoment){
                if(!datepickerMoment){
                    scope.datepickerMoment = moment(moment(new Date()).format('YYYY-MM-DD'),'YYYY-MM-DD')
                }

                dtpckrCtrl.setDatepickerCalendar();
            },true);
        }

        function datepickerPreLink(scope,element,attrs,dtpckrCtrl){
            if(attrs.hasOwnProperty('inputName')){
                scope.name = attrs.inputName;
            }

            dtpckrCtrl.element = element[0];
        }

        if(attrs.hasOwnProperty('inputId')){
            $input.attr({
                id:attrs.inputId
            });
        }

        if(attrs.hasOwnProperty('inputName')){
            $input.attr({
                name:attrs.inputName
            });
        }

        return {
            post:datepickerPostLink,
            pre:datepickerPreLink
        };
    }

    function datepickerController($scope,$timeout,$q,dtpckrFctry){
        var dtpckrCtrl = this;

        function getDatepickerTitle(){
            return dtpckrFctry.getDatepickerTitle($scope.datepickerMoment);
        }

        function openDatepicker(){
            $scope.isOpen = true;

            setWindowListener();
        }

        function setDate(dayObj){
            $scope.model = dayObj.date;

            $scope.isOpen = false;
        }

        function setDatepickerCalendar(){
            $scope.weeks = dtpckrFctry.setDatepickerCalendar($scope.datepickerMoment,$scope.currentMoment);
        }

        function setDatepickerDisplay(type,forward){
            dtpckrFctry['change' + type]($scope.datepickerMoment,forward);
        }

        function setWindowListener(){
            var $window = angular.element(window);

            $window.off('click');

            $timeout(function(){
                $window.on('click',function(e){
                    var isInDatepicker = dtpckrFctry.getParents(e.target).indexOf(dtpckrCtrl.element) !== -1;

                    if(!isInDatepicker){
                        $scope.isOpen = false;

                        $timeout(function(){
                            $window.off('click');
                        });
                    }
                });
            });
        }

        dtpckrCtrl.getDatepickerTitle = getDatepickerTitle;
        dtpckrCtrl.openDatepicker = openDatepicker;
        dtpckrCtrl.setDate = setDate;
        dtpckrCtrl.setDatepickerCalendar = setDatepickerCalendar;
        dtpckrCtrl.setDatepickerDisplay = setDatepickerDisplay;
        dtpckrCtrl.setWindowListener = setWindowListener;
    }

    return {
        compile:datepickerCompile,
        controller:[
            '$scope',
            '$timeout',
            '$q',
            'datepickerFactory',
            datepickerController
        ],
        controllerAs:'dtpckrCtrl',
        restrict:'E',
        scope:{
            form:'=',
            format:'@?',
            model:'='
        },
        template:'@@datepickerHtml'
    };
}
