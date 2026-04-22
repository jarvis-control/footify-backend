console.log("Users Frontend Javascript File");

$(function () {
  /* ───────── ACTIVE - BLOCK - DELETE ───────── */
  $(".member-status").on("change", function (e) {
    const id = e.target.id;

    const memberStatus = $(`#${id}.member-status`).val();

    axios
      .post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
      })
      .then((response) => {
        const result = response.data;

        if (result.data) {
          $(".member-status").blur(); // Removes focus from dropdown
        } else {
          alert("User update failed!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("User update failed!");
      });
  });
});
