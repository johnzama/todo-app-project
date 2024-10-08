# Step 1: Use an official Nginx base image
FROM nginx:alpine

# Step 2: Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Step 3: Copy your HTML and CSS files into the Nginx html directory
COPY . /usr/share/nginx/html

# Step 4: Expose port 80
EXPOSE 80

# Step 5: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]


