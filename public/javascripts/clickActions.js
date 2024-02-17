function updateItemsAndSubmit() {
    // Retrieve current items array or initialize empty array
    const items = JSON.parse(document.getElementById('itemsInput').value || '[]'); 
    document.querySelectorAll('[name^="items"]').forEach((input) => {
        const index = input.dataset.index;
        const productId = input.value;
        // Parse quantity as integer
        const quantity = parseInt(input.value, 10); 
        // Update items array with new quantity
        items[index] = { productId, quantity }; 
    });
    // Update hidden input value with updated items array
    document.getElementById('itemsInput').value = JSON.stringify(items); 
    
    // Submit the form
    document.getElementById('orderForm').submit(); 
}