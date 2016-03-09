var modalView = {
  init: function() {
    // Build modal elements
    var imgModal = document.createElement('div');
    $(imgModal).addClass('modal fade');
    $(imgModal).attr('id', 'img-modal');
    $(imgModal).attr('tabindex', -1);
    $(imgModal).attr('aria-labelledby', 'myModalLabel');

    imgModal.appendChild(
      this.modalDialog = document.createElement('div'),
      $(this.modalDialog).addClass('modal-dialog'),
      $(this.modalDialog).attr('role', 'document')
    );

    this.modalDialog.appendChild(
      this.modalContent = document.createElement('div'),
      $(this.modalContent).addClass('modal-content')
    );

    // Modal header
    this.modalContent.appendChild(
      this.modalHeader = document.createElement('div'),
      $(this.modalHeader).addClass('modal-header')
    );

    this.modalHeader.appendChild(
      this.close = document.createElement('button'),
      $(this.close).addClass('close'),
      $(this.close).attr('type', 'button'),
      $(this.close).attr('data-dismiss', 'modal'),
      $(this.close).attr('aria-label', 'Close')
    );

    this.close.appendChild(
      this.closeSpan = document.createElement('span'),
      $(this.closeSpan).attr('aria-hidden', 'true'),
      $(this.closeSpan).text('x')
    );

    // Modal body
    this.modalContent.appendChild(
      this.modalBody = document.createElement('div'),
      $(this.modalBody).addClass('modal-body'),
      $(this.modalBody).attr('id', 'project-img' /* TODO: dynamic id name? */) //*************************

    );
    // Modal Image
    this.modalContent.appendChild(
      this.modalImg = document.createElement('img'),
      $(this.modalImg).addClass('project-img img-responsive'),
      $(this.modalImg).attr('src', '')
    );

    // Modal footer
    this.modalContent.appendChild(
      this.modalFooter = document.createElement('div'),
      $(this.modalFooter).addClass('modal-footer')
    );

    $('body').append(imgModal);

    // Build modal-footer elements
    this.leftNav = document.createElement('div');
    $(this.leftNav).addClass('arrow-nav left');
    $(this.leftNav).html('<i class="fa fa-arrow-circle-o-left fa-3x arrow-nav" data-target="#img-modal"></i>');
    $('.modal-footer').append(this.leftNav);

    this.rightNav = document.createElement('div');
    $(this.rightNav).addClass('arrow-nav right');
    $(this.rightNav).html('<span class="fa fa-arrow-circle-o-right fa-3x arrow-nav" data-target="#img-modal"></span>');

    // if (this.selectedContent.id != controller.getList.)
    $('.modal-footer').append(this.rightNav);

    // Nav button eventlistiners
    this.leftNav.addEventListener('click', function() {
      controller.decSelect();
    });
    this.rightNav.addEventListener('click', function() {
      controller.incSelect();
    });

    this.render();
  },
  render: function() {
    this.selectedContent = controller.getSelect();
    $(this.modalImg).attr('src', this.selectedContent.src);

    // hide nav arrow if selectedContent is first or last item in model array
    // first
    if (this.selectedContent.id == 0) {
      $(this.leftNav).addClass('hidden');
    } else {
      $(this.leftNav).removeClass('hidden');
    }
    // last
    if (this.selectedContent.id == controller.getModelLength()-1) {
      $(this.rightNav).addClass('hidden');
    } else {
      $(this.rightNav).removeClass('hidden');
    }

    console.log('modalView.render: ');
    console.log(this.selectedContent);
  }
};

