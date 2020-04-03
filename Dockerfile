# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4

# Set the working directory to /api
WORKDIR /

# copy package.json into the container at /api
COPY package*.json ./

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /api
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]