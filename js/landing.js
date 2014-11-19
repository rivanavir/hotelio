$(function() {
	var MONTHS_MAP = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	var WEEK_DAYS_MAP = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
	var DATE_FORMAT = "dd/mm/yy";


	function updateDateView($scope, year, month, day) {
		var d = new Date(year, month, day);

		$(".date", $scope).text(day);
		$(".month", $scope).text(MONTHS_MAP[month]);
		$(".day", $scope).text(WEEK_DAYS_MAP[d.getDay() - 1]);
	}

	// Set current date
	var today = new Date();
	$("input#depart-date").val($.datepicker.formatDate(DATE_FORMAT, today));
	updateDateView($("#depart-date-holder"), today.getYear(), today.getMonth(), today.getDate());

	// Datepickers
	$( "#depart-date" ).datepicker({
		dateFormat: DATE_FORMAT,
		minDate: 0,
		numberOfMonths: 2,
		onSelect: function(date, data) {
			$( "#return-date" ).datepicker( "option", "minDate", new Date(data.selectedYear, data.selectedMonth, data.selectedDay) );
			updateDateView($("#depart-date-holder"), data.selectedYear, data.selectedMonth, data.selectedDay);
		}
	});

	$('#depart-date-holder').on('click', function() {
		$.datepicker._showDatepicker($('#depart-date')[0]);
		$("#ui-datepicker-div").css({marginTop: '45px'});
	});

	$( "#return-date" ).datepicker({
		dateFormat: DATE_FORMAT,
		minDate: 0,
		numberOfMonths: 2,
		onSelect: function(date, data) {
			$("#search-type input[type='radio']").attr('checked', false);
			$("#search-type input#round_trip").attr('checked', true);

			$( "#depart-date" ).datepicker( "option", "maxDate", new Date(data.selectedYear, data.selectedMonth, data.selectedDay) );
			$('#return-date-holder').addClass('active');
			updateDateView($("#return-date-holder"), data.selectedYear, data.selectedMonth, data.selectedDay);
		}

	});

	$('#return-date-holder').on('click', function() {
		$.datepicker._showDatepicker($('#return-date')[0]);
		$("#ui-datepicker-div").css({marginTop: '45px'});
	});

	$( "#multi-flight-1, #multi-flight-2, #multi-flight-3" ).datepicker({
		dateFormat: DATE_FORMAT,
		minDate: 0,
		numberOfMonths: 2,
		onSelect: function(date, data) {
			var n = parseInt(data.id.match(/^multi-flight-(\d+)$/)[1], 10);

			$( "#multi-flight-"+ n +"-holder" ).addClass('active');
			$( "#multi-flight-" + (n + 1) ).datepicker( "option", "minDate", new Date(data.selectedYear, data.selectedMonth, data.selectedDay) );
			updateDateView($("#multi-flight-"+ n +"-holder"), data.selectedYear, data.selectedMonth, data.selectedDay);
		}
	});

	$('#multi-flight-1-holder, #multi-flight-2-holder, #multi-flight-3-holder').on('click', function() {
		var id = $(this).attr('id'),
				n = id.match(/^multi-flight-(\d+)-holder$/)[1];
		$.datepicker._showDatepicker($('#multi-flight-' + n)[0]);
		$("#ui-datepicker-div").css({marginTop: '45px'});
	});

	// Passangers select
	$('.passengers-select').on('click', '.control.minus', function(){
		var $holder = $(this).closest('.passengers-select'),
				$counter = $('.count', $holder),
				currentCount = parseInt($counter.text(), 10);

		if (currentCount > 0) {
			$('input', $holder).val(currentCount - 1);
			$counter.text(currentCount - 1);
		}
	});

	$('.passengers-select').on('click', '.control.plus', function(){
		var $holder = $(this).closest('.passengers-select'),
				$counter = $('.count', $holder),
				currentCount = parseInt($counter.text(), 10);

		$('input', $holder).val(currentCount + 1);
		$counter.text(currentCount + 1);
	});

	// Flight + Hotel select
	$('#search-type').on('click', '#flight_plus_hotel', function(){

		if ($(this).is(':checked')) {
			$('#submit-search').addClass('type-2').val('Search Flight + Hotel');
		} else {
			$('#submit-search').removeClass('type-2').val('Search Flights');
		}
	});


	// Search type change
	function showSimpleSearchView() {
		$('#offers_and_promotions').removeClass('hide');
		$('#flight-search').removeClass('large-12').addClass('large-8');
		$('#simple-search').removeClass('hide');
		$('#multi-search').addClass('hide');
	}

	function showMultiSearchView() {
		$('#offers_and_promotions').addClass('hide');
		$('#flight-search').removeClass('large-8').addClass('large-12');
		$('#multi-search').removeClass('hide');
		$('#simple-search').addClass('hide');
	}

	$('#search-type').on('change', "input[type='radio']", function() {
		switch ($(this).attr('id')) {
			case 'one_way':
				$('input#return-date').val('');
				$('#return-date-holder').removeClass('active');
				showSimpleSearchView();
				break;
			case 'multi_city':
				showMultiSearchView();
				break;
			default:
				showSimpleSearchView();
		}

	});

});

$( "#pick-date" ).datepicker();
$( "#pick-date2" ).datepicker();
$( "#return-date" ).datepicker();
$( "#return-date2" ).datepicker();
$( "#arrival-date1" ).datepicker();
$( "#arrival-date2" ).datepicker();
$( "#depart-date1" ).datepicker();
$( "#depart-date2" ).datepicker();

$("#return-transfer").on('change', function(){
	if($("#depart-date1").attr('disabled')){
		$("#depart-date1").removeAttr('disabled');
		$("#time-st").removeAttr('disabled');
		$("#sec-st").removeAttr('disabled');
	}
	else {
		$("#depart-date1").attr('disabled', 'disabled');
		$("#time-st").attr('disabled', 'disabled');
		$("#sec-st").attr('disabled', 'disabled');
	}
});

$(function() {
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 300 ],
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
});
