
function validateJoinForm() {
    var offering = document.getElementById("offering").value;
    var fullName = document.getElementById("fullname").value;
    var preferredDate = document.getElementById("preferred-date").value;

    if (offering == "") {
        alert("Please select an offering.");
        return false;
    }

    if (fullName == "") {
        alert("Please enter your full name.");
        return false;
    }

    if (fullName.search(/[0-9]/) != -1) {
        alert("Name must not contain numbers.");
        return false;
    }

    if (fullName.search(/[^A-Za-z ]/) != -1) {
        alert("Name must not contain special characters.");
        return false;
    }

    if (fullName.search(/^[A-Za-z]+( [A-Za-z]+)+$/) == -1) {
        alert("Please enter your first and last name.");
        return false;
    }

    if (preferredDate == "") {
        alert("Please select a preferred date.");
        return false;
    }

    var today = new Date();
    var dateParts = preferredDate.split("-");

    var selectedDate = parseInt(dateParts[0]) * 10000 +
                       parseInt(dateParts[1]) * 100 +
                       parseInt(dateParts[2]);

    var currentDate = today.getFullYear() * 10000 +
                      (today.getMonth() + 1) * 100 +
                      today.getDate();

    if (selectedDate <= currentDate) {
        alert("Preferred date must be a future date.");
        return false;
    }

    
var stay = confirm("Request sent successfully!\n\nOK = Stay on this page\nCancel = Return to Dashboard");

if (stay == false) {
    location.replace("member-dashboard.html");
}
else {
    var requestsArea = document.getElementById("submitted-requests");

    if (requestsArea.innerHTML == "") {
        requestsArea.innerHTML =
            '<h2>Submitted Requests</h2>' +
            '<table class="requests-table">' +
            '<tr><th>Offering Name</th><th>Member Name</th><th>Preferred Date</th></tr>' +
            '<tbody id="requests-body"></tbody>' +
            '</table>';
    }

    var offeringName = "";

    if (offering == "mystery-night") {
        offeringName = "Mystery Night";
    }
    else if (offering == "poetry-workshop") {
        offeringName = "Poetry Workshop";
    }
    else if (offering == "kids-story-hour") {
        offeringName = "Kids Story Hour";
    }

    var newRow = document.createElement("tr");

    newRow.innerHTML =
        "<td>" + offeringName + "</td>" +
        "<td>" + fullName + "</td>" +
        "<td>" + preferredDate + "</td>";

    document.getElementById("requests-body").appendChild(newRow);
}

return false;
}