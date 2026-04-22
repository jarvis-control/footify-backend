console.log("Basic Frontend Javascript File");

// FRONTEND VALIDATION
function validateForm() {
  const productname = $(".product-name").val();
  const productCategory = $(".product-category").val();
  const kitType = $(".kit-type").val();
  const productBrand = $(".product-brand").val();
  const productSize = $(".product-size").val();
  const productPrice = $(".product-price-status").val();
  const productLeftCount = $(".product-left-count").val();
  const productColor = $(".product-color").val();
  const productDesc = $(".product-desc").val();

  if (
    productname === "" ||
    productCategory === "" ||
    kitType === "" ||
    productBrand === "" ||
    productSize === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productDesc === ""
  ) {
    alert("Please insert all details!");
    return false;
  } else return true;
}

$(function () {
  /* ───────── IMAGE PREVIEW ───────── */
  $("input[type='file'][name='productImages']").on("change", function () {
    const file = this.files[0];
    if (!file) return;

    const validTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validTypes.includes(file.type)) {
      alert("Please insert only jpeg, jpg and png!");
      $(this).val("");
      return;
    }

    const previewId = $(this).data("preview");
    const reader = new FileReader();

    reader.onload = function (e) {
      $(`#${previewId}`).attr("src", e.target.result).addClass("previewing");
    };

    reader.readAsDataURL(file);
  });

  /* ───────── CATEGORY & KIT TYPE ───────── */
  const $category = $("#category-select");
  const $kitType = $(".kit-type");
  const $kitGroup = $("#kit-type-group");

  function toggleKit() {
    if ($category.val() === "KIT") {
      $kitGroup.css("display", "flex");
    } else {
      $kitGroup.css("display", "none");
    }
  }

  $category.on("change", toggleKit);
  toggleKit();

  /* ───────── SIZE HANDLER ───────── */
  const $size = $(".product-size");

  function handleSize() {
    const category = $category.val();
    const kitType = $kitType.val();

    let options = '<option value="">Select...</option>';

    if (
      category === "KIT" &&
      (kitType === "JERSEY" || kitType === "SHORTS" || kitType === "SOCKS")
    ) {
      options += `
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>XXL</option>
      `;
    } else if (category === "BOOTS") {
      options += `
        <option>EU_38</option>
        <option>EU_39</option>
        <option>EU_40</option>
        <option>EU_41</option>
        <option>EU_42</option>
        <option>EU_43</option>
        <option>EU_44</option>
        <option>EU_45</option>
      `;
    } else if (category === "BALL") {
      options += `
        <option>SIZE_3</option>
        <option>SIZE_4</option>
        <option>SIZE_5</option>
      `;
    } else if (category === "GLOVES") {
      options += `
        <option>SIZE_7</option>
        <option>SIZE_8</option>
        <option>SIZE_9</option>
        <option>SIZE_10</option>
        <option>SIZE_11</option>
      `;
    }

    $size.html(options);
  }

  $category.on("change", handleSize);
  $kitType.on("change", handleSize);
  handleSize();

  /* ───────── FORM ANIMATION ───────── */
  $("#process-btn").on("click", function () {
    $("#product-form-card").addClass("visible");
    $(this).fadeOut(200);
  });

  $("#cancel-btn").on("click", function () {
    $("#product-form-card").removeClass("visible");
    $("#process-btn").fadeIn(200);
  });

  /* ───────── PAUSE - PROCESS - DELETE ───────── */
  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      const result = response.data;
      if (result.data) {
        $(".new-product-status").blur(); // Removes focus from dropdown
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });
});
