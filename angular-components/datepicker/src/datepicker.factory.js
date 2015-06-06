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
}
