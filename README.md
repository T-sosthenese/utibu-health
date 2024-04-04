# Utibu Health - Mobile App

Welcome to Utibu Health! This repository houses the source code for the Utibu Health mobile application, crafted using Expo for Android. Utibu Health aims to streamline the process of ordering medication online, ensuring a seamless experience for users.

## Prerequisites

Before diving into Utibu Health, make sure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/en/) (version 12 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for running the Android emulator)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended code editor)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (for the database)

## Getting Started

### Downloading the Repository as a ZIP File

If you prefer to download the repository as a ZIP file, follow these simple steps:

1. **Create a Folder:** Start by creating an empty folder at your desired location.

2. **Download ZIP:** Navigate to the top-right corner of this repository and click on the green "Code" button. Then select "Download ZIP".

3. **Extract ZIP Contents:** Once the download is complete, extract the contents of the ZIP file into the folder created in step 1.

4. **Setup:** Open your terminal, navigate to the extracted folder (`cd path/to/folder`), and run `npm install` to install all project dependencies.

5. **Backend Setup:** Open another terminal, change to the `api` directory (`cd path/to/folder/api`), and again run `npm install` to install backend dependencies.

6. **Launch:** You're all set! You can now proceed with running the project.

### Setting Up Android Studio and Android Emulator

Follow these steps to set up Android Studio and configure an Android Virtual Device (AVD) emulator:

1. **Download Android Studio:** Visit [developer.android.com/studio](https://developer.android.com/studio) and download Android Studio.

2. **Install Android Studio:** Run the installer and follow the on-screen instructions.

3. **Configure AVD:** Open Android Studio, create a virtual device using AVD Manager, and configure it to your preferences.

4. **Launch Emulator:** Start the emulator from AVD Manager and wait for it to launch.

### Configuring Android Development Environment Variables on Windows

To configure environment variables for Android development on Windows:

1. **Set up ANDROID_HOME:** Navigate to Windows Control Panel > User Accounts > User Accounts and create a new user variable named ANDROID_HOME with the path to your Android SDK installation directory.

2. **Verify Environment Variable:** Open PowerShell and check if ANDROID_HOME is listed in user environment variables using the command `Get-ChildItem -Path Env:`.

## Installing Microsoft SQL Server (Express Edition)

Follow these steps to download and install Microsoft SQL Server Express Edition:

1. **Download SQL Server Express:** Visit the [Microsoft SQL Server Express download page](https://www.microsoft.com/en-us/sql-server/sql-server-downloads), select your desired edition, and download it.

2. **Install SQL Server Express:** Run the installer, choose your installation options, and complete the installation process.

3. **Configuration:** Configure SQL Server settings, including authentication mode and server instance details.

4. **Completion:** Once the installation is complete, you're ready to use Microsoft SQL Server Express Edition for your database needs.

Happy coding with Utibu Health! If you have any questions or encounter any issues, feel free to reach out for assistance.
