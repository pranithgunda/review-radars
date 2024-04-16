document.getElementById('search-button').addEventListener('click', function(event) {
    var productNameInput = document.getElementById('product-name');
    if (productNameInput.value.trim() === '') {
      // If the input field is empty, open the modal
      document.getElementById('myModal').style.display = 'block';
      event.preventDefault(); // Prevent the form from submitting
    }
  });

  