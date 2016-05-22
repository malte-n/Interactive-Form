(function(){
  $('#colors-js-puns').hide();
  $("#credit-card").hide().siblings().not("#payment").hide().not("#payment").parent().children().first().show();
  $('#other-title').hide();

  // The first text field should be selected when the page loads.
  $("#name").focus();

  var optionSelected;
  $('#title').on("change", function() {
    optionSelected = $("#title").val();
    //Use the id of "other-title" for the field
    //Add placeholder text of "Your Title" for the field
    if (optionSelected === "other"){
      $('#other-title').show();
    } else {
      $('#other-title').hide();
    }
  });

  var designSelected = "Select Theme";
  $('#design').on("change", function() {
    designSelected = $(this).val();

    //If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    if (designSelected === "js puns"){
      $('#colors-js-puns').show();
      $('#color').find("option[value='tomato']").hide();
      $('#color').find("option[value='steelblue']").hide();
      $('#color').find("option[value='dimgrey']").hide();
      $('#color').find("option[value='cornflowerblue']").show().attr("selected", "selected");
      $('#color').find("option[value='darkslategrey']").show();
      $('#color').find("option[value='gold']").show();
      //If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
    } else if (designSelected === "heart js"){
      $('#colors-js-puns').show();
      $('#color').find("option[value='tomato']").show().attr("selected", "selected");
      $('#color').find("option[value='steelblue']").show();
      $('#color').find("option[value='dimgrey']").show();
      $('#color').find("option[value='cornflowerblue']").hide();
      $('#color').find("option[value='darkslategrey']").hide();
      $('#color').find("option[value='gold']").hide();
    } else {
      $('#colors-js-puns').hide();
    }
    $(".shirtLabel").remove();
  });



  var allCheckbox = $(".activities [type='checkbox']")[0];
  var checkCount = 0;
  var addedAmount = 0;
  var totalCost;

  //checked checkboxes add total cost at the end of the checkboxes
  //disable the checkbox and visually indicate that the workshop in the competing time slot isn't available
  $(".activities [type='checkbox']").on("change", function(){
    $(".total-cost").remove();
    if (this !== allCheckbox) {
      $(this).each(function(){
        var group = $(this).data('timeslot');
        if ($(this).is(":checked")) {
          //increases the amount being paid
          checkCount++;
          $(".activities [type='checkbox'][data-timeslot=" + group + "]")
          .not(this).prop('disabled', this.checked).parent().css({color: 'rgba(0, 0, 0, 0.3)'});
        } else if (!$(this).is(":checked")){
          //decreases the amount being paid
          checkCount--;
          //When a user unchecks an activity competing activities are no longer disabled.
          $(".activities [type='checkbox'][data-timeslot=" + group + "]")
          .not(this).removeProp('disabled').parent().css({color: ''});
        }
      });
    } else if (this === allCheckbox && $(this).is(":checked")) {
        checkCount += 2;
    } else {
        checkCount -= 2;
    }
    if (checkCount === 0) {
      $(".total-cost").remove();
      return false;
    }
    addedAmount = checkCount*100;
    totalCost = '<div class="total-cost">Total: $' + addedAmount + '</div>';
    $('form').find('.activities').append(totalCost);
    $(".activitiesLabel").remove();
  });

  //When a user selects the "Credit Card" payment option, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.
  var paymentOptionSelected = "select_method";
  function paymentMethod() {
    $("#credit-card").show().siblings().not("#payment").hide().not("#payment").parent().children().first().show();
    $("#payment").on('change', function(){
      paymentOptionSelected = $(this).val();

      if (paymentOptionSelected === "credit card") {
        $("#credit-card").show().siblings().not("#payment").hide().not("#payment").parent().children().first().show();
      } else if (paymentOptionSelected === "paypal") {
        $("#credit-card").siblings().eq(3).show().siblings().not("#payment").hide().not("#payment").parent().children().first().show();
      } else if (paymentOptionSelected === "bitcoin") {
        $("#credit-card").siblings().eq(4).show().siblings().not("#payment").hide().not("#payment").parent().children().first().show();
      } else {
        $("#credit-card").hide().siblings().not("#payment").hide().not("#payment").parent().children().first().show();
      }
    });
  }paymentMethod();

$('#cvv').attr('maxlength', 3);

  //register button calls validateInputs
  $("button[type='submit']").on("click", function(e){
      //Name field can't be empty
      $(".shirtLabel, .activitiesLabel, .paymentLabel, .ccLabel").remove();
      //$(".paymentLabel").remove();
      //input name check
      if ($("input#name").val() === ''){
        $("input#name").prev().text("Name: (please provide your name)").css("color", "#ec2b45");
        e.preventDefault();
      } else {
        $("input#name").prev().text("Name:").css({'color': ''});
      }
      //input email check
      var email = $("input#mail").val();
      function validateEmail(email) {
        var emailRegEx = /\S+@\S+\.\S+/;
        return emailRegEx.test(email);
      }
      if (validateEmail(email) === true && email !== '') {
        $("input#mail").prev().text("Email:").css({'color': ''});
      } else {
        $("input#mail").prev().text("Email: (please provide your email)").css("color", "#ec2b45");
        e.preventDefault();
      }
      //select a job role check
      if (optionSelected === "other" && $("#other-title").val() === '') {
        $("#title").prev().text("Job Role: (please provide your job role)").css("color", "#ec2b45");
        e.preventDefault();
      } else {
        $("#title").prev().text("Job Role:").css({'color': ''});
      }
      //select a t-shirt check
      if (designSelected === "Select Theme") {
        $(".shirt legend").after('<label class="shirtLabel" style="color: #ec2b45">Don&#8217;t forget to pick a T-Shirt</label>');
        e.preventDefault();
      } else {
        $(".shirtLabel").remove();
      }
      //register for activities check
      if (addedAmount === 0) {
        $(".activities legend").after('<label class="activitiesLabel" style="color: #ec2b45">Please select an Activity</label>');
        e.preventDefault();
      } else {
        $(".activitiesLabel").remove();
      }
      //If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a cvv code, and a 3 number CVV value.
      if (paymentOptionSelected == "select_method") {
        $("#payment").siblings().eq(0).after('<label class="paymentLabel" style="color: #ec2b45">Please select a payment option</label>');
        e.preventDefault();
      } else {
        $(".paymentLabel").remove();
      }
      var numRegEx = /^\d+$/;
      var ccNum = $("#cc-num").val();
      var cvv = $("#cvv").val();
      var zip = $("#zip").val();

      if (paymentOptionSelected === "credit card") {
        var credNumCorrect = numRegEx.test(ccNum);
        var zipCorrect = numRegEx.test(zip);
        var cvvCorrect = numRegEx.test(cvv);

        if (ccNum === ''|| zip === '' || cvv === '' || cvv.length !== 3) {
          $("#payment").siblings().eq(0).after('<label class="ccLabel" style="color: #ec2b45">Please fill out your credit-card credentials correctly</label>');
          e.preventDefault();
        } else if (credNumCorrect && zipCorrect && cvvCorrect) {
          $(".ccLabel").remove();
        }
      }
  });
})();
