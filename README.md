# README.md

# Utibu Health - Mobile App

This repository contains the source code for the Utibu Health mobile application, developed using Expo for Android. The app is designed to provide users with a seamless experience in ordering their medication online.

## Prerequisites

Before you begin, ensure that you have the following software installed on your system:

- [Node.js](https://nodejs.org/en/) (version 12 or later)

  - You can verify if Node.js is installed by opening a terminal (Command Prompt or PowerShell on Windows, Terminal on macOS/Linux) and running the following commands:
    ```bash
    node -v
    ```
    This command should display the installed Node.js version. If Node.js is not installed, you'll need to download and install it from the [official Node.js website](https://nodejs.org/en/).

- [Expo CLI](https://docs.expo.dev/get-started/installation/)

  - After installing Node.js, you can verify if Expo CLI is installed by running the following command in the terminal:
    ```bash
    expo --version
    ```
    This command should display the installed Expo CLI version. If Expo CLI is not installed, you can install it globally using npm:
    ```bash
    npm install -g expo-cli
    ```

- Sometomes you might need to restart you cmd or PowerShell for the node version to reflect after successfully downloading the windows verion

- [Android Studio](https://developer.android.com/studio) (for running the Android emulator)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended code editor)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (for the database)

## Getting Started

### Downloading the Repository as a ZIP File

If you prefer to download the repository as a ZIP file instead of cloning it using Git, follow these steps:

1. Start by creating an empty directory at your desired location on Windows PC. I prefer a folder on the Desktop for easier access.

2. Navigate to the bar at the top of this repository.

3. Click on the green "Code" button located near the top-right corner of the page.

4. In the dropdown menu that appears, click on "Download ZIP".

![Download ZIP](download_zip.png)

5. Your browser will begin downloading a ZIP file containing the entire repository.

6. Once the download is complete, extract the contents of the ZIP file to your desired location on your local machine (The empty folder created on the Desktop).

7. You can now proceed with the setup and running instructions provided in this README.

If you encounter any issues during the download or extraction process, feel free to reach out for assistance.

````

cd Desktop/your-created-folder/utibu-health
run npm install to install all the project dependancies.

open another terminal and change to the api directory by running the following command:
Desktop/your-created-folder/utibu-health/api
Similarly, run npm install to install all the dependancies for the backend in this folder.

Remember to replace 'your-created-folder' with the name of the folder you had created.

# Setting Up Android Studio and Android Emulator

This guide will walk you through the process of downloading, installing, and configuring Android Studio along with creating and running an Android Virtual Device (AVD) emulator for testing your Android applications.

## Downloading and Installing Android Studio

1. **Navigate to the Android Studio website:**
   Go to [developer.android.com/studio](https://developer.android.com/studio) in your web browser.

2. **Download Android Studio:**
   Click on the "Download Android Studio" button. This will download the installer for Android Studio.

3. **Run the Installer:**
   Once the download is complete, run the installer file. Follow the on-screen instructions to complete the installation process.

4. **Install Android Studio:**
   During the installation, you may be prompted to choose the components you want to install. Ensure that the "Android Virtual Device" (AVD) option is selected.

5. **Complete the Installation:**
   After selecting the components, proceed with the installation. Once the installation is complete, Android Studio will launch automatically.

## Configuring an Android Virtual Device (AVD)

1. **Open AVD Manager:**
   In Android Studio, click on the "Configure" menu and select "AVD Manager".

2. **Create a Virtual Device:**
   In the AVD Manager, click on the "Create Virtual Device" button.

3. **Select a Device Definition:**
   Choose a device definition from the list (e.g., Pixel 4, Nexus 5X, etc.) and click "Next".

4. **Select a System Image:**
   Choose a system image for the selected device. Ensure that you select an image with the desired Android version. Click "Next".

5. **Configure Virtual Device Settings:**
   Customize the virtual device settings such as device name, orientation, and performance profile. Click "Finish" when done.

6. **Start the Virtual Device:**
   Back in the AVD Manager, select the newly created virtual device and click the green "Play" button to start it.

7. **Wait for the Emulator to Launch:**
   The emulator will take some time to start up. Once it's launched, you'll see the Android home screen.

## Verifying the Emulator

1. **Verify Emulator Functionality:**
   To verify that the emulator is working correctly, open the app drawer and launch any app, such as the browser or settings.

2. **Test Your Application:**
   You can now use the emulator to test your Android applications. Deploy your app to the emulator using Android Studio or the command line tools.
# Configuring Android Development Environment Variables on Windows

After installing the necessary tools for Android development, you need to configure environment variables to ensure smooth functioning of the development environment.

## Setting up ANDROID_HOME Environment Variable

1. **Open Windows Control Panel:**
   Navigate to Windows Control Panel > User Accounts > User Accounts.

2. **Change Environment Variables:**
   Click on "Change my environment variables" and select "New" to create a new user variable.

3. **Create ANDROID_HOME Variable:**
   Name the variable as ANDROID_HOME and set its value to the path of your Android SDK installation directory.

4. **Save Changes:**
   Click "OK" to save the new environment variable.

## Verifying Environment Variable

1. **Open PowerShell:**
   Open PowerShell on your system.

2. **Check Environment Variables:**
   Enter the following command in PowerShell:
   ```bash
   Get-ChildItem -Path Env:

## Additional Tips

- **Performance Optimization:**
  If the emulator runs slowly, you can improve its performance by enabling hardware acceleration (if supported by your computer) and adjusting other settings in the AVD Manager.

- **Updating System Images:**
  Periodically check for updates to system images in the SDK Manager to ensure you have access to the latest versions of Android for testing.

# Installing Microsoft SQL Server (Express Edition)

This guide will walk you through the process of downloading and installing Microsoft SQL Server Express Edition on your Windows machine.

## Downloading SQL Server Express

1. **Go to the Microsoft SQL Server Express download page:**
   Visit the [Microsoft SQL Server Express download page](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).

2. **Select the desired edition of SQL Server Express:**
   Choose the edition that suits your requirements and click on the "Download" button.

## Installing SQL Server Express

1. **Run the Installer:**
   - Once the download is complete, run the installer file.
   - Follow the on-screen instructions to begin the installation process.

2. **Select Installation Type:**
   - Choose between "Basic" and "Custom" installation types.
     - Basic: Installs with default settings.
     - Custom: Allows you to specify installation options.

3. **Accept License Terms:**
   - Read and accept the license terms to proceed with the installation.

4. **Specify Features:**
   - Choose the features you want to install.
   - Ensure that "Database Engine Services" is selected.

5. **Instance Configuration:**
   - Specify the instance name.
     - Default: "SQLEXPRESS".
     - Custom: If you want to specify a custom instance name.

6. **Server Configuration:**
   - Choose the authentication mode as "Windows Authentication".
   - Leave the "Specify SQL Server administrators" section blank to allow Windows users to automatically become SQL Server administrators.

7. **Database Engine Configuration:**
   - Configure the server authentication mode as "Windows Authentication Mode".
   - Optionally, enable "Trust Server Certificate" under the "Security" tab to trust the certificate.

8. **Complete the Installation:**
   - Once you have configured the desired options, proceed with the installation.
   - Wait for the installation to complete.

By following these steps, you should have Microsoft SQL Server Express Edition installed on your Windows machine. You can now start using it for your database needs.




Copy code
expo start
This will open the Expo Developer Tools in your default web browser. You can use this interface to run the app on your Android emulator or physical device.
In a separate terminal window, navigate to the android directory and run the following command to start the Android emulator:
bash

Copy code
cd android
emulator -avd <your-avd-name>
Replace <your-avd-name> with the name of your Android Virtual Device (AVD) created in Android Studio.
Once the emulator is running, go back to the Expo Developer Tools in your web browser and click the Run on Android device/emulator option. Expo will build the app and install it on your Android emulator or physical device.
Visual Studio Code Configuration
It is recommended to use Visual Studio Code as your code editor for this project. Follow these steps to set up the recommended extensions and configuration:



License
This project is licensed under the MIT License.
````
