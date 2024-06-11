import AirDatepicker from "air-datepicker";
import localEn from "air-datepicker/locale/en";
const dateInputField = document.getElementById("date-picker");
const toDoInputField = document.getElementById("to-do-input-field");
const addToDoButton = document.getElementById("Add-todo");
const toDoswrapper = document.getElementById("tasks");
function checkIfInputFieldIsEmpty(inputField) {
    let emptyInput = false;
    if (inputField.value == undefined || inputField.value == "") {
        emptyInput = true;
    }
    return emptyInput;
}
function openToDoDateField() {
    const addDateButton = document.querySelector(".fa-clock");
    addDateButton.addEventListener("click", () => {
        if (dateInputField.style.display !== "block") {
            dateInputField.style.display = "block";
            openDatePicker();
        }
        else {
            dateInputField.style.display = "none";
            dateInputField.value = "";
        }
    });
}
openToDoDateField();
function openDatePicker() {
    //opens the date picking window
    let datePicker = new AirDatepicker('#date-picker', {
        onSelect(date) {
            datePicker.hide();
            dateInputField.value = date.formattedDate.toString();
        },
        timepicker: true,
        timeFormat: 'hh:mm AA',
        locale: localEn
    });
}
function getDateInputFieldValue() {
    if (!checkIfInputFieldIsEmpty(dateInputField))
        return dateInputField.value;
    else
        return "";
}
function getTodoInputFieldValue() {
    if (!checkIfInputFieldIsEmpty(toDoInputField))
        return toDoInputField.value;
    else
        return "";
}
function addToDo() {
    addToDoButton.addEventListener("click", () => {
        if (getDateInputFieldValue() != "" && getTodoInputFieldValue() != "")
            createToDoWrapper(getTodoInputFieldValue(), getDateInputFieldValue());
    });
}
function createToDoWrapper(todoValue, dateValue) {
    const toDoContainer = document.createElement("div");
    const rightSide = document.createElement("div");
    const leftSide = document.createElement("div");
    const toDoValueDiv = document.createElement("div");
    const dateValueDiv = document.createElement("div");
    toDoValueDiv.append(todoValue);
    dateValueDiv.append(dateValue);
    rightSide.className = "right";
    leftSide.className = "left";
    leftSide.append(doneWithToDo(), toDoValueDiv);
    rightSide.append(dateValueDiv, removeTodo(toDoContainer));
    toDoContainer.className = "toDoTask";
    toDoContainer.appendChild(leftSide);
    toDoContainer.appendChild(rightSide);
    toDoswrapper.appendChild(toDoContainer);
}
function removeTodo(toDoWrapper) {
    const removeButton = document.createElement("i");
    removeButton.className = "fa-regular fa-trash-can";
    removeButton.addEventListener("click", () => {
        toDoWrapper.remove();
    });
    return removeButton;
}
function doneWithToDo() {
    const doneCheckBox = document.createElement("input");
    doneCheckBox.type = "checkbox";
    doneCheckBox.className = "done-check-box";
    doneCheckBox.addEventListener("click", () => {
        if (doneCheckBox.style.backgroundColor !== "green")
            doneCheckBox.style.backgroundColor = "green";
        else
            doneCheckBox.style.backgroundColor = "transparent";
    });
    return doneCheckBox;
}
addToDo();
