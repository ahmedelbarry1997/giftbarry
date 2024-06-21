document.addEventListener('DOMContentLoaded', function() {
  const icon = document.getElementById('icon');
  const modalBg = document.getElementById('modal-bg');
  const closeModal = document.getElementById('close-modal');

  icon.addEventListener('click', function() {
    modalBg.style.display = 'block';
  });

  closeModal.addEventListener('click', function() {
    modalBg.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === modalBg) {
      modalBg.style.display = 'none';
    }
  });
});
    

// Function to initialize the counter from localStorage on page load
function initializeCounter() {
  let counter = localStorage.getItem('counter');
  if (counter !== null) {
    document.getElementById('counter').textContent = counter;
  }
}

// Function to update the counter and store in localStorage
function updateCounter(amount) {
  let counter = parseInt(localStorage.getItem('counter')) || 0;
  counter += amount;
  localStorage.setItem('counter', counter);
  document.getElementById('counter').textContent = counter;
}

// Function to increment the counter if it's a new day
function checkAndIncrement() {
  let lastVisit = localStorage.getItem('lastVisit');
  let today = new Date().toLocaleDateString();

  if (lastVisit !== today) {
    localStorage.setItem('lastVisit', today);
    updateCounter(5); // Increment by 5 on first visit of the day
  }
}

// Function to share on Facebook
function shareOnFacebook() {
  let url = encodeURIComponent(window.location.href);
  let popup = window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'Share on Facebook', 'width=600,height=400');

  let interval = setInterval(function() {
    if (popup.closed) {
      clearInterval(interval);
      updateCounter(10); // Increment by 10 after successful share
    }
  }, 1000); // Check every second
}

// Function to share on WhatsApp
function shareOnWhatsApp() {
  let url = encodeURIComponent(window.location.href);
  let popup = window.open('https://api.whatsapp.com/send?text=' + url, 'Share on WhatsApp', 'width=600,height=400');

  let interval = setInterval(function() {
    if (popup.closed) {
      clearInterval(interval);
      updateCounter(10); // Increment by 10 after successful share
    }
  }, 1000); // Check every second
}

// Function to send current counter to WhatsApp
function sendToWhatsApp() {
  let counterValue = localStorage.getItem('counter');
  let phoneNumber = '201016670354'; // Replace with the desired WhatsApp number

  let message = 'برجاء تحويل النقاط التى حصلت عليها الى اموال او هدايا : ' + counterValue;
  let url = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + encodeURIComponent(message);

  window.open(url, '_blank');
}

// Function to reset the counter after 30 days
function resetCounterAfter30Days() {
  let lastReset = localStorage.getItem('lastReset');

  if (!lastReset) {
    lastReset = new Date().getTime();
    localStorage.setItem('lastReset', lastReset);
  }

  let thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  if (new Date(parseInt(lastReset)) < thirtyDaysAgo) {
    localStorage.setItem('counter', '0');
    localStorage.setItem('lastReset', new Date().getTime());
    document.getElementById('counter').textContent = '0';
  }
}

// Call initialization function on page load
initializeCounter();

// Call function to check and increment the counter for today
checkAndIncrement();

// Call function to reset the counter after 30 days
resetCounterAfter30Days();

