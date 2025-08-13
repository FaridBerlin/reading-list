# 📚 Reading List App

A React Native mobile app for managing your personal reading list with barcode scanning functionality.

## ✨ Features

- 📱 **Manual Book Entry**: Add books by typing the title
- 📷 **Barcode Scanner**: Scan ISBN barcodes to automatically add books
- 🌐 **API Integration**: Fetches book data from OpenLibrary.org
- 📋 **Book List**: View all your books in a scrollable list
- 🎨 **Modern UI**: Touch-friendly rounded buttons and clean design

## 🚀 Tech Stack

- **React Native** with Expo
- **Expo Router** for navigation
- **Expo Camera** for barcode scanning
- **OpenLibrary API** for book data
- **React Hooks** (useState, useEffect)

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:FaridBerlin/reading-list.git
   cd reading-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device**
   - Scan the QR code with Expo Go app (Android/iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📱 How to Use

1. **Manual Entry**: Type a book title and tap "Hinzufügen"
2. **Barcode Scanning**: 
   - Tap "📷 Buch scannen"
   - Point camera at book's ISBN barcode
   - Book automatically added from OpenLibrary database

## 🔧 Technical Implementation

### Key Components
- **Camera Permissions**: Handles camera access requests
- **Barcode Detection**: Supports EAN-13, EAN-8, UPC-A, UPC-E, Code128, Code39
- **API Integration**: Async/await pattern with error handling
- **State Management**: React hooks for books, input, permissions

### File Structure
```
app/
├── _layout.jsx     # Root layout with SafeAreaView
├── index.jsx       # Main app component
assets/             # App icons and images
package.json        # Dependencies and scripts
app.json           # Expo configuration
```

## 🎯 Future Enhancements

- [ ] Book covers from API
- [ ] Reading progress tracking
- [ ] Categories and tags
- [ ] Search and filter
- [ ] Book ratings and reviews
- [ ] Export to CSV/PDF

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 👨‍💻 Author

**Farid** - [GitHub](https://github.com/FaridBerlin)

---

Built with ❤️ using React Native and Expo
