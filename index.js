// Your code here
let array = ["Gray", "Worm", "Security", 1];

function createEmployeeRecord(array) {
    let testEmployee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return testEmployee;
}



function createEmployeeRecords(rowData) {
   return rowData.map(array => {
    return createEmployeeRecord(array)
   })
}



function createTimeInEvent(array, timeIn) {
    const time = timeIn.split(' ')
    let newEvent = {
        type: 'TimeIn',
        hour: parseInt(time[1]),
        date: time[0]
    }
    array.timeInEvents.push(newEvent)
    return array
}


function createTimeOutEvent(array, timeIn) {
    const time = timeIn.split(' ')
    let newEvent = {
        type: 'TimeOut',
        hour: parseInt(time[1]),
        date: time[0]
    }
    array.timeOutEvents.push(newEvent)
    return array
}



function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(time => date == time.date);
    const timeOut = record.timeOutEvents.find(time => date == time.date);
    const totalHours = (timeOut.hour - timeIn.hour) / 100;
    return totalHours;
}



function wagesEarnedOnDate(record, date) {
    const payRate = record.payPerHour;
    const hours = hoursWorkedOnDate(record, date);
    const totalPay = hours * payRate;
    return totalPay;
}

function allWagesFor(record) {
    const timeRecords = record.timeInEvents;
    const dates = timeRecords.map(record => record.date)
    const calculates = dates.map(date => wagesEarnedOnDate(record, date));
    const reduced = calculates.reduce((acc, calculates) => acc + calculates);
    return reduced; 
}


function findEmployeeByFirstName(srcArray, firstName) {
    firstName = srcArray.find(fn => fn.firstName)
    return firstName;
}


function calculatePayroll(array) {
    return array.reduce((acc, val) => {
        return acc + allWagesFor(val)
    }, 0)
}