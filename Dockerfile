# Step 1: Define the base image
FROM node:18 AS base

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Define the final image
FROM node:18 AS production

WORKDIR /app

# Step 8: Copy the built files from the base image
COPY --from=base /app ./

# Step 10: Expose the port
EXPOSE 3000

# Step 11: Start the Next.js application
CMD ["npm", "start"]
