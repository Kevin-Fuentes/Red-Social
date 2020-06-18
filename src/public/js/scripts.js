$('#check').hide()
$('#btn-toggle-comment').click(function(e){
e.preventDefault()
$('#check').slideToggle();
})


$('#btn-like').click(function(e){
e.preventDefault()
let imgId = $(this).data('id')
$.post('/images/'+imgId+'/like')
.done(data=>{
     $('.likes-count').text(data.like)
})
})

$('#btn-delete').click(function(e){e.preventDefault()
      let $this = $(this)
      const response =  confirm('are you sure you want to delete this image ? ')
     if(response){
          let imgId=$this.data('id')
         $.ajax({
              url:'/images/' +imgId,
         type:'DELETE'
          }).done(function(result){
$this.removeClass('btn-danger').addClass('btn-success')
$this.find('i').removeClass('fa-times').addClass('fa-check')
$.this.append('<span>Deleted!</span>')
          })
     }
})