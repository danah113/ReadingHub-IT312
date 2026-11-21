const teamForm = document.querySelector('.rh-team-form');
const teamName = document.getElementById('team-name');
const teamPhoto = document.getElementById('team-photo');

teamForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Treat spaces alone as an empty field.
  for (const field of teamForm.querySelectorAll('input[type="text"]')) {
    if (!field.value.trim()) {
      const label = field.labels[0].textContent;
      alert('Please fill in the ' + label + ' field.');
      field.focus();
      return;
    }
  }

  const senderName = teamName.value.trim();

  if (/^\p{Nd}/u.test(senderName)) {
    alert('The name cannot start with a number.');
    teamName.focus();
    return;
  }

  const photo = teamPhoto.files[0];

  if (!photo || !photo.type.startsWith('image/')) {
    alert('Please choose an image file for the Photo field.');
    teamPhoto.focus();
    return;
  }

  alert('Thank you, ' + senderName + '! Your application was submitted successfully.');
  teamForm.reset();
});