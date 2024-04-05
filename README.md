# Utibu Health - Mobile App

Video illustration: (https://youtu.be/8n5ZEcIB3pI)

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

### Setting Up Android Studio and Android Emulator

Follow these steps to set up Android Studio and configure an Android Virtual Device (AVD) emulator:

1. **Download Android Studio:** Visit [developer.android.com/studio](https://developer.android.com/studio) and download Android Studio.

2. **Install Android Studio:** Run the installer and follow the on-screen instructions.

3. **Configure AVD:** Open Android Studio, create a virtual device using AVD Manager, and configure it to your preferences.

### Configuring Android Development Environment Variables on Windows

To configure environment variables for Android development on Windows:
For more details follow the link by following the Windows instructions: (https://docs.expo.dev/workflow/android-studio-emulator/)

1. **Set up ANDROID_HOME:** Navigate to Windows Control Panel > User Accounts > User Accounts and create a new user variable named ANDROID_HOME with the path to your Android SDK installation directory.

2. **Verify Environment Variable:** Open PowerShell and check if ANDROID_HOME is listed in user environment variables using the command `Get-ChildItem -Path Env:`.

3. **Add platform-tools to the Path:** To add `platform-tools` to the Path, navigate to Windows Control Panel > User Accounts > User Accounts (again) > Change my environment variables > Path > Edit > New and add the path to the `platform-tools` to the list as shown below:

## Installing Microsoft SQL Server (Express Edition)

Follow these steps to download and install Microsoft SQL Server Express Edition:

1. **Download SQL Server Express:** Visit the [Microsoft SQL Server Express download page](https://www.microsoft.com/en-us/sql-server/sql-server-downloads), select your desired edition, and download it.

2. **Install SQL Server Express and SQL Server Management Student as a graphical management system for the server:** Run the installer, choose your installation options, and complete the installation process.

3. **Configuration:** Configure SQL Server settings, including authentication mode and server instance details. You can set up the login to be passwordless for the start.

4. **Completion:** Once the installation is complete, you're ready to use Microsoft SQL Server Express Edition for your database needs.

You can find more details about the above installations in this video: (https://www.youtube.com/watch?v=8vTCyhDyRjg)

## Installing Android ios emulator on vs code

1. **Installation:** To run Android emulators you need to have Android studio and already created the Android Virtual Devices. Navigate to the extensions section of the vs code and search for `Android iOS emulator` and install the extension. This extension: (https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate&ssr=false#overview)

2. **Add the Android Studio emulator script to your settings in Visual Studio Code:** Go to settings at the bottom left corner of your VS Code and click on settings.Search for `emulator settings` at the top. Go and copy the path to your emulator and paste it in the `Emulator path windows`. A trypical emulator path would look like this: `C:\Users\Your-Username\AppData\Local\Android\Sdk\emulator`

3. **Launch the Emulator:** Press `Ctrl + Shift + P`, search `Emulators`, click on `View android emulators`, select the android image you created from the drop-down list, and wait for it to launch (initial launch may take some time).

## Running you project

1. **Changing project variables:** Go to the index.js and customer/RegisterCustomer.js files in the api folder and replace connectionString with your SQL server's actual connection string. Remember to include an escape character between the username and sql instance to avoid misbehavior.

2. **Creating the database:** Go to the search button at the bottom of windows and search for `SQL Server Management Studio` and launch it. It will act as the graphical interphase for interacting with our database. Then, expand the database tab and select `New database`. Create a database with the name `utibu`. While the new database is selected, Go to the file option at the top right corner, select open, and then file. Select the utibuHealth file and click on the `Execute` tab on the ribbon above. This script will create a database for storing our data. Conversely, you can click on the database and select the `New Quer` and the top ribbon. Then copy and paste the `utibuHealth.sql` file and execute it. Your database is now ready.

3. **Initializing the frontend:** Navigate to the root directory of the project from the cmd and type `npx expo start -c`. An option will pop up asking you to select the runtime environment. Type `a` to indicate that you want to run your android app. Your app will connect with the emulator launch earlier from the vs code. Wait for the bundling process to finish.

4. **Initializing the backend:** Open another terminal and navigate to the root api directory. Run the `npm start` to initialize your backend.

5. **Start using the app:** Register and start enjoying the services. The online payment option is currently under development so kindly select the payment on delivery option.

Happy coding with Utibu Health! If you have any questions or encounter any issues, feel free to reach out for assistance through the email (sosthenetimi94@gmail.com)
