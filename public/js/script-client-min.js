function showErrorlert(e){var r=$("#alert-error-div"),s=$("#alert-error-div > .alert.alert-danger");s.text(e),r.slideDown().addClass("is-visible")}function showPageLoader(){$pageLoaderModal.modal({backdrop:"static",keyboard:!1,show:!0}),$(".progress-bar").css("width","100%")}function authenticateUser(){request&&request.abort();var e={};e.role=sessionStorage.getItem("role"),e.username=sessionStorage.getItem("username"),e.uid=sessionStorage.getItem("uid"),"client"==e.role,e.uid.indexOf("ZO")>=0&&(request=$.ajax({url:"../php/clientValidator.php",type:"post",data:e}),request.done(accessValidSuccess),request.fail(accessValidError))}function checkAdminDetails(e){var r=0;return sessionStorage.getItem("username")!=e.user.username?r++:sessionStorage.getItem("role")!=e.user.role?r++:sessionStorage.getItem("uid")!=e.user.uid&&r++,0==r}function accessValidSuccess(e,r,s){return"object"!=typeof e?void showErrorAlert("Seems Like an error on server end, Please Contact Developer"):e.error?void showErrorAlert(e.message):void(checkAdminDetails(e)&&setupCrmPage(e,function(){$pageLoaderModal.modal("hide")}))}function accessValidError(e,r,s){showErrorAlert("Please Check Your Internet Connection")}function setupCrmPage(e,r){var s=$("a#username"),a=$("a#uid"),o=$("a#role");s.text(e.user.username),a.text(e.user.uid),o.text(e.user.role),r()}function checkForUsage(){$("#card-exp-dat").monthpicker(),$("#billing-dob").datepicker({changeMonth:!0,changeYear:!0,yearRange:"1900:2017"}),$(".goHome").click(function(){window.sessionStorage.removeItem("username"),window.sessionStorage.removeItem("role"),window.sessionStorage.removeItem("uid"),window.location.href="../verify-user"}),$("#checkbox").mousedown(function(){$(this).is(":checked")||(this.checked=confirm("This is to confirm that billing address is same as shipping address?"),$(this).trigger("change"),$("#shipping-name").val($("#billing-name").val()),$("#shipping-email").val($("#billing-email").val()),$("#shipping-phone").val($("#billing-phone").val()),$("#shipping-company").val($("#billing-company").val()),$("#shipping-address").val($("#billing-address").val()),$("#shipping-city").val($("#billing-city").val()),$("#shipping-state").val($("#billing-state").val()),$("#shipping-country").val($("#billing-country").val()),$("#shipping-postal-code").val($("#billing-postal-code").val()))});var e;$("#purchase-form").submit(function(r){r.preventDefault();var s=$(this),a=s.serialize(),o=s.find("input, select, button, textarea");o.prop("disabled",!0),e&&e.abort(),e=$.ajax({url:"../php/testClientTransaction.php",type:"post",data:a}),e.done(function(e,r,s){e.indexOf("error")>=0?($("#error-message-box").text(e.substr(e.indexOf("error"),e.length)),$("#error-box").slideDown().addClass("is-visible")):e.indexOf("success")>=0?(console.log("Successfully Submitted"),console.log(e.substr(e.indexOf("success"),e.length)),$("#myModal").modal({backdrop:"static",keyboard:!1,show:!0})):console.log(e+"  ELSE COMMAND")}),e.fail(function(e,r,s){console.log(s)})})}var request,$pageLoaderModal=$("#pageLoaderModal");$(function(){showPageLoader(),checkForUsage(),authenticateUser()});