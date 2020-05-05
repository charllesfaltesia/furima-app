$(document).on('turbolinks:load', function(){
  $(function(){

    function buildHTML(count) {
      var html = `<div class="preview-box" id="preview-box__${count}">
                    <div class="upper-box">
                      <img src="" alt="preview" width="122" height="90">
                    </div>
                  </div>`
      return html;
    }

    if (window.location.href.match(/\/items\/\d+\/edit/)){

      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
      
      $('.preview-box').each(function(index, box){
        $(box).attr('id', `preview-box__${index}`);
      })

      $('.destroy-box').each(function(index, box){
        $(box).attr('id', `destroy_btn_${index}`);
      })
      var count = $('.preview-box').length;

      if (count == 5) {
        $('.label-content').hide();
      }
      
      if (count != 0){
        $('.drop').hide();
      }
    }

    function setLabel() {

      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
    }

    $(document).on('change', '.hidden-field', function() {
      $('.drop').hide();
      setLabel();

      var id = $(this).attr('id').replace(/[^0-9]/g, '');

      $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});

      var file = this.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = function() {
        var image = this.result;

        if ($(`#preview-box__${id}`).length == 0) {
          var count = $('.preview-box').length;
          var html = buildHTML(id);

          var prevContent = $('.label-content').prev();
          $(prevContent).append(html);
        }

        $(`#preview-box__${id} img`).attr('src', `${image}`);
        var count = $('.preview-box').length;

        if (count == 5) { 
          $('.label-content').hide();
        }


        if ($(`#item_images_attributes_${id}__destroy`)){
          $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
        } 

        setLabel();

        if(count < 5){
          $('.label-box').attr({id: `label-box--${count}`,for: `item_images_attributes_${count}_image`});
        }
      }
    });

    $(document).on('click', '.destroy-box', function() {
      var count = $('.preview-box').length;
      setLabel(count);
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      $(`#preview-box__${count - 1}`).remove();

      if ($(`#item_images_attributes_${count - 1}__destroy`).length == 0) {

        $(`#item_images_attributes_${count - 1}_image`).val("");
        var count = $('.preview-box').length;

        if (count == 4) {
          $('.label-content').show();
          $('.drop').hide();
        }
        setLabel(count);
        if(count < 5){
          $('.label-box').attr({id: `label-box--${count}`,for: `item_images_attributes_${count}_image`});
        }

        if(count == 0){
          $('.drop').show();
        }

      } else {

        $(`#item_images_attributes_${count - 1}__destroy`).prop('checked',true);

        if (count == 5) {
          $('.label-content').show();
          $('.drop').hide();
        }

        if(count - 1 == 0){
          $('.drop').show();
        }

        setLabel();

        if(id < 5){
          $('.label-box').attr({id: `label-box--${count - 1}`,for: `item_images_attributes_${count - 1}_image`});
        }
      }
    });
  });
});