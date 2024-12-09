# Base image for Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Set NODE_ENV to development to install all dependencies
ENV NODE_ENV=development

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Switch NODE_ENV to production for runtime
ENV NODE_ENV=production

# Install `serve` for serving static files
RUN npm install serve

# Expose the port
EXPOSE 6001

# Command to serve the built application
CMD ["npx", "serve", "-s", "dist", "-l", "6001"]
