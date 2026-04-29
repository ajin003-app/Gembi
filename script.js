// Global variables with correct dates
const journeyStartDate = new Date('December 12, 2025 00:00:00');
const countdownStartDate = new Date('December 12, 2026 00:00:00');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start all time updates
    updateAllTime();
    
    // Update every second
    setInterval(updateAllTime, 1000);
    
    // Create initial floating hearts
    setTimeout(() => createHearts(15), 1000);
    
    // Add click events to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Improved video controls - allow user to play with sound
    const video = document.querySelector('.memory-video');
    if (video) {
        // Remove autoplay to prevent automatic playback
        video.autoplay = false;
        
        // Add click to play/pause functionality
        const videoOverlay = document.querySelector('.video-overlay');
        videoOverlay.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the card click
            
            if (video.paused) {
                video.play().catch(error => {
                    console.log('Video play failed:', error);
                    // User may need to interact first due to browser autoplay policies
                });
                videoOverlay.style.display = 'none';
            }
        });
        
        // Show overlay when video is paused
        video.addEventListener('pause', function() {
            videoOverlay.style.display = 'flex';
        });
        
        // Hide overlay when video is playing
        video.addEventListener('play', function() {
            videoOverlay.style.display = 'none';
        });
        
        // Initially show the overlay
        videoOverlay.style.display = 'flex';
    }
});

// Update all time displays
function updateAllTime() {
    const now = new Date();
    
    // Update live time
    updateLiveTime(now);
    
    // Update countdown since Dec 12, 2026
    updateCountdown(now);
    
    // Update detailed journey counters (from Dec 12, 2025 to now)
    updateJourneyCounters(now);
}

// Update live current time
function updateLiveTime(now) {
    // Format time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const liveTime = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const currentDate = now.toLocaleDateString('en-US', dateOptions);
    
    // Update displays
    document.getElementById('liveTimeNow').textContent = liveTime;
    document.getElementById('currentDateNow').textContent = currentDate;
}

// Update countdown since Dec 12, 2026 (for 1 year anniversary)
function updateCountdown(now) {
    const timeDiff = countdownStartDate.getTime() - now.getTime();
    
    if (timeDiff <= 0) {
        // If date has passed
        document.getElementById('countYears').textContent = '0';
        document.getElementById('countMonths').textContent = '0';
        document.getElementById('countDays').textContent = '0';
        document.getElementById('countHours').textContent = '00';
        document.getElementById('countMinutes').textContent = '00';
        document.getElementById('countSeconds').textContent = '00';
        document.getElementById('progressFill').style.width = '100%';
        document.getElementById('progressPercent').textContent = '100%';
        return;
    }
    
    // Calculate time until Dec 12, 2026
    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    // Calculate years, months, days
    const years = Math.floor(totalDays / 365);
    const daysAfterYears = totalDays % 365;
    const months = Math.floor(daysAfterYears / 30);
    const days = daysAfterYears % 30;
    
    // Calculate remaining time
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    // Update displays
    document.getElementById('countYears').textContent = years;
    document.getElementById('countMonths').textContent = months;
    document.getElementById('countDays').textContent = days;
    document.getElementById('countHours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countMinutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countSeconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update progress bar (1 year countdown)
    const totalYearTime = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
    const elapsedTime = totalYearTime - timeDiff;
    const progressPercent = Math.max(0, (elapsedTime / totalYearTime) * 100);
    
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    document.getElementById('progressPercent').textContent = `${progressPercent.toFixed(1)}%`;
}

// Update detailed journey counters from Dec 12, 2025 to NOW
function updateJourneyCounters(now) {
    const timeDiff = now.getTime() - journeyStartDate.getTime();
    
    if (timeDiff <= 0) {
        // If journey hasn't started yet
        resetJourneyCounters();
        return;
    }
    
    // Calculate total time in different units
    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    // Calculate years, months, days (more accurate)
    let years = 0;
    let months = 0;
    let days = 0;
    let remainingHours = totalHours;
    
    // Calculate years (approximate)
    if (totalDays >= 365) {
        years = Math.floor(totalDays / 365);
        days = totalDays % 365;
    } else {
        days = totalDays;
    }
    
    // Calculate months from remaining days
    if (days >= 30) {
        months = Math.floor(days / 30);
        days = days % 30;
    }
    
    // Calculate remaining hours, minutes, seconds
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    // Update all counters
    // Desktop counters
    document.getElementById('yearsSince').textContent = years;
    document.getElementById('monthsSince').textContent = months;
    document.getElementById('daysSince').textContent = days;
    document.getElementById('hoursSince').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutesSince').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('secondsSince').textContent = seconds.toString().padStart(2, '0');
    
    // Mobile counters
    document.getElementById('mobileYearsSince').textContent = years;
    document.getElementById('mobileMonthsSince').textContent = months;
    document.getElementById('mobileDaysSince').textContent = days;
    document.getElementById('mobileHoursSince').textContent = hours.toString().padStart(2, '0');
    document.getElementById('mobileMinutesSince').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('mobileSecondsSince').textContent = seconds.toString().padStart(2, '0');
}

function resetJourneyCounters() {
    // Desktop counters
    document.getElementById('yearsSince').textContent = '0';
    document.getElementById('monthsSince').textContent = '0';
    document.getElementById('daysSince').textContent = '0';
    document.getElementById('hoursSince').textContent = '00';
    document.getElementById('minutesSince').textContent = '00';
    document.getElementById('secondsSince').textContent = '00';
    
    // Mobile counters
    document.getElementById('mobileYearsSince').textContent = '0';
    document.getElementById('mobileMonthsSince').textContent = '0';
    document.getElementById('mobileDaysSince').textContent = '0';
    document.getElementById('mobileHoursSince').textContent = '00';
    document.getElementById('mobileMinutesSince').textContent = '00';
    document.getElementById('mobileSecondsSince').textContent = '00';
}

// Show message when memory card is clicked
function showMessage(message) {
    const messageDisplay = document.getElementById('messageDisplay');
    messageDisplay.textContent = message;
    messageDisplay.style.animation = 'none';
    
    setTimeout(() => {
        messageDisplay.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    // Create floating hearts
    createHearts(12);
}

// Create floating hearts animation
function createHearts(count) {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['💖', '💕', '💝', '💗', '💓', '💞', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random position and size
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 25 + 20;
        const duration = Math.random() * 2 + 2;
        const rotation = Math.random() * 360;
        
        // Set styles
        heart.style.cssText = `
            left: ${startX}px;
            font-size: ${size}px;
            animation-duration: ${duration}s;
            color: ${getRandomColor()};
            transform: rotate(${rotation}deg);
        `;
        
        // Add to container
        heartsContainer.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, duration * 1000);
    }
}

// Get random color for hearts
function getRandomColor() {
    const colors = [
        '#FF6B8B', '#FF8E9E', '#9D4EDD', '#C77DFF',
        '#00B4D8', '#90E0EF', '#06D6A0', '#8AC926',
        '#FFD166', '#EF476F', '#118AB2', '#073B4C'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS for floating hearts if not already added
if (!document.querySelector('#heartsStyle')) {
    const style = document.createElement('style');
    style.id = 'heartsStyle';
    style.textContent = `
        .floating-heart {
            position: fixed;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 3s linear forwards;
        }
        
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}