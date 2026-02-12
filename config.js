// config.js

/* ============================================================
   INSTRUCTIONS FOR AADYAA'S SITE
   ============================================================
   1. Create a folder named "Assets" (Capital 'A').
   2. Put ALL images and music inside that "Assets" folder.
   3. Ensure filenames match EXACTLY (music.mp3, image_4.png, etc.)
   ============================================================ */

const assets = {
    // --- BACKGROUND MUSIC ---
    // Music for Pages 1-8 (The "Cute" phase)
    bgMusic1: "Assets/music.mp3", 
    // Music for Pages 9-11 (The "Emotional" phase)
    bgMusic2: "Assets/music2.mp3",

    // --- IMAGES MAPPING ---
    // The Single Red Rose (Used in Page 7 Prank & Page 8 Gift)
    image_3: "Assets/image1.png", 
    
    // The Melting Heart Button (Used in Page 9 transition)
    image_4: "Assets/image4.png",    
    
    // The Watercolor Rose Background (Used as background for Page 8)
    image_5: "Assets/image5.jpg", 
    
    // The Flying Heart/Envelope Seal (Used as the button on Page 7)
    image_6: "Assets/image7.png", 
    
    // The Letter Paper Background (Used for the text on Page 10)
    image_7: "Assets/image8.jpg", 
    
    // The Blurred Pink Background (Used as background for Page 11)
    image_8: "Assets/image9.png"  
};

// --- PAGE 12: THE MUSIC UNIVERSE (16 SONGS) ---
// You can edit the "title" and "artist" for each song below.
// Ensure you have song1.mp3 to song16.mp3 inside Assets.
// Ensure you have cover1.jpg to cover16.jpg inside Assets.

const musicLibrary = [
    { title: "Can I go where you go?", artist: "Can we always be this close forever and ever?", music: "Assets/song1.mp3", cover: "Assets/cover1.jpg" },
    { title: "Maybe I just wanna be yours", artist: "I wanna be yours, I wanna be yours", music: "Assets/song2.mp3", cover: "Assets/cover2.jpg" },
    { title: "Well, I found a girl, beautiful and sweet", artist: "Oh, I never knew you were the someone waitin' for me", music: "Assets/song3.mp3", cover: "Assets/cover3.jpg" },
    { title: "oh, since the day I saw you", artist: "I have been waiting for you", music: "Assets/song4.mp3", cover: "Assets/cover4.jpg" },
    { title: "You'd be mine,", artist: "Would you mind if i took your hand tonight?", music: "Assets/song5.mp3", cover: "Assets/cover5.jpg" },
    { title: "I would never fall", artist: "Unless it's you i fall into", music: "Assets/song6.mp3", cover: "Assets/cover6.jpg" },
    { title: "I have loved you for a thousand years", artist: "I'd love you for a thousand more", music: "Assets/song7.mp3", cover: "Assets/cover7.jpg" },
    { title: "The angels up in the clouds are jealous knowin' we found", artist: "Something so out of the ordinary", music: "Assets/song8.mp3", cover: "Assets/cover8.jpg" },
    { title: "Koi lamha mera nah ho tere bina", artist: "har saans pe naam tera", music: "Assets/song9.mp3", cover: "Assets/cover9.jpg" },
    { title: "Na chahiye kuch tumse zyadae", artist: "Tumse kam nahin", music: "Assets/song10.mp3", cover: "Assets/cover10.jpg" },
    { title: "Tode se bhi nah toote", artist: "Jo dil ka naata bangaya", music: "Assets/song11.mp3", cover: "Assets/cover11.jpg" },
    { title: "Talab talab talab", artist: "Bas teri hai mujhe", music: "Assets/song12.mp3", cover: "Assets/cover12.jpg" },
    { title: "Maine toh dheere se neendon ke dhaage se", artist: "Baandha hai khwaab ko tere", music: "Assets/song13.mp3", cover: "Assets/cover13.jpg" },
    { title: "Main mera dil", artist: "Aur tum ho yahan", music: "Assets/song14.mp3", cover: "Assets/cover14.jpg" },
    { title: "Tum ho paas mere", artist: "Saath mere ho tum yoon", music: "Assets/song15.mp3", cover: "Assets/cover15.jpg" },
    { title: "Main Khuda Mein Maanu Kyun"
, artist: "Tu khuda mere liye", music: "Assets/song16.mp3", cover: "Assets/cover16.jpg" }
];

// DATE CONFIGURATION
// This sets the counter to start at 0 and go to 120.
// (The visual counter is handled in script.js, this is just for reference)
const startDate = new Date(2025, 9, 12); 
