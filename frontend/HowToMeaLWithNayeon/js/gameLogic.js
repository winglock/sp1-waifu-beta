/**
 * gameLogic.js - SHA-256 Hash Generation System for Visual Novel Choices
 * 
 * This file provides the integration between the visual novel engine and 
 * the backend server for generating and tracking SHA-256 hashes of player choices.
 */

// Constants to maintain consistency with backend implementation
const GAME_ID_PREFIX = "MyVisualNovelV1_PathHash_";
const INITIAL_STATE_STRING = "INITIAL_STATE";
const API_ENDPOINT = "/record-choice";

// Game state tracking
let currentPathHash = null;
let choicePath = [];

/**
 * Calculate the initial SHA-256 hash on page load
 * This should match the backend's implementation
 */
function calculateInitialHash() {
    const initialData = `${GAME_ID_PREFIX}${INITIAL_STATE_STRING}`;
    return sha256(initialData);
}

/**
 * SHA-256 implementation for the browser
 * Using SubtleCrypto API to calculate the hash
 * @param {string} message - The string to hash
 * @returns {Promise<string>} - Returns a promise resolving to a hex hash string
 */
async function sha256(message) {
    // Convert the message string to a Uint8Array
    const msgBuffer = new TextEncoder().encode(message);
    
    // Hash the message using SubtleCrypto
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    
    // Convert the hash buffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

/**
 * Initialize the game progress system
 * Called when the page loads
 */
async function loadGameProgress() {
    console.log("[gameLogic.js] Initializing choice tracking system...");
    try {
        // Calculate the initial hash (H_0)
        currentPathHash = await calculateInitialHash();
        console.log("[gameLogic.js] Initial hash (H_0) calculated:", currentPathHash);
        
        // Load any saved progress from localStorage (optional)
        const savedHash = localStorage.getItem('currentPathHash');
        const savedPath = localStorage.getItem('choicePath');
        
        if (savedHash && savedPath) {
            currentPathHash = savedHash;
            choicePath = JSON.parse(savedPath);
            console.log("[gameLogic.js] Loaded saved progress:", { currentPathHash, choiceCount: choicePath.length });
        }
    } catch (error) {
        console.error("[gameLogic.js] Error initializing game progress:", error);
    }
}

/**
 * Record a player choice by:
 * 1. Sending the choice to the backend for hash generation
 * 2. Updating the local game state
 * 3. Saving progress to localStorage
 * 
 * @param {string} choiceId - The identifier for the choice made by the player
 */
async function makeChoice(choiceId) {
    console.log("[gameLogic.js] Processing choice:", choiceId);
    
    if (!choiceId) {
        console.error("[gameLogic.js] Invalid choice ID");
        return;
    }
    
    try {
        // Prepare data for the backend
        const requestData = {
            choiceId: choiceId,
            previousPathHash: currentPathHash,
            choicePath: choicePath
        };
        
        console.log("[gameLogic.js] Sending choice data to backend:", requestData);
        
        // Send the choice to the backend
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            // Update local state with the new hash from the server
            currentPathHash = result.newHash;
            choicePath.push(choiceId);
            
            // Save progress to localStorage
            localStorage.setItem('currentPathHash', currentPathHash);
            localStorage.setItem('choicePath', JSON.stringify(choicePath));
            
            console.log("[gameLogic.js] Choice recorded successfully:", {
                newHash: currentPathHash,
                choiceCount: choicePath.length
            });
        } else {
            console.error("[gameLogic.js] Failed to record choice:", result.message);
        }
    } catch (error) {
        console.error("[gameLogic.js] Error making choice:", error);
    }
}

/**
 * Hook into the TextBarController to capture branch selections
 */
function setupChoiceTracking() {
    console.log("[gameLogic.js] Setting up choice tracking hooks");
    
    // Wait for the game engine to initialize
    window.addEventListener('DOMContentLoaded', () => {
        if (typeof TextBarController !== 'undefined') {
            // Store the original showBranch method
            const originalShowBranch = TextBarController.prototype.showBranch;
            
            // Override the showBranch method to capture choices
            TextBarController.prototype.showBranch = function(options, o) {
                console.log("[gameLogic.js] Branch options detected:", options);
                
                // Set up listeners for the branch buttons
                setTimeout(() => {
                    const branchButtons = document.querySelectorAll('#chatBox button');
                    branchButtons.forEach((button, index) => {
                        button.addEventListener('click', () => {
                            console.log(`[gameLogic.js] Player selected branch option ${index}: ${options[index].name}`);
                            // Record the choice using the branch name as the choiceId
                            makeChoice(options[index].branch);
                        }, { once: true }); // Use once to prevent duplicate calls
                    });
                }, 100); // Small delay to ensure buttons are rendered
                
                // Call the original method
                return originalShowBranch.call(this, options, o);
            };
            
            console.log("[gameLogic.js] Successfully hooked into TextBarController");
        } else {
            console.warn("[gameLogic.js] TextBarController not found, unable to hook into choice system");
        }
    });
}

// Initialize everything
setupChoiceTracking();
console.log("[gameLogic.js] Choice tracking system initialized and ready");

// Export functions for external use
window.makeChoice = makeChoice;
window.loadGameProgress = loadGameProgress;