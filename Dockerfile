# Dockerfile
FROM nginx:alpine

# Copy the static files to nginx's serve directory
COPY . /usr/share/nginx/html/

# Copy custom nginx configuration if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]