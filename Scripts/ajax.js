//Initializes the hiding and showing of the loading picture upon ajax
$(document).ready(function () {
    //Logic which shows and hides the loading div with loading pic based on ajax calls
    $('.loading').hide();
    $(document)
        .ajaxStart(function() {
            $('.loading').show();
        })
        .ajaxStop(function() {
            $('.loading').hide();
        });
});