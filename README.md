# Pet Adoption Platform

A full-stack pet adoption web application that connects adopters with animal shelters. Users can create accounts, browse available pets, submit adoption applications, communicate with shelters, and manage pet listings.

The application supports two user roles:

- **Adopters** who search for pets, submit applications, save favorites, and communicate with shelters.
- **Shelters** who manage shelter profiles, create pet listings, review applications, and communicate with adopters.

---

# Features

## User Authentication

- User signup and login system
- Adopter and shelter roles
- Secure password storage using bcrypt hashing
- Environment variable configuration using dotenv

## Adopter Features

- Create an adopter account
- Browse available pets
- View detailed pet information
- Search for pets
- Submit adoption applications
- Save favorite pets
- Message shelters
- View applications and messages

## Shelter Features

- Create shelter accounts
- Create and update shelter profiles
- Add new pets
- Upload pet images
- Edit pet information
- Manage shelter pets
- Review adoption applications
- Communicate with adopters

## Messaging System

- User-to-shelter conversations
- Message history storage
- Adoption communication workflow

---

# Screenshots

## Home Page

![Home Page]<img width="1903" height="952" alt="image" src="https://github.com/user-attachments/assets/ad5027d9-34c9-450e-a483-695887275845" />
<img width="1912" height="947" alt="image" src="https://github.com/user-attachments/assets/b258e6fc-66e1-4651-ae02-355d69152178" />


## Pet Listings

![Pet Listings]
<img width="1909" height="947" alt="image" src="https://github.com/user-attachments/assets/c7f05abe-679e-413a-b472-7f1b891e20ad" />


## Pet Details / Application

![Pet Details]<img width="1907" height="955" alt="image" src="https://github.com/user-attachments/assets/1bc3036e-bb4d-4022-8e08-60476f1727e9" />


## Shelter Dashboard

![Shelter Dashboard]<img width="1912" height="948" alt="image" src="https://github.com/user-attachments/assets/d238d219-6fd9-48c0-aad2-d1d8457cd62a" />


## Messaging System

![Messages]<img width="1905" height="941" alt="image" src="https://github.com/user-attachments/assets/210e24b3-d641-4ec4-96b5-cc263c2c139e" />


## Signup

![Signup] <img width="1912" height="936" alt="image" src="https://github.com/user-attachments/assets/fc2d624a-45cf-4f2b-9cef-a1a09b7a7c44" />


## Shelter Info

![Shelter Info](screenshots/shelter-info.png)
<img width="1914" height="953" alt="image" src="https://github.com/user-attachments/assets/77c1fb0a-1cc9-4028-9222-641185ab4042" />


---

# Technologies

## Frontend

- React
- React Router
- JavaScript
- CSS
- React Icons

## Backend

- Node.js
- Express.js
- MySQL
- mysql2/promise
- bcrypt
- dotenv
- multer

## Database

- MySQL

---

# Database Structure

The application uses a relational MySQL database.

Main tables include:

- `users`
- `shelters`
- `pets`
- `applications`
- `conversations`
- `messages`
- `favorites`

Relationships:

- Users can have adopter or shelter roles.
- Shelters are connected to users.
- Shelters can manage multiple pets.
- Adopters can submit applications for pets.
- Conversations connect adopters and shelters.

---

# Installation

Clone the repository:

```bash
git clone https://github.com/matthewholmstrom/Pet-Adoption.git
```

Install dependencies:

Frontend:
```bash
npm install
npm start
```

Backend:
```bash
cd backend
npm install
npm start
```

Create a backend `.env` file with your database credentials.

---

# Future Improvements

- Deploy production version
- Add JWT authentication
- Move image storage to Cloudinary
- Improve search functionality

