function showErrorAlert(e){var a=$("#alert-error-div"),t=$("#alert-error-div > .alert.alert-danger");t.text(e),a.slideDown().addClass("is-visible")}function showPageLoader(){$pageLoaderModal.modal({backdrop:"static",keyboard:!1,show:!0}),$(".progress-bar").css("width","100%")}function authenticateUser(){request&&request.abort();var e={};e.role=sessionStorage.getItem("role"),e.username=sessionStorage.getItem("username"),e.uid=sessionStorage.getItem("uid"),"admin"==e.role,e.uid.indexOf("AD")>=0&&(request=$.ajax({url:"../php/adminValidator.php",type:"post",data:e}),request.done(accessValidSuccess),request.fail(accessValidError))}function checkAdminDetails(e){var a=0;return sessionStorage.getItem("username")!=e.user.username?a++:sessionStorage.getItem("role")!=e.user.role?a++:sessionStorage.getItem("uid")!=e.user.uid&&a++,0==a}function accessValidSuccess(e,a,t){return"object"!=typeof e?void showErrorAlert("Seems Like an error on server end, Please Contact Developer"):e.error?void showErrorAlert(e.message):void(checkAdminDetails(e)&&setupCrmPage(e,function(){$pageLoaderModal.modal("hide")}))}function accessValidError(e,a,t){showErrorAlert("Please Check Your Internet Connection")}function setupTable(e,a,t){var r=$("#info-body-row"),s=$("#transaction-body");"object"!=typeof e&&r.html("<div class='col-md-12'><div class='alert alert-danger'>"+e.message+"</div>"),e.error&&r.html("<div class='col-md-12'><div class='alert alert-danger'>"+e.message+"</div>");for(var o="",n=0;n<e.transactions.length;n++)x+="<tr><td>"+e.transactions[n].created_at+"</td><td data-uid="+e.transactions[n].uid+">"+e.transactions[n].uid+"</td><td>"+e.transactions[n].card_cust_name+"</td><td>"+e.transactions[n].amount+"</td><td>"+e.transactions[n].user+"</td><td>"+e.transactions[n].source+"</td></tr>";s.html(o),console.log(e.transactions)}function setupTableError(e,a,t){var r=$("#info-body-row");r.html("<div class='col-md-12'><div class='alert alert-danger'>"+response.message+"</div>")}function setupCrmPage(e,a){var t=$("a#username"),r=$("a#uid"),s=$("a#role");t.text(e.user.username),r.text(e.user.uid),s.text(e.user.role),request=$.ajax({url:"../php/getTransactions.php",type:"get"}),request.done(setupTable),request.fail(setupTableError),a()}function checkForUsage(){var e=$("#infoModal"),a=$("#formModal"),t=$("#search-btn"),r=$("#update-btn"),s=$("#formModal-form");t.click(function(){a.modal("show")}),r.click(function(){e.modal("show")}),$("#formModalSelect").change(function(){"UID"==this.value?($("#transaction-term").slideDown().addClass("is-visible"),$("#card-number").hide(),$("#date").hide()):"CARD"==this.value?($("#card-number").slideDown().addClass("is-visible"),$("#transaction-term").hide(),$("#date").hide()):"DAY"==this.value?($("#date").slideDown().addClass("is-visible"),$("#card-number").hide(),$("#transaction-term").hide()):$("#transaction-term").slideDown().addClass("is-visible")}),s.submit(function(e){e.preventDefault(),$data=s.serialize();var a=s.find("input, select, button, textarea");a.prop("disabled",!0),request&&request.abort(),request=$.ajax({url:"../php/getTransactions.php",type:"get"}),request.done(setupDataTable),request.fail(setupDataTableError)})}function setupDataTable(){}var request,$pageLoaderModal=$("#pageLoaderModal");$(function(){checkForUsage(),authenticateUser()});