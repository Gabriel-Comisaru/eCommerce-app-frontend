# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY dist/emag-clone/* /usr/share/nginx/html/
# EXPOSE 4200

FROM node:18-alpine AS builder

ARG NG_APP_API_URL
ARG NG_APP_APP_HOST

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY --chown=node:node package.json package-lock.json ./
COPY ./ /usr/src/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application for production environment
RUN npm run build

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=builder /usr/src/app/dist/emag-clone /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]