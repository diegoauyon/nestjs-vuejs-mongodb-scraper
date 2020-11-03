# Stage 1: Build Angular static assets
FROM node:lts-alpine as build-stage
LABEL author="Diego Auyon"
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve Angular assets using NGINX
FROM nginx:stable-alpine as production-stage
LABEL author="Diego Auyon"

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
