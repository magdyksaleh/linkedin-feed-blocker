# LinkedIn Feed Blocker

A browser extension that blocks LinkedIn's distracting feed while preserving essential functionality like messaging, notifications, and profile access. Stay focused on professional networking without the endless scroll.

## Features

- ✅ Blocks LinkedIn feed posts and updates
- ✅ Hides sponsored content and ads
- ✅ Removes "People you may know" suggestions
- ✅ Preserves messaging functionality
- ✅ Keeps notifications working
- ✅ Maintains profile and connection pages
- ✅ Shows friendly blocked message on feed page
- ✅ Works with LinkedIn's dynamic content loading

## Installation

### Chrome/Chromium/Edge

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `linkedin-feed-blocker` folder
6. The extension will be installed and active immediately

### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Navigate to the extension folder and select `manifest.json`
6. The extension will be loaded temporarily (until browser restart)

**Note for Firefox:** For permanent installation, the extension would need to be signed by Mozilla or installed as a developer extension.

## How It Works

The extension uses a content script that runs on all LinkedIn pages (`*.linkedin.com/*`) and:

1. **CSS Blocking**: Uses `styles.css` to immediately hide known feed elements
2. **JavaScript Monitoring**: Runs `content.js` to:
   - Hide feed posts using multiple selectors (LinkedIn changes these occasionally)
   - Monitor for dynamically loaded content using MutationObserver
   - Preserve important elements (navigation, messaging, notifications)
   - Display a friendly message where the feed used to be

### Technical Implementation

- **Manifest Version**: Uses Manifest v2 (compatible with older browsers)
- **Permissions**: Only requests access to `*.linkedin.com/*`
- **Content Scripts**: Runs at `document_start` for immediate blocking
- **No Background Scripts**: No persistent background processes
- **No Network Requests**: All processing happens locally

## Security & Privacy

### Fully Local Operation
- **No external servers**: Extension runs entirely in your browser
- **No data collection**: No user data is collected, stored, or transmitted
- **No network requests**: Extension doesn't make any HTTP requests
- **No tracking**: No analytics or usage tracking

### Minimal Permissions
- **Limited scope**: Only requests permission for `*.linkedin.com/*`
- **No host permissions**: Cannot access other websites
- **No storage permissions**: Doesn't store any data
- **No tabs permissions**: Cannot access other browser tabs

## What Gets Blocked

- Main LinkedIn feed posts and updates
- Sponsored content and advertisements
- "People you may know" suggestions
- Activity updates from connections
- Recommended content

## What Stays Functional

- Navigation bar and search
- Messaging system
- Notifications
- Your profile and settings
- Other users' profiles
- Company pages
- Job listings (when accessed directly)
- Learning content (when accessed directly)

## Customization

To modify what gets blocked, edit the selectors in:

- `content.js`: Lines 8-16 (feedSelectors array)
- `styles.css`: Lines 4-9 (CSS selectors)

LinkedIn occasionally updates their HTML structure, so selectors may need updating.

## Troubleshooting

**Feed still showing?**
- LinkedIn updates their selectors frequently
- Check browser console for any JavaScript errors
- Try disabling and re-enabling the extension

**Important features broken?**
- Check if elements are in the `keepVisible` array (content.js:68-76)
- Verify CSS overrides in styles.css (lines 30-38)

**Extension not loading?**
- Ensure Developer mode is enabled
- Check that all files are in the same directory
- Look for errors in the Extensions page

## Contributing

To add new blocking rules or fix broken functionality:

1. Inspect LinkedIn's HTML to find new selectors
2. Add selectors to both `content.js` and `styles.css`
3. Test with different LinkedIn page types
4. Ensure essential features remain functional

## License

This project is open source and available under the MIT License.
