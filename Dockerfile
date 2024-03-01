# Choose the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

COPY .npmrc .npmrc

ENV NEXT_PUBLIC_IS_PRODUCTION=true

# Install dependencies using npm
RUN npm ci

# Copy the rest of your application code into the container
COPY . .

# Build your Next.js application
RUN npm run build

# Expose the port your application will run on
EXPOSE 3000

# Start your Next.js application
CMD ["npm", "start"]