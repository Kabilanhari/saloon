// Show selected category services
function showCategory(category) {
    document.querySelectorAll(".category").forEach(cat => cat.classList.add("hidden"));
    document.getElementById(category).classList.remove("hidden");
}

// Update Cart
let cart = [];
document.querySelectorAll("input[type='checkbox']").forEach(item => {
    item.addEventListener("change", function() {
        let name = this.getAttribute("data-name");
        let price = parseInt(this.value);
        
        if (this.checked) {
            cart.push({ name, price });
        } else {
            cart = cart.filter(service => service.name !== name);
        }
        
        updateCart();
    });
});

// Update Cart UI
function updateCart() {
    let cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        cartList.innerHTML += `<li>${item.name} - $${item.price}</li>`;
    });

    document.getElementById("total").innerText = `$${total}`;
}

// Navigate to Booking Page
function goToBooking() {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "booking.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const proceedBtn = document.getElementById("proceed-btn");
    const confirmBookingBtn = document.getElementById("confirm-booking");

    if (proceedBtn) {
        proceedBtn.addEventListener("click", () => {
            window.location.href = "customer-details.html";
        });
    }

    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener("click", () => {
            window.location.href = "confirmation.html";
        });
    }
});

// date
let currentDate = new Date(); // Set the initial date to today

    // Function to update the displayed date
    function updateDateDisplay() {
        const options = { day: '2-digit', month: 'short', weekday: 'short' };
        document.getElementById('selected-date').textContent = currentDate.toLocaleDateString('en-GB', options);
    }

    // Function to change the date forward or backward
    function changeDate(days) {
        currentDate.setDate(currentDate.getDate() + days);
        updateDateDisplay();
    }

    // Ensure the date is shown immediately when the page loads
    window.onload = function() {
        updateDateDisplay();
    };

// time
 const timeSlotsContainer = document.getElementById('time-slots');

    function generateTimeSlots() {
        let startTime = 9 * 60; // 9:00 AM in minutes
        let endTime = 21 * 60;  // 9:00 PM in minutes (included)

        for (let minutes = startTime; minutes <= endTime; minutes += 30) { // 30-min interval
            let hours = Math.floor(minutes / 60);
            let mins = minutes % 60;
            let ampm = hours >= 12 ? 'PM' : 'AM';
            let displayHour = hours > 12 ? hours - 12 : hours;
            displayHour = displayHour === 0 ? 12 : displayHour; // Convert 0 AM/PM to 12
            let timeString = `${displayHour}:${mins.toString().padStart(2, '0')} ${ampm}`;

            let button = document.createElement('button');
            button.textContent = timeString;
            button.classList.add('time-slot');
            button.onclick = () => selectTime(button);

            timeSlotsContainer.appendChild(button);
        }
    }

    function selectTime(selectedButton) {
        document.querySelectorAll('.time-slot').forEach(button => {
            button.classList.remove('selected');
        });
        selectedButton.classList.add('selected');
    }

    generateTimeSlots();

