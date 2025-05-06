# Minimal Dashboard

A lightweight, customizable dashboard for managing and monitoring services and infrastructure components.

## Features

- **Service Management**
  - Add, edit, and delete services
  - Organize services into sections
  - Drag and drop reordering
  - Secure credential management
  - Auto-hide sensitive information

- **Customization**
  - Dark/Light theme support
  - Configurable grid layout (1-4 columns)
  - Toggle service descriptions
  - Show/hide service icons
  - Auto-collapse sections
  - Customizable credential timeout

- **Security**
  - Secure credential storage
  - Auto-hide credentials
  - Configurable timeout for sensitive information
  - Protected credential display

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - TailwindCSS
  - DnD Kit (Drag and Drop)
  - Lucide Icons

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - TypeScript

## Getting Started

### Prerequisites

- Node.js 20 or higher
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wellrcosta/minimal-dashboard.git
cd minimal-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/minimal-dashboard
PORT=4001
```

4. Start the development server:
```bash
npm run dev
```

5. Build and run in production:
```bash
npm run build
npm start
```

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t minimal-dashboard .
```

2. Run the container:
```bash
docker run -p 4001:4001 --env-file .env minimal-dashboard
```

## Usage

### Dashboard Features

- **Edit Mode**: Toggle edit mode to add, edit, or delete services and sections
- **Service Types**:
  - Web Services: Quick links to external services
  - Informational Services: Store credentials and connection details
- **Sections**: Organize services into collapsible sections
- **Settings**: Customize the dashboard appearance and behavior

### Security Best Practices

- Never commit sensitive credentials to the repository
- Use environment variables for configuration
- Enable auto-hide for sensitive information
- Set appropriate timeout for credential display

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for the beautiful icon set
- [DnD Kit](https://dnd-kit.com/) for the drag and drop functionality
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework 