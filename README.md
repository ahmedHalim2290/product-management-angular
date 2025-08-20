# Product Management Portal

A modern, responsive front-end application built with Angular for managing a product catalog. This application consumes a RESTful API to perform full CRUD (Create, Read, Update, Delete) operations on products.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## ✨ Features

- **View Product List**: Browse all products in a clean, paginated table.
- **Product Details**: View detailed information for a single product.
- **Add New Products**: Use a form to create and add new products to the catalog.
- **Edit Existing Products**: Update the details of any existing product.
- **Delete Products**: Remove products from the catalog with a confirmation dialog.
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices.
- **User-Friendly Interface**: Intuitive UI built with Angular Material or Bootstrap for a seamless user experience.

## 🛠️ Built With

- [Angular](https://angular.io/) (v20+) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - Primary programming language
- [RxJS](https://rxjs.dev/) - For reactive programming and handling asynchronous operations
- [Bootstrap](https://getbootstrap.com/) / [Angular Material](https://material.angular.io/) - UI component library for styling and layout
- [primeng 20+](https://primeng.org/) - For components


## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v20 or later) - [Download here](https://nodejs.org/)
- **npm** (usually comes with Node.js) or **yarn**
- **Angular CLI** - Install globally via npm:
  ```bash
  npm install -g @angular/cli


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Connecting to the Backend

This frontend application is designed to work with the corresponding Product Management API.
- **Backend Repository**: [product-management-api](https://github.com/ahmedHalim2290/product-management-api)
- **Important**: Both the backend (API) and the frontend (this Angular app) must be running simultaneously for full functionality. The API should be running on the URL you specified in the environment configuration.


## Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/ahmedHalim2290/product-management-angular.git
    cd product-management-angular
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure the API Base URL**
    - Open the environment configuration file: `src/environments/environment.ts`
    - Update the `apiUrl` property to match the URL of your running backend API.
    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'https://localhost:7036'
    };
    ```

4.  **Run the Development Server**
    ```bash
    ng serve
    ```
    The application will open in your browser on `http://localhost:4200/`.

## 👨‍💻 Author

**Ahmed Halim**

GitHub: [@ahmedHalim2290](https://github.com/ahmedHalim2290)
