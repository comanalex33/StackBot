# StackBot Mobile App

## General description

We live in an increasingly agitated world where the evidence of what we own can buy us a lot of time. There are some solutions out there on the market, but the way you can use those can be hard and can take more time from the user perspective.

`StackBot` is a solution that can be used very easily by any user, you just need a phone. The purpose of the project is to create an easy-to-use inventory management solution that can be managed using a mobile phone that can be done manually from the app or using your voice. It is designed to enhance the user experience by implementing the voice control mechanism with the help of AI to be able to control it more naturally, without the need to use only a limited set of vocal commands. How the voice control mechanism works:

- The user sends a vocal command to the phone.
- The mobile app will convert it to text and will send it to the backend.
- The backend will process it with the help of AI and will send back a relevant text about what the user asked for.
- The mobile app will convert the received text to audio and will play the audio to the user.

### Use Cases

- A user can create or login into his/her account.
- A user can manage “spaces”. These are locations of inventory storages, like a house, or a room. A space can also contain other spaces.
- A user can share a space with other users (Example: family house).
- A user can manage manually inventory storages from the mobile app, the accepted ones are deposit or fridge.
- A user can manage using his/her voice. Get/Add/Update information about items in storages.
- A user will be notified with relevant information about items in storages (Example: The expiration date of an item in the fridge is nearing expiration or has expired).
- A user will get an email if another user want to share the space with him/her.

## Development

### Install dependencies

```sh
npm install
```

### Configure project

The project requires some secrets which need to be stored in `/secrets.json`.

The secrets needed for this project are:

- `assembly_ai_api_key` - The Assembly AI API Key - used for Speech-to-Text conversion

File format:

```json
{
    "assembly_ai_api_key": "API_KEY"
}
```

### Run the app 

```sh
npx expo start
```

## Production

### Android deployment

`Prerequisites`: Install EAS using `npm install -g eas-cli`

Steps to create an APK file for Android:

```sh
eas login                       # Login using Expo account (create one if you don't have one)
eas build:configure             # Configure EAS build
eas build --platform android    # Build project for Andr    oid

# => Link to download AAB file

# => Copy to Mobile phone
# => Co
# => Copy to Mobile phone
```