# Pantry Item Manager

A React application that allows users to manage their pantry items. With this app, you can add, view, edit, and delete items from your pantry. Data is stored in Firebase Firestore.

## Features

- **View Items**: Displays a list of all pantry items.
- **Add Item**: Add new items to the pantry with details including name, description, category, expiration date, and price.
- **Edit Item**: Update details of existing items.
- **Delete Item**: Remove items from the pantry.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Firebase**: Backend service for authentication, database, and hosting.
- **Firestore**: Cloud-based NoSQL database for storing data.

## Installation

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** (comes with Node.js)
- **Firebase project** (to use Firestore)

### Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/Mithsah1325/Grocery-Tracker/
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Firebase**

    - Create a Firebase project and set up Firestore.
    - Replace the Firebase configuration in the `firebaseConfig.js` file with your project's configuration.

4. **Run the Application**

    ```bash
    npm start
    ```

    This will start the development server and open the application in your default web browser.

## Usage

- **Add Items**: Navigate to the add item page and fill in the form to add a new item to your pantry.
- **View Items**: The home page will display a list of all items in your pantry.
- **Edit Items**: Click the "Edit" button next to an item to update its details.
- **Delete Items**: Click the "Delete" button next to an item to remove it from your pantry.

## Contributing

Feel free to submit issues, suggest features, or contribute code. Please ensure you follow the code style and testing guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
