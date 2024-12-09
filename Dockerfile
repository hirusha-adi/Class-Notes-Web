# Base image for Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a local installation of `serve` instead of global
RUN npm install serve

# Expose the port your app will run on
EXPOSE 6001

# Command to run `serve` from node_modules
CMD ["npx", "serve", "-s", "dist", "-l", "6001"]

