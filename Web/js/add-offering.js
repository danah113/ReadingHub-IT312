/* ReadingHub - Add a New Offering page
   Validates the form, then saves the offering in localStorage
   (an array of objects under the key "managerOfferings"). */

function validateOfferingForm() {
    var name = document.getElementById("offering-name").value.trim();
    var imageInput = document.getElementById("offering-image");
    var price = document.getElementById("offering-price").value.trim();
    var description = document.getElementById("offering-description").value.trim();

    if (name == "") {
        alert("Please enter the offering name.");
        return false;
    }

    if (name.search(/^[0-9]/) != -1) {
        alert("The offering name cannot start with a number.");
        return false;
    }

    if (imageInput.files.length == 0) {
        alert("Please choose an image for the offering.");
        return false;
    }

    if (imageInput.files[0].type.indexOf("image/") != 0) {
        alert("The file must be an image.");
        return false;
    }

    if (price == "") {
        alert("Please enter the price (write 0 for a free offering).");
        return false;
    }

    if (isNaN(price) || Number(price) < 0) {
        alert("The price must be a number (0 or more).");
        return false;
    }

    if (description == "") {
        alert("Please enter the description.");
        return false;
    }

    // Valid: add the new offering to the saved array
    var offerings = JSON.parse(localStorage.getItem("managerOfferings")) || [];

    offerings.push({
        name: name,
        image: imageInput.files[0].name,
        price: Number(price),
        description: description
    });

    localStorage.setItem("managerOfferings", JSON.stringify(offerings));

    alert('The offering "' + name + '" was added successfully.');
    document.getElementById("offering-form").reset();
    return false;
}
