$(function() {
    authenticateUser();
    showPageLoader();
});

// empty var to hold our requests
var request;
// modal on page load
var $pageLoaderModal = $("#pageLoaderModal");


function showErrorAlert($msg) {
    var $alertDiv = $('#alert-error-div');
    var $alertdisplay = $("#alert-error-div > .alert.alert-danger");

    // change the text and show it
    $alertdisplay.text($msg);        
    $alertDiv.slideDown().addClass("is-visible");
}

function showPageLoader() {

    // init Loading Modal
    $pageLoaderModal.modal({
        backdrop: 'static',  
        keyboard: false,
        show: true
    });

    // start animating
    $(".progress-bar").css("width", "100%");
}


function authenticateUser() {
    // abort any pending requests
    if (request) {
        request.abort();
    }

    // check if login is sucessfull
    var $data = {};
    $data.role = sessionStorage.getItem("role");
    $data.username = sessionStorage.getItem("username");
    $data.uid = sessionStorage.getItem("uid");

    if ($data.role == "admin", $data.uid.indexOf("AD") >= 0) {
        request = $.ajax({
            url: "../php/adminValidator.php",
            type: "post",
            data: $data
        });

        // if successfully done
        request.done(accessValidSuccess);

        // if any error occured
        request.fail(accessValidError);
    }
}


function checkAdminDetails(response) {

    var $flag = 0;

    if (sessionStorage.getItem("username") != response.user.username) {
        $flag++;
    } else if (sessionStorage.getItem("role") != response.user.role) {
        $flag++;
    } else if (sessionStorage.getItem("uid") != response.user.uid) {
        $flag++;
    }
    

    // if everything checks out
    if ($flag == 0) {
        return true;
    } else {
        return false;
    }
}

function accessValidSuccess(response, status, jqXHR) {
    if (typeof response != 'object') {
        console.log(response);
        return;
    } 

    if (response.error) {
        // change the text and show it
        showErrorAlert(response.message);
        return;
    }

    if (checkAdminDetails(response)) {
        // show everything
        $pageLoaderModal.modal("hide");
    }
}

function accessValidError(jqXHR, status, error) {
    showErrorAlert("Please Check Your Internet Connection");
}