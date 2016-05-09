
$("form input").keypress(function (e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        $('button[type=submit] .default').click();
        return false;
    } else {
        return true;
    }
});
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
})
var otherTitle = $("#other-title").val();

var designSelected;
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
})



var allCheckbox = $(".activities [type='checkbox']")[0];
var checkCount = 0;
var addedAmount;
var totalCost;

//checked checkboxes add total cost at the end of the checkboxes
//disable the checkbox and visually indicate that the workshop in the competing time slot isn't available
$(".activities [type='checkbox']").on("change", function(){
  $(".total-cost").remove();
  if (this !== allCheckbox) {
    $(this).each(function(){
      var group = $(this).data('timeslot');
      if ($(this).is(":checked")) {
        checkCount++;
        $(".activities [type='checkbox'][data-timeslot=" + group + "]")
        .not(this).prop('disabled', this.checked).parent().css({color: 'rgba(0, 0, 0, 0.3)'});
      } else if (!$(this).is(":checked")){
        checkCount--;
        $(".activities [type='checkbox'][data-timeslot=" + group + "]")
        .not(this).removeProp('disabled').parent().css({color: ''});;
      }
    })
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
})


//If the user selects a workshop, don't allow selection of a workshop at the same date and time


//When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
//As a user selects activities to register for, a running total is listed below the list of checkboxes.
//For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop the total should change to Total: $300.
