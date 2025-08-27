// LinkedIn Feed Blocker Content Script
(function() {
    'use strict';
    
    // Function to hide the feed
    function hideFeed() {
        // Main feed container selectors (LinkedIn updates these occasionally)
        const feedSelectors = [
            '[data-chameleon-result-urn*="update"]',
            '.feed-shared-update-v2',
            '.occludable-update',
            'div[data-id*="urn:li:activity"]',
            '.scaffold-finite-scroll__content > div',
            'main .scaffold-finite-scroll',
            '[role="main"] .scaffold-finite-scroll'
        ];
        
        // Hide individual posts
        feedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el && !el.classList.contains('feed-blocked')) {
                    el.style.display = 'none';
                    el.classList.add('feed-blocked');
                }
            });
        });
        
        // Hide the entire feed container on homepage
        const feedContainer = document.querySelector('main .scaffold-finite-scroll');
        if (feedContainer && window.location.pathname === '/feed/') {
            feedContainer.style.display = 'none';
        }
        
        // Add a message where the feed was
        addFeedBlockedMessage();
    }
    
    // Function to add a message explaining the feed is blocked
    function addFeedBlockedMessage() {
        if (window.location.pathname === '/feed/' && !document.querySelector('.feed-blocked-message')) {
            const main = document.querySelector('main');
            if (main) {
                const message = document.createElement('div');
                message.className = 'feed-blocked-message';
                message.innerHTML = `
                    <div style="
                        text-align: center; 
                        padding: 40px 20px; 
                        background: #f3f2ef; 
                        border-radius: 8px; 
                        margin: 20px;
                        color: #666;
                    ">
                        <h2 style="color: #0077b5; margin-bottom: 10px;">📵 LinkedIn Feed Blocked</h2>
                        <p>Your feed is hidden to help you stay focused!</p>
                        <p>You can still access messages, notifications, and your profile.</p>
                    </div>
                `;
                main.appendChild(message);
            }
        }
    }
    
    // Function to preserve important functionality
    function preserveImportantElements() {
        // Make sure navigation, messages, notifications stay visible
        const keepVisible = [
            '.global-nav',
            '[data-control-name="nav.messaging"]',
            '[data-control-name="nav.notifications"]',
            '.msg-overlay-bubble-header',
            '.notifications-overlay',
            '.search-global-typeahead',
            'header'
        ];
        
        keepVisible.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el) {
                    el.style.display = '';
                    el.style.visibility = 'visible';
                }
            });
        });
    }
    
    // Observer to handle dynamic content loading
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                // Wait a bit for LinkedIn's JavaScript to finish loading
                setTimeout(() => {
                    hideFeed();
                    preserveImportantElements();
                }, 100);
            }
        });
    });
    
    // Start observing
    function startObserver() {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        hideFeed();
        preserveImportantElements();
        startObserver();
        
        // Also run periodically as backup
        setInterval(() => {
            hideFeed();
            preserveImportantElements();
        }, 2000);
    }
    
    console.log('LinkedIn Feed Blocker: Active');
})();
