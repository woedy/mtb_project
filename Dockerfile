# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5173 (default port for Vite)
EXPOSE 5173

# Run the Vite development server
CMD ["yarn", "dev", "--host"]
