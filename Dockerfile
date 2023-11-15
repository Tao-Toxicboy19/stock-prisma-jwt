# Use an official Node.js LTS (Long-Term Support) runtime as a parent image
FROM node:lts AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source
COPY . .

# Build your Nest.js app (if necessary)
# RUN npm run build

# Create a new image that uses a minimal runtime
FROM node:lts-slim

# Set the working directory in the new container
WORKDIR /app

# Copy the app files from the previous build stage
COPY --from=build /app ./

# Expose the port on which your Nest.js app will run
EXPOSE 30

# Define the command to start your Nest.js app
CMD [ "npm", "start" ]
