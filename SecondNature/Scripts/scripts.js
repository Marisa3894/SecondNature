$('.mybtn').on('click', function (event) {
    event.preventDefault();
    var url = $(this).data('target');
    location.replace(url);
});