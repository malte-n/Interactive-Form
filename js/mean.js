
$('#colors-js-puns').hide();

//Make sure you add an text input field.
var optionSelected;
$('#title').on("change", function() {
  optionSelected = $(this).val();
  console.log(optionSelected);
  var otherTitleField = '<input type="text" id="other-title" placeholder="Your Title">';
  if (optionSelected === "other"){
    $('form').find('fieldset').first().append(otherTitleField);
  } else {
    $('#other-title').remove();
  //Use the id of "other-title" for the field
  //Add placeholder text of "Your Title" for the field
  }
});
var otherTitle = $("#other-title").val();

var designSelected = "Select Theme";
$('#design').on("change", function() {
  designSelected = $(this).val();
  console.log(designSelected);
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
        .not(this).removeProp('disabled').parent().css({color: ''});;
      }
    });
  } else if (this === allCheckbox && $(this).is(":checked")) {
      checkCount += 2;
  } else {
      checkCount -= 2;
  }
  if (checkCount === 0) {
    $(".total-cost").remove();
    return false
  }
  addedAmount = checkCount*100;
  totalCost = '<div class="total-cost">Total: $' + addedAmount + '</div>';
  $('form').find('.activities').append(totalCost);
  $(".activitiesLabel").remove();
});

//When a user selects the "Credit Card" payment option, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.
var paymentOptionSelected = "select_method";

function myFunction(paymentOption) {
  $("#credit-card").hide().siblings().not("#payment").hide();
  console.log("got executed");
  $("#payment").on('change', function(){
    paymentOptionSelected = $(this).val();
    console.log(paymentOptionSelected);
    if (paymentOptionSelected === "credit card") {
      $("#credit-card").show().siblings().not("#payment").hide();
    } else if (paymentOptionSelected === "paypal") {
      $("#credit-card").siblings().eq(3).show().siblings().not("#payment").hide();
    } else if (paymentOptionSelected === "bitcoin") {
      $("#credit-card").siblings().eq(4).show().siblings().not("#payment").hide();
    } else {
      $("#credit-card").hide().siblings().not("#payment").hide();
    }
  });
}myFunction();

var validateInputs = function() {
  //input name check
  if ($("input#name").val() == ''){
    console.log();
    $("input#name").prev().text("Name: (please provide your name)").css("color", "#ec2b45");
  } else {
    $("input#name").prev().text("Name:").css({'color': ''});
  }
  //input email check
  if ($("input#mail").val() == '') {
    $("input#mail").prev().text("Email: (please provide your email)").css("color", "#ec2b45");
  } else {
    $("input#mail").prev().text("Name:").css({'color': ''});
  }
  //select a job role check
  if (optionSelected === "other" && $("#other-title").val() == '') {
    $("#title").prev().text("Job Role: (please provide your job role)").css("color", "#ec2b45");
  } else {
    $("#title").prev().text("Job Role:").css({'color': ''});
  }
  //select a t-shirt check
  if (designSelected === "Select Theme") {
    $(".shirt legend").after('<label class="shirtLabel" style="color: #ec2b45">Don&#8217;t forget to pick a T-Shirt</label>');
  } else {
    $(".shirtLabel").remove();
  }
  //register for activities check
  if (addedAmount === 0) {
    $(".activities legend").after('<label class="activitiesLabel" style="color: #ec2b45">Please select an Activity</label>');
  } else {
    $(".activitiesLabel").remove();
  }
}

//register button calls validateInputs
$("button[type='submit']").on("click", function(e){
    e.preventDefault();
    //Name field can't be empty
    console.log("Click registered.");
    $(".shirtLabel").remove();
    $(".activitiesLabel").remove();
    validateInputs();
    //if the user writes into the forms input, check again with validateInputs
    $("form input").on("keyup", function() {
      console.log("executed");
      validateInputs();
    });
});







//Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.
//At least one activity must be checked from the list under "Register for Actitivities."
//Payment option must be selected.
//If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.
