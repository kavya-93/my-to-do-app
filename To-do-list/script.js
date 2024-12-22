const inputBox = document.getElementById("input-box");
const priorityBox = document.getElementById("priority-box");
const dateBox = document.getElementById("date-box");
const categoryBox = document.getElementById("category-box");
const listContainer = document.getElementById("list-container");

// Add event listener to update placeholder text when a date is selected
dateBox.addEventListener("change", function() {
    if (dateBox.value) {
        dateBox.placeholder = formatDate(dateBox.value);
    }
});

function addTask() {
    if(inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");

        // Assign a class to the list item based on priority 
        li.className = `${priorityBox.value.toLowerCase()}-priority`;

        // Create and append category span 
        let category = document.createElement("span"); 
        category.className = "category"; 
        category.textContent = categoryBox.value;

        let taskContent = document.createElement("span");
        taskContent.className = "task-content"; 
        taskContent.textContent = inputBox.value;

        let completionDate = document.createElement("span");
        completionDate.className = "date";
        let formattedDate = formatDate(dateBox.value); 
        completionDate.textContent = formattedDate;

        li.appendChild(category);
        li.appendChild(taskContent);
        li.appendChild(completionDate);

        

        let span = document.createElement("span");
        span.className = "close";
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
        // Update the placeholder text to display the selected due date 
        dateBox.placeholder = formattedDate; 
    }
    inputBox.value = "";
    categoryBox.selectedIndex = 0; // Reset to default category "Category"
    priorityBox.selectedIndex = 0; // Reset to default priority "Priority"
    dateBox.value = ""; // Clear the date input
    dateBox.placeholder = "Due date"; // Reset the placeholder to "Due date"
    saveData();
}

function formatDate(dateString) { 
    const date = new Date(dateString); 
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month (01-12)
    const dd = String(date.getDate()).padStart(2, '0'); // Day (01-31)
    const yy = String(date.getFullYear()).slice(-2); // Year (last 2 digits)
    return `${mm}-${dd}-${yy}`;
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();
