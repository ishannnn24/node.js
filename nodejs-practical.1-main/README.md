### Step 1: Download Node.js

1. Visit the official Node.js website: https://nodejs.org
2. Choose the LTS (Long Term Support) version suitable for your operating system (Windows, Mac, or Linux).
3. Download and run the installer.
4. Follow the installation steps by clicking “Next” and agreeing to terms.

### Step 2: Verify Installation

Open your terminal or command prompt and type:
node -
npm -v
This will show the installed versions of Node.js and npm.

You're now ready to write Node.js applications!

### About the Code

This project demonstrates basic Node.js concepts as part of a BCA 3rd-year practical assignment. It includes two key programs:


### `hello.js`

This is a simple Node.js script that:

- Prints **“Hello World”** to the console
- Displays the student's **name** and **student ID**

 **Purpose**: To understand basic syntax and how to run a Node.js file using the terminal.

---

### `server.js`

This is a basic HTTP server created using Node.js core modules. It includes:

- Use of the `http` module to create a web server
- Use of the `fs` (File System) module to:
  - **Write data** to a file (`data.txt`)
  - **Read data** from the file and display it in the browser

 **Purpose**: To demonstrate how Node.js handles HTTP requests and performs file operations.

 When the server is running and you open `http://localhost:3000` in your browser, it reads the contents of `data.txt` and shows it on the web page.

---

## 
