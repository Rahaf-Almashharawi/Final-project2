document.addEventListener("DOMContentLoaded", function () {
	// Retrieve cart items from local storage
	const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

	// Display each item in the orders div
	const ordersDiv = document.getElementById("orders");
	const totalPriceSpan = document.getElementById("total-price");

	let totalPrice = 0;

	cartItems.forEach((item) => {
		// Create a div for each item
		const orderDiv = document.createElement("div");

		const orderName = document.createElement("p");
		orderName.textContent = item.itemName;

		const orderPrice = document.createElement("p");
		orderPrice.textContent = `$${item.price.toFixed(2)}`;

		const orderCount = document.createElement("p");
		orderCount.textContent = `${item.count || 1}`;

		// Append the p elements to the div
		orderDiv.appendChild(orderName);
		orderDiv.appendChild(orderPrice);
		orderDiv.appendChild(orderCount);

		// Append the div to the ordersDiv
		ordersDiv.appendChild(orderDiv);

		totalPrice += item.price * (item.count || 1);
	});

	// Display the total price
	totalPriceSpan.textContent = totalPrice.toFixed(2);

	// Add event listener for the "Approve Order" button
	const approveOrderBtn = document.querySelector(".approve-order-btn");
	approveOrderBtn.addEventListener("click", function () {
		generatePDF();
		localStorage.clear();
		window.Location.href = "./bage2.html";
	});

	// Function to generate and download the PDF
	function generatePDF() {
		// Create a new instance of jsPDF
		const { jsPDF } = window.jspdf;
		const pdf = new jsPDF();

		// Add content to the PDF
		pdf.text("Order Details", 20, 20);
		pdf.text("------------------------------", 20, 30);

		// Loop through cart items and add them to the PDF
		let yPosition = 40;
		cartItems.forEach((item) => {
			const orderDetails = `${item.itemName} - $${item.price.toFixed(2)} - ${
				item.count || 1
			}`;
			pdf.text(orderDetails, 20, yPosition);
			yPosition += 10;
		});

		// Add total price to the PDF
		pdf.text("------------------------------", 20, yPosition);
		pdf.text(`Total Price: $${totalPrice.toFixed(2)}`, 20, yPosition + 10);

		// Save the PDF to the desktop
		if (totalPrice == 0) {
			alert("there is nothing to order");
		} else {
			pdf.save("order_details.pdf");
		}
	}
});
