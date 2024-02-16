const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    tabContents.forEach((content) => content.classList.remove('active'));

    // Add 'active' class to the selected button and content
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

function goToPage() {
  window.location.href = 'https://www.contpaqi.com/contabilidad';
}