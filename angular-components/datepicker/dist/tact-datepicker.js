(function(angular,window,document,undefined){angular.module('tact.datepicker',[]);;

angular.module('tact.datepicker')
    .directive('tactDatepickerInput',[
        datepickerInputDirective
    ]);

function datepickerInputDirective(){
    function datepickerInputCompile(element,attrs){
        function datepickerInputPostLink(scope,element,attrs,dtpckrInptCtrl){
            attrs.$observe('tactDatepickerInput', function (newFormat) {
                if(dtpckrInptCtrl.$modelValue && scope.format && newFormat !== scope.format){
                    scope.format = newFormat;
                    dtpckrInptCtrl.$modelValue = new Date(dtpckrInptCtrl.$setViewValue);
                }
            });

            dtpckrInptCtrl.$formatters.unshift(function (modelValue) {
                if(modelValue){
                    return moment(new Date(modelValue)).format(scope.format);
                }
            });

            dtpckrInptCtrl.$parsers.unshift(function (viewValue) {
                if(viewValue){
                    var dt = /\d{4}-[01]\d-[0-3]/.test(viewValue) ? moment(viewValue,'YYYY-MM-DD') : moment(new Date(viewValue));

                    return (dt && dt.isValid()) ? dt.toDate() : undefined;
                }
            });
        }

        function datepickerInputPreLink(scope,element,attrs,dtpckrInptCtrl){
            scope.format = attrs.format || 'MM/DD/YYYY';
        }

        return {
            post:datepickerInputPostLink,
            pre:datepickerInputPreLink
        };
    }

    function datepickerInputController($scope){
        var dtpckrInptCtrl = this;
    }

    return {
        compile:datepickerInputCompile,
        controller:[
            '$scope',
            datepickerInputController
        ],
        controllerAs:'dtpckrInptCtrl',
        require:'^ngModel',
        restrict:'A'
    };
};

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
        template:'<div data-datepicker><div data-input-group><input data-ng-class="{\'invalid\': !!form[name] && (!!form[name].$invalid && !!form[name].$dirty) || (!!form.$submitted && !!form[name].$invalid)}" data-ng-model="model" data-tact-datepicker-input="{{format}}" required type="text"> <span class="addon-button datepicker-open-button"><button type="button" data-ng-click="dtpckrCtrl.openDatepicker();"><span class="fa fa-calendar"><span data-screen-reader-only>Open the calendar datepicker</span></span></button></span></div><div data-dropdown data-ng-class="{\'open\': !!isOpen}"><div data-input-group class="flow"><span class="addon-button"><button type="button" data-ng-click="dtpckrCtrl.setDatepickerDisplay(\'Year\',false);"><span class="fa fa-arrow-left"><span data-screen-reader-only>Go to previous year</span></span> Y</button></span> <span class="addon-button"><button type="button" data-ng-click="dtpckrCtrl.setDatepickerDisplay(\'Month\',false);"><span class="fa fa-arrow-left"><span data-screen-reader-only>Go to previous month</span></span> M</button></span><h6 data-current-month class="text-center text-nowrap">{{dtpckrCtrl.getDatepickerTitle()}}</h6><span class="addon-button"><button type="button" data-ng-click="dtpckrCtrl.setDatepickerDisplay(\'Month\',true);">M <span class="fa fa-arrow-right"><span data-screen-reader-only>Go to next month</span></span></button></span> <span class="addon-button"><button type="button" data-ng-click="dtpckrCtrl.setDatepickerDisplay(\'Year\',true);">Y <span class="fa fa-arrow-right"><span data-screen-reader-only>Go to next year</span></span></button></span></div><table data-table="fill" class="flow"><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody><tr data-ng-repeat="week in weeks"><td data-ng-repeat="day in week track by $index"><button class="small" data-ng-class="{\'secondary\': !!day.today, \'primary\': !!day.selected}" data-ng-click="dtpckrCtrl.setDate(day);" data-ng-if="!!day.date" type="button">{{day.text}}</button></td></tr></tbody></table></div></div>'
    };
};

angular.module('tact.datepicker')
    .factory('datepickerFactory',[
        datepickerFactory
    ]);

function datepickerFactory(){
    function changeMonth(mt,forward){
        return forward ? mt.add(1,'M') : mt.subtract(1,'M');
    }

    function changeYear(mt,forward){
        return forward ? mt.add(1,'y') : mt.subtract(1,'y');
    }

    function getDatepickerTitle(mt){
        return mt ? mt.format('MMMM YYYY') : '';
    }

    function getDaysInMonth(mt){
        return mt.daysInMonth();
    }

    function getFirstDayOfMonth(mt){
        return moment(mt).date(1).day();
    }

    function getParents(el){
        var parents = [],
            p = el.parentNode;

        while (p !== null) {
            var o = p;

            parents.push(o);
            p = o.parentNode;
        }

        return parents;
    }

    function setDatepickerCalendar(mt,selectedMt){
        var daysInMonth = getDaysInMonth(mt),
            offset = getFirstDayOfMonth(mt),
            allWeeks = [],
            week = [];

        if(offset){
            for(var i = 0; i < offset; i++){
                week[week.length] = {
                    date:undefined,
                    text:''
                };
            }
        }

        for(var i = 1, len = daysInMonth; i <= len; i++){
            var dayOfWeek = i + offset - 1,
                newMt = moment(mt).date(i),
                todayMt = moment(moment().format('YYYY-MM-DD'),'YYYY-MM-DD');

            if(dayOfWeek % 7 === 0 && week.length){
                allWeeks[allWeeks.length] = angular.copy(week);
                week = [];
            }

            week[week.length] = {
                date:newMt.toDate(),
                selected:(selectedMt && (newMt.diff(selectedMt,'days') === 0)),
                text:i.toString(),
                today:(newMt.diff(todayMt,'days') === 0)
            };

            if(i === len){
                allWeeks[allWeeks.length] = week;
            }
        }

        return angular.copy(allWeeks);
    }

    return {
        changeMonth:changeMonth,
        changeYear:changeYear,
        getDatepickerTitle:getDatepickerTitle,
        getDaysInMonth:getDaysInMonth,
        getFirstDayOfMonth:getFirstDayOfMonth,
        getParents:getParents,
        setDatepickerCalendar:setDatepickerCalendar
    };
}})(window.angular,window,document);
