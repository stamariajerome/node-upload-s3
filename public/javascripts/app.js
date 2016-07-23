$(function() {
  $('#btn-upload').on('click', function() {
    uploadNow();
  });

  function uploadNow() {
    var uploadFile = $('#upload-file');
    //file is available
    if(!uploadFile.val()) {
      var form = new FormData();
      form.append('upload', uploadFile[0].files[0]);
      $.ajax({
        method: 'post',
        url: 'uploads',
        contentType: 'application/json',
        success: function() {

        }
      });
    }
    $.ajax({});
  }
});
