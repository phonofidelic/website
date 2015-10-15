var modalView = {
  init: function() {
    // Build modal elements
    var imgModal = document.createElement('div');
    $(imgModal).addClass('modal fade');
    $(imgModal).attr('id', 'img-modal');
    $(imgModal).attr('tabindex', -1);
    $(imgModal).attr('aria-labelledy', 'myModalLabel');

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

    // // Build modal-footer elements
    // var leftNav = document.createElement('div');
    // $(leftNav).addClass('arrow-nav left');
    // $(leftNav).html('<span class="glyphicon glyphicon-arrow-left" data-target="#img-modal"></span>');
    // $('.modal-footer').append(leftNav);

    // var rightNav = document.createElement('div');
    // $(rightNav).addClass('arrow-nav right');
    // $(rightNav).html('<span class="glyphicon glyphicon-arrow-right" data-target="#img-modal"></span>');
    // $('.modal-footer').append(rightNav);

    // // Nav button eventlistiners
    // leftNav.addEventListener('click', function() {
    //   controller.decSelect();
    // });
    // rightNav.addEventListener('click', function() {
    //   controller.incSelect();
    // });

    this.render();
  },
  render: function() {
    this.selectedContent = controller.getSelect();
    $(this.modalImg).attr('src', this.selectedContent.src);

    console.log('modalView.render: ');
    console.log(this.selectedContent);
  }
};

