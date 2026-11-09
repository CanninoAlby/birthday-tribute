# Birthday Tribute Website 🎂

A heartfelt, romantic scrollytelling gift website created for your girlfriend.

---

## 🌟 Features Included

1. **Passcode Gatekeeper**: Private lock screen (Default test passcode: `1234`) with customizable hint.
2. **Ambient Candlelight Particles**: Dynamic glowing embers and starlight on canvas.
3. **Floating Music Player**: Vinyl record animation with play/pause, volume control, and friendly "Play Our Song" prompt.
4. **Stepped Scrollytelling Cards**: 24 pure, intimate stationery cards focusing 100% on your heartfelt words and memories, with interactive heart taps.
5. **Interactive Memory Gacha**: A dedicated capsule machine where she can roll the dice to draw random polaroid snapshots (supports iPhone Live Photos!).
6. **Progress Tracker**: Floating progress pill showing `Reason X of 24` with a percentage bar.
7. **Artisanal Birthday Cake**: Realistic birthday cake with flickering candles that she can click/tap to blow out.
8. **Celebration Fireworks**: Multi-stage confetti cannon burst (`canvas-confetti`) when candles are blown out.
9. **Intimate Birthday Letter**: Unfurls a heartfelt personal letter with your signature.

---

## 🚀 Running Locally

```bash
# Start local dev server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 🎨 How to Personalize (In 1 File)

Everything is centralized in **[`src/config/giftConfig.ts`](file:///E:/code/src/config/giftConfig.ts)**:

1. **Passcode & Clue**:
   ```ts
   security: {
     passcode: "0911", // Change to her birthday or secret nickname
     passcodeHint: "Hint: Your birthday in DDMM format",
   }
   ```
2. **Her Name & Age**:
   ```ts
   recipient: {
     name: "Sarah",
     nickname: "My Love",
     age: 24,
     birthdayDate: "November 9",
   }
   ```
3. **Background Music**:
   - Place an `.mp3` file into `public/music.mp3` and set `audioUrl: "/music.mp3"`.
4. **Memory Gacha Photos**:
   - Add any number of favorite couple photos (and optional `.mp4` for Live Photos) into the `memories` array:
   ```ts
   memories: [
     {
       id: 1,
       imageUrl: "/photos/beach.jpg",
       videoUrl: "/photos/beach.mp4", // Optional Live Photo video
       caption: "Our first trip to the beach.",
       date: "Summer 2024",
       location: "Bali"
     }
   ]
   ```
5. **The 24 Reasons**:
   - Edit the paragraphs in `reasons` with your personal words.
6. **Birthday Letter**:
   - Edit `finale.letterBody` with your personal birthday message.

---

## 🌐 Deploying to the Web (Free in 2 Minutes)

To send her a live link on her birthday:

### Option A: Vercel (Easiest)
1. Push this folder to a private GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository and click **"Deploy"**.
4. You will get a live link like `https://sarah-birthday.vercel.app` to send to her!

### Option B: Netlify
1. Run `npm run build`.
2. Drag and drop the `dist/` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
