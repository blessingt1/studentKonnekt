# studentKonnekt
HMS CAPSTONE
For the front end, enter the following command to run the development server: 

npm run dev



For the back end, enter the following command to run the development server: 
- node index.js
or 
- npm run dev or 
- node run start



Front end guide: 

Login/Signup:
1. main.jsx
Comments: This file initializes the React app and mounts the App component to the root element in your HTML.
Recommendation: The use of React.StrictMode is great as it helps identify potential problems in your app during development. No changes needed here.

2. App.jsx
Comments: This component is responsible for routing between different pages like Login, Signup, and Home. The routes are correctly set up, ensuring proper navigation.
Recommendation: If you want to add additional protection, consider adding route guards to protect routes like /home that should only be accessible to authenticated users.

3. Home.jsx
Comments: A simple component that displays a message. It works as intended.
Recommendation: You might want to make this component more dynamic by passing props or using state to display user-specific information.

4. Login.jsx
Comments: This is where the user inputs their login details. The form is well-structured and uses useState to handle input changes. The login details are sent to the backend using Axios.
Insight:
State Handling: Ensure that the email and password are being validated before submission. For instance, you could add checks to ensure that the email is in a valid format and the password meets security criteria (e.g., length, complexity).
Local Storage: If you plan to store any authentication tokens or user details locally, consider using localStorage or sessionStorage. This can be useful for maintaining user sessions.
Security: Never store sensitive information like passwords in local storage. Only store tokens or other non-sensitive data.

5. Storing User Details
Axios POST Request: You're already sending the user details to the backend with an Axios POST request. Ensure that your backend is properly handling this request by checking for the correct user and responding with a token or appropriate message.
Storing Data: Once you receive a response, if the login is successful, you could store a session token in localStorage and use it for subsequent API requests to authenticate the user.

