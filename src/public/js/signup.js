console.log("Signup Frontend Javascript File");

// Document ready - runs code after HTML is loaded
$(function () {
  const fileTarget = $(".upload-hidden");

  fileTarget.on("change", function () {
    const uploadFile = this.files[0]; // Gets the first selected file

    if (!uploadFile) return; // In case: user opens dialog -> clicks cancel = prevents crash

    const fileType = uploadFile.type; // Gets file type
    const validImageType = ["image/jpg", "image/jpeg", "image/png"]; // Defines allowed file types

    // Check: Is selected file NOT in allowed list?
    if (!validImageType.includes(fileType)) {
      alert("Please insert only jpeg, jpg and png!"); // Shows error
      $(this).val(""); // Resets = clears selected file
      return; // Stops execution
    }

    console.log("Valid file:", uploadFile); // For debugging
  });
});

// FRONTEND FORM VALIDATION
function validateSignupForm() {
  console.log("VALIDATION RUNNING"); // 👈 add this
  const memberNick = $(".member-nick").val(),
    memberPhone = $(".member-phone").val(),
    memberPassword = $(".member-password").val(),
    confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs!");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs, please check!");
    return false;
  }
  return true;
}
