const openModalButton= document.querySelector('#modal')
const closeModalButton= document.querySelector('[data-close-button]')
const overlay=document.getElementById('overlay');

console.log(openModalButton);
openModalButton.addEventListener('click',()=>{
  const modal=document.querySelector(button.dataset.modalTarget)
  openModal(modal)
})
closeModalButton.addEventListener('click',()=>{
  const modal=button.closest('modal')
  closeModal(modal)
})

function openModal(modal){
  if(modal === null)return;
  modal.classList.add('active')
  overlay.classList.add('active')
}
function closeModal(modal){
  if(modal === null)return;
  modal.classList.remove('active')
  overlay.classList.remove('active')
}