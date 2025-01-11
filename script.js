document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. Real-time clock ========== 
    function updateTime() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const hStr = hours.toString().padStart(2, '0');
      const mStr = minutes.toString().padStart(2, '0');
      const timeString = `${hStr}:${mStr} ${amPm}`;
      document.getElementById('current-time').textContent = timeString;
    }
    updateTime();
    setInterval(updateTime, 60 * 1000); // every minute
  
    // ========== 2. Screen Navigation ==========
    // Helper function to show/hide screens
    function showScreen(screenId) {
      // Hide all screens
      document.querySelectorAll('.screen').forEach(div => {
        div.classList.remove('active');
      });
      // Show the requested screen
      const screenDiv = document.getElementById(screenId);
      if (screenDiv) {
        screenDiv.classList.add('active');
      }
    }
  
    // Start on the welcome screen (in case .active wasn't set in HTML)
    showScreen('welcome-screen');
  
    // Hook up buttons
    const toInventoryBtn = document.getElementById('toInventoryBtn');
    if (toInventoryBtn) {
      toInventoryBtn.addEventListener('click', () => {
        showScreen('inventory-screen');
      });
    }
  
    const backFromInventoryBtn = document.getElementById('backFromInventoryBtn');
    if (backFromInventoryBtn) {
      backFromInventoryBtn.addEventListener('click', () => {
        showScreen('welcome-screen');
      });
    }
  
    const toFavouritesBtn = document.getElementById('toFavouritesBtn');
    if (toFavouritesBtn) {
      toFavouritesBtn.addEventListener('click', () => {
        showScreen('favourites-screen');
      });
    }
  
    const backFromFavouritesBtn = document.getElementById('backFromFavouritesBtn');
    if (backFromFavouritesBtn) {
      backFromFavouritesBtn.addEventListener('click', () => {
        showScreen('inventory-screen');
      });
    }
  
    const toRecipesBtn = document.getElementById('toRecipesBtn');
    if (toRecipesBtn) {
      toRecipesBtn.addEventListener('click', () => {
        showScreen('recipes-screen');
      });
    }
  
    const backFromRecipesBtn = document.getElementById('backFromRecipesBtn');
    if (backFromRecipesBtn) {
      backFromRecipesBtn.addEventListener('click', () => {
        showScreen('inventory-screen');
      });
    }
  
    // Filters
    const openFiltersBtn = document.getElementById('openFiltersBtn');
    if (openFiltersBtn) {
      openFiltersBtn.addEventListener('click', () => {
        showScreen('filters-screen');
      });
    }
  
    const closeFiltersBtn = document.getElementById('closeFiltersBtn');
    const backFromFiltersBtn = document.getElementById('backFromFiltersBtn');
    if (closeFiltersBtn) {
      closeFiltersBtn.addEventListener('click', () => {
        // Maybe just keep it on the filters screen and let them 
        // check/uncheck. Or you can hide it again.
      });
    }
    if (backFromFiltersBtn) {
      backFromFiltersBtn.addEventListener('click', () => {
        showScreen('recipes-screen');
      });
    }
  
    // Add more event listeners as needed...
  
  });
  