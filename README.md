# React Native Project Example

## Overview

Welcome to this React Native project example! This repository illustrates a modular architecture for a React Native application. While the code is functional, please note that the project cannot be launched as-is. This serves as a valuable resource for understanding how to organize a React Native project effectively.

## Project Structure

The project is organized into an `/src` directory that includes an `App` folder and several feature modules. Each module contains its own components, GraphQL queries, models (including actions, action types, reducers, sagas, and selectors), routers, screens, services, and utilities. The `App` folder also follows this modular approach.

```
/src
  ├── /App
  │    ├── components
  │    │    └── CommonComponent.js
  │    ├── graphql
  │    │    └── queries.js
  │    ├── models
  │    │    ├── actions.js
  │    │    ├── actionTypes.js
  │    │    ├── reducers.js
  │    │    ├── sagas.js
  │    │    └── selectors.js
  │    ├── router
  │    │    └── AppNavigator.js
  │    ├── screens
  │    │    └── MainScreen.js
  │    ├── services
  │    │    └── AppService.js
  │    └── utils
  │         └── AppUtils.js
  ├── /modules
  │    ├── /Auth
  │    │    ├── components
  │    │    │    └── AuthForm.js
  │    │    ├── graphql
  │    │    │    └── authQueries.js
  │    │    ├── models
  │    │    │    ├── actions.js
  │    │    │    ├── actionTypes.js
  │    │    │    ├── reducers.js
  │    │    │    ├── sagas.js
  │    │    │    └── selectors.js
  │    │    ├── router
  │    │    │    └── AuthNavigator.js
  │    │    ├── screens
  │    │    │    └── AuthScreen.js
  │    │    ├── services
  │    │    │    └── AuthService.js
  │    │    └── utils
  │    │         └── AuthUtils.js
  │    ├── /Messenger
  │    │    ├── components
  │    │    │    └── ChatBubble.js
  │    │    ├── graphql
  │    │    │    └── messageQueries.js
  │    │    ├── models
  │    │    │    ├── actions.js
  │    │    │    ├── actionTypes.js
  │    │    │    ├── reducers.js
  │    │    │    ├── sagas.js
  │    │    │    └── selectors.js
  │    │    ├── router
  │    │    │    └── MessengerNavigator.js
  │    │    ├── screens
  │    │    │    └── ChatScreen.js
  │    │    ├── services
  │    │    │    └── MessengerService.js
  │    │    └── utils
  │    │         └── MessengerUtils.js
  │    ├── /UserNotification
  │    │    ├── components
  │    │    │    └── NotificationItem.js
  │    │    ├── graphql
  │    │    │    └── notificationQueries.js
  │    │    ├── models
  │    │    │    ├── actions.js
  │    │    │    ├── actionTypes.js
  │    │    │    ├── reducers.js
  │    │    │    ├── sagas.js
  │    │    │    └── selectors.js
  │    │    ├── router
  │    │    │    └── NotificationNavigator.js
  │    │    ├── screens
  │    │    │    └── NotificationScreen.js
  │    │    ├── services
  │    │    │    └── NotificationService.js
  │    │    └── utils
  │    │         └── NotificationUtils.js
```

### Module Breakdown

- **/App**: Contains the core application components, services, and utilities. Each model is structured with:
  - **actions.js**: Defines actions for state changes.
  - **actionTypes.js**: Enumerates action types for better manageability.
  - **reducers.js**: Contains reducers to update the application state.
  - **sagas.js**: Manages side effects and asynchronous actions.
  - **selectors.js**: Provides functions to access specific parts of the state.
  - **router**: The `AppNavigator.js` file sets up navigation for the core app.

- **/modules**: Contains individual feature modules, such as Auth, Messenger, and User Notification, each with its own components, GraphQL queries, models (actions, action types, reducers, sagas, selectors), routers (e.g., `AuthNavigator.js`, `MessengerNavigator.js`, `NotificationNavigator.js`), screens, services, and utilities.

## Architecture Highlights

- **Modular Structure**: Each module encapsulates its functionality, promoting maintainability and scalability.

- **Separation of Concerns**: Each module contains its own components, services, and utilities, making it easy to navigate and modify.

- **State Management**: Each module has its own actions, action types, reducers, sagas, and selectors, facilitating organized state management.

- **GraphQL Integration**: Each module can have its own GraphQL queries and mutations for organized data handling.

## Important Note

Although the code is functional, there may be missing configurations, dependencies, or setup steps that prevent the project from being launched directly. Please refer to the documentation and ensure your environment is properly configured.

## Contributing

Feel free to fork this project and explore the architecture further! Contributions are welcome, whether through improvements, bug fixes, or additional features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to the React Native community for their continuous support and contributions to this amazing framework.
