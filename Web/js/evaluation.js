function clearOfferingHighlight() {
    document.getElementById("completed-offering").style.backgroundColor = "";
}

function clearRatingHighlight() {
    document.getElementById("rating-title").style.color = "";
}

function clearFeedbackHighlight() {
    document.getElementById("feedback").style.backgroundColor = "";
}

function validateEvaluationForm() {
    var offering = document.getElementById("completed-offering").value;
    var feedback = document.getElementById("feedback").value.trim();
    var rating = "";

    if (offering == "") {
        document.getElementById("completed-offering").style.backgroundColor = "#ffe6e6";
        return false;
    }

    if (document.getElementById("star5").checked) {
        rating = "5";
    }
    if (document.getElementById("star4").checked) {
        rating = "4";
    }
    if (document.getElementById("star3").checked) {
        rating = "3";
    }
    if (document.getElementById("star2").checked) {
        rating = "2";
    }
    if (document.getElementById("star1").checked) {
        rating = "1";
    }

    if (rating == "") {
        document.getElementById("rating-title").style.color = "red";
        return false;
    }

    if (feedback == "") {
        document.getElementById("feedback").style.backgroundColor = "#ffe6e6";
        return false;
    }

    if (parseInt(rating) >= 4) {
        alert("Thank you for your positive feedback!");
    }
    else {
        alert("We are sorry that your experience was not satisfactory.");
    }

    location.replace("member-dashboard.html");
    return false;
}
