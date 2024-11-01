# Trainer Registry

A Next.js application that allows the registration of a new Pokemon trainer. The registration form includes fields for the trainer's name, age, and an option to select a starting Pokemon. The project was developed according to the recruitment specification.

**Live Demo:** [https://trainer-registry.vercel.app/](https://trainer-registry.vercel.app/)

## Technologies and Tools

- **Next.js** 15 with TypeScript
- **React** 18
- **MUI** (Material UI) for UI components
- **Emotion** for component styling
- **Fuse.js** for fuzzy search functionality
- **React Query** for API data handling
- **Testing Library** and **Jest** for testing
- **Docker** for containerization

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mgerszendorf/trainer-registry.git
   cd trainer-registry
2. **Install dependencies**:
   ```bash
   yarn install
3. **Run the application in development mode**:
    ```bash
    yarn dev    
The app will be available at http://localhost:3000.

4. **Build the application**:
    ```bash
    yarn build
5. **Run the application in production mode**:
    ```bash
    yarn start
## Docker
You can run the application in both development and production modes using Docker.

### Development Mode
1. **Build and start**:
   ```bash
   docker-compose up app-dev
### Production Mode
1. **Build and start**:
   ```bash
   docker-compose up app-prod
## Testing
1. **Run tests**:
   ```bash
   yarn test
2. **Watch mode**:
    ```bash
    yarn test:watch