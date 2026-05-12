# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
# Note: Ensure you have a package.json in your directory
COPY package*.json ./
RUN npm install

# Copy the rest of your source code
COPY . .

# Build the project (assumes your build script outputs to /dist or /build)
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the build output from Stage 1 to Nginx's public folder
# Change "dist" to "build" if you are using Create React App instead of Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config if you have client-side routing (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
