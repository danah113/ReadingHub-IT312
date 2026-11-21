/* ReadingHub - Manage Activity Leaders and Instructors page
   The team is kept in an array of objects. The table is drawn from
   that array, so deleting or adding a person just updates the array
   and draws the table again. */

var leaders = [
    { id: 1, name: "Norah", photo: "images/name1.jpg", page: "leader-profile.html", role: "Critical analysis, Creative writing" },
    { id: 2, name: "Sara", photo: "images/name3.jpg", page: "name3.html", role: "Public speaking, Content writing" },
    { id: 3, name: "Mohammed", photo: "images/name2.jpg", page: "name2.html", role: "Educational technology, Digital storytelling" }
];
var nextId = 4;

function showLeaders() {
    var rows = "";

    for (var i = 0; i < leaders.length; i++) {
        var person = leaders[i];
        var nameHtml = person.name;

        // A link only for people who have a profile page
        if (person.page != "") {
            nameHtml = '<a href="' + person.page + '">' + person.name + "</a>";
        }

        rows = rows +
            "<tr>" +
            '<td><input type="checkbox" id="leader-' + person.id + '" name="leader" value="' + person.id + '">' +
            '<label for="leader-' + person.id + '" class="visually-hidden">Select ' + person.name + "</label></td>" +
            '<td><img src="' + person.photo + '" alt="Photo of ' + person.name + '" width="56" height="56"></td>' +
            "<td>" + nameHtml + "</td>" +
            "<td>" + person.role + "</td>" +
            "</tr>";
    }

    document.getElementById("leaders-body").innerHTML = rows;
}

function deleteLeaders() {
    var selectedCount = 0;

    for (var i = 0; i < leaders.length; i++) {
        if (document.getElementById("leader-" + leaders[i].id).checked) {
            selectedCount++;
        }
    }

    if (selectedCount == 0) {
        alert("Please select at least one activity leader or instructor to delete.");
        return false;
    }

    if (!confirm("Are you sure you want to delete the selected people?")) {
        return false;
    }

    var remaining = [];

    for (var j = 0; j < leaders.length; j++) {
        if (!document.getElementById("leader-" + leaders[j].id).checked) {
            remaining.push(leaders[j]);
        }
    }

    leaders = remaining;
    showLeaders();
    return false;
}

function addLeader() {
    var name = document.getElementById("leader-name").value.trim();
    var photoInput = document.getElementById("leader-photo");
    var dob = document.getElementById("leader-dob").value;
    var email = document.getElementById("leader-email").value.trim();
    var education = document.getElementById("leader-education").value.trim();
    var skills = document.getElementById("leader-skills").value.trim();
    var expertise = document.getElementById("leader-expertise").value.trim();

    if (name == "") {
        alert("Please enter the name.");
        return false;
    }

    if (name.search(/^[A-Za-z]+( [A-Za-z]+)*$/) == -1) {
        alert("The name must contain letters and spaces only.");
        return false;
    }

    if (photoInput.files.length == 0) {
        alert("Please choose a photo.");
        return false;
    }

    if (photoInput.files[0].type.indexOf("image/") != 0) {
        alert("The photo must be an image file.");
        return false;
    }

    if (dob == "") {
        alert("Please select the date of birth.");
        return false;
    }

    if (email == "") {
        alert("Please enter the email.");
        return false;
    }

    if (email.search(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) == -1) {
        alert("The email is not valid (example: name@example.com).");
        return false;
    }

    if (expertise == "") {
        alert("Please enter the area of expertise.");
        return false;
    }

    if (expertise.search(/[A-Za-z]/) == -1) {
        alert("The area of expertise must be text, not only numbers.");
        return false;
    }

    if (skills == "") {
        alert("Please enter the skills.");
        return false;
    }

    if (skills.search(/[A-Za-z]/) == -1) {
        alert("The skills must be text, not only numbers.");
        return false;
    }

    if (education == "") {
        alert("Please enter the education.");
        return false;
    }

    if (education.search(/[A-Za-z]/) == -1) {
        alert("The education must be text, not only numbers.");
        return false;
    }

    leaders.push({
        id: nextId,
        name: name,
        photo: URL.createObjectURL(photoInput.files[0]),
        page: "",
        role: expertise
    });
    nextId++;

    showLeaders();
    document.getElementById("add-leader-form").reset();
    return false;
}

showLeaders();
