function showSignupModal() {
  let modal = document.getElementById("signupModal");
  modal.style.display = "block";
}

function showLoginModal() {
  let modal = document.getElementById("loginModal");
  modal.style.display = "block";
}

function showContactModal() {
  let modal = document.getElementById("contactModal");
  modal.style.display = "block";
}

function showChangeEmailModal() {
  let modal = document.getElementById("changeEmailModal");
  modal.style.display = "block";
}

function showChangePasswordModal() {
  let modal = document.getElementById("changePasswordModal");
  modal.style.display = "block";
}

function showPaymentModal() {
  let modal = document.getElementById("paymentModal");
  modal.style.display = "block";
}

function closeModals() {
  let signupModal = document.getElementById("signupModal");
  let loginModal = document.getElementById("loginModal");
  let contactModal = document.getElementById("contactModal");
  let changeEmailModal = document.getElementById("changeEmailModal");
  let changePasswordModal = document.getElementById("changePasswordModal");
  let paymentModal = document.getElementById("paymentModal");
  signupModal.style.display = "none";
  loginModal.style.display = "none";
  contactModal.style.display = "none";
  changeEmailModal.style.display = "none";
  changePasswordModal.style.display = "none";
  paymentModal.style.display = "none";
}
