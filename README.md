# Health Team Admin - Next.js

This is a Next.js project for managing health team administration.

## Live Application

The application is deployed and can be accessed at [https://health-team-admin-next.vercel.app/](https://health-team-admin-next.vercel.app/)

## Features

**Emotion** for CSS-in-JS styling: Emotion is a performant and flexible CSS-in-JS library. It allows you to style applications quickly with string or object styles. It has predictable composition to avoid specificity issues with CSS.

**MUI** for a comprehensive set of Material-UI components: MUI provides a robust set of pre-designed component libraries based on Material Design. It helps in building consistent, beautiful, and user-friendly interfaces with less effort.

**Formik** for form management: Formik is a small library that helps with handling form state, form submission, input validation, error messages, and more. It simplifies the process of building complex forms and reduces boilerplate.

**Yup** for form validation: Yup is a simple and powerful schema builder for value parsing and validation. It pairs well with Formik and reduces the amount of validation code you need to write.

**Axios** for making HTTP requests: Axios is a promise-based HTTP client for the browser and Node.js. It has a simple API for making requests and takes care of many HTTP request concerns for you.

**Firebase Firestore** for backend services: Firebase Firestore provides a NoSQL cloud database to store and sync data between users and devices - in real time or offline. It's easy to use and requires less setup and code to get started.

**Firebase Storage** for file storage: Firebase Storage provides secure file uploads and downloads for your Firebase apps, regardless of network quality. It's used in this project for storing images.

**React Query** for data fetching, caching, and state management: React Query automates the fetching, caching, and updating of data in your React and React Native applications. It eliminates the need to manage state manually and makes the code more readable and maintainable.

**UUID** for generating unique identifiers: UUID is a simple library that generates unique identifiers. It's used in this project for creating unique names for images stored in Firebase Storage.

**Tailwind** for complementary style handling.

## Getting Started

First, install the dependencies:

```bash
npm install
```
To run this project locally, you need to register a Firebase service and link a project to it. Follow these steps:

1. Go to the [Firebase console](https://console.firebase.google.com/).
2. Click on "Add project" and follow the instructions to create a new project.
3. Once the project is created, click on the "Settings" icon next to "Project Overview" and select "Project settings".
4. In the "General" tab, scroll down to "Your apps" and click on the "</>" icon to register a new web app.
5. Follow the instructions to register your app. You don't need to set up Firebase Hosting.
6. At the end, you'll get a Firebase SDK snippet. Copy this snippet.

Now, in your project:

7. Create a `.env` file in the root of your project.
8. Paste the Firebase SDK snippet into this file and format it as follows:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in the development mode.
- `npm run build` - Builds the app for production.
- `npm run start` - Runs the built app in production mode.
- `npm run lint` - Runs the linter.
- `npm run test` - Runs the test suite.

# StaffServices API

This service provides methods for managing staff members in the application.

## Endpoints

### `POST /api/staff`

Creates a new staff member.

- **Payload**: `IStaff` object

Returns the created staff member's data.

### `PATCH /api/staff/{id}`

Updates a staff member's information.

- **Path Parameter**: `id` - The ID of the staff member to update.
- **Payload**: `IStaff` object

Returns the updated staff member's data.

### `DELETE /api/staff/{id}`

Deletes a staff member.

- **Path Parameter**: `id` - The ID of the staff member to delete.

Returns the deleted staff member's data.

## IStaff Interface

The `IStaff` interface represents a staff member and has the following structure:

```typescript
interface IStaff {
  personalInformation: IPersonalInformation;
  professionalInformation: IProfessionalInformation;
  status: boolean;
  id?: string;
}

interface IPersonalInformation {
  name: string;
  cpf: number | undefined;
  rg: number | undefined;
  birthDate: string | undefined;
  email: string;
  phone: number | undefined;
  address: IAddress;
}

interface IProfessionalInformation {
  crm: number | undefined;
  cfm: number | undefined;
  specialty: string;
  hourConsultationPrice: number | undefined;
  serviceArea: number | undefined;
  appointmentType: string;
  photos: string[];
}

interface IAddress {
  street: string;
  number: number | undefined;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: number | undefined;
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
