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
}
