/* ReadingHub - Manager Dashboard page
   Reads the offerings saved by the Add a New Offering page
   from localStorage and adds them to the table. */

function showSavedOfferings() {
    var offerings = JSON.parse(localStorage.getItem("managerOfferings")) || [];
    var body = document.getElementById("offerings-body");

    for (var i = 0; i < offerings.length; i++) {
        body.innerHTML = body.innerHTML +
            "<tr>" +
            "<td>" + offerings[i].name + "</td>" +
            "<td>$" + offerings[i].price + "</td>" +
            "<td>" +
            '<button type="button" class="btn btn-ghost btn-small" aria-label="Edit ' + offerings[i].name + '">Edit</button> ' +
            '<button type="button" class="btn btn-danger btn-small" aria-label="Delete ' + offerings[i].name + '">Delete</button>' +
            "</td>" +
            "</tr>";
    }
}

showSavedOfferings();
