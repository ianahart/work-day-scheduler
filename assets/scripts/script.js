$(function () {
  //extend dayjs to use the advancedformat plugin for ordinal use
  dayjs.extend(window.dayjs_plugin_advancedFormat);

  var containerEl = $('#container');

  // get the curernt day in the specified format using the advancedFormat plugin
  function getCurrentDay() {
    var format = 'dddd, MMMM, Do';
    return dayjs().format(format);
  }

  // display the current day in the header of the page
  function displayCurrentDay() {
    var currentDayEl = $('#currentDay');
    currentDayEl.text(getCurrentDay());
  }

  // calculate if the time is in the past, present, or future
  function calculateTimeType(timeBlockId) {
    var workDayHour = extractHourFromId(timeBlockId);
    var timeType = 'past';

    if (dayjs().hour() === workDayHour) {
      timeType = 'present';
    }
    if (dayjs().hour() < workDayHour) {
      timeType = 'future';
    }

    return timeType;
  }

  // create the row element
  function createRowEl(workDayHour) {
    return $('<div>')
      .addClass('row time-block ')
      .attr({ id: 'hour-' + workDayHour });
  }

  // extract the hour from the id e.g. (hour-10)
  function extractHourFromId(workDayHourId) {
    if (workDayHourId) {
      return parseInt(workDayHourId.split('-')[1]);
    }
  }

  // create time element by converting workday hour into specified format
  function createTimeEl(workDayHourId, workDayHours) {
    var workDayHour = extractHourFromId(workDayHourId);
    return $('<div>')
      .addClass('col-2 col-md-1 hour text-center py-3')
      .text(dayjs().hour(workDayHour).format('hA'));
  }

  // create description element
  function createDescriptionEl() {
    return $('<textarea>')
      .addClass('col-8 col-md-10 description')
      .attr({ rows: 3 });
  }

  // create save button and append font awesome save icon to button
  function createSaveBtnEl() {
    var saveBtnEl = $('<button>')
      .addClass('btn saveBtn col-2 col-md-1')
      .attr({ ariaLabel: 'save' });

    var iconEl = $('<i>').addClass('fas fa-save').attr({ ariaHidden: true });

    iconEl.appendTo(saveBtnEl);
    return saveBtnEl;
  }

  function displayTimeBlocks() {
    var workDayHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    for (var i = 0; i < workDayHours.length; i++) {
      var rowEl = createRowEl(workDayHours[i]);
      var timeType = calculateTimeType(rowEl.attr('id'));
      rowEl.addClass(timeType);

      createTimeEl(rowEl.attr('id'), workDayHours).appendTo(rowEl);
      createDescriptionEl().appendTo(rowEl);
      createSaveBtnEl().appendTo(rowEl);

      rowEl.appendTo(containerEl);
    }
  }

  function main() {
    displayCurrentDay();
    displayTimeBlocks();
  }

  main();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
