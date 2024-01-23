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

  function getSavedEventIfExists(workDayHourId) {
    return localStorage.getItem(workDayHourId);
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

  // create description element and if there is an event that is saved to local storage use that as description text
  function createDescriptionEl(workDayHourId) {
    var savedEvent = getSavedEventIfExists(workDayHourId);

    var text = '';

    if (savedEvent !== null) {
      text = savedEvent;
    }

    return $('<textarea>')
      .addClass('col-8 col-md-10 description')
      .attr({ rows: 3 })
      .text(text);
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

  // create all the individual elements that make up the timeblock and append them to the timeblock row and then the row to the container
  function displayTimeBlocks() {
    var workDayHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    for (var i = 0; i < workDayHours.length; i++) {
      var rowEl = createRowEl(workDayHours[i]);
      var timeType = calculateTimeType(rowEl.attr('id'));
      rowEl.addClass(timeType);

      createTimeEl(rowEl.attr('id'), workDayHours).appendTo(rowEl);
      createDescriptionEl(rowEl.attr('id')).appendTo(rowEl);
      createSaveBtnEl().appendTo(rowEl);

      rowEl.appendTo(containerEl);
    }
  }

  // if the description textarea is empty do nothing, if there is a value save to local storage
  function saveEvent(e) {
    var event = $(this).prev().val();
    var key = $(this).parent().attr('id');

    localStorage.setItem(key, event);
  }

  function main() {
    displayCurrentDay();
    displayTimeBlocks();
  }

  main();

  containerEl.on('click', '.saveBtn', saveEvent);
});
