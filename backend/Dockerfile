FROM node:20.12.2

WORKDIR /app

COPY package*.json ./

# Step 4: Install production and development dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .



EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
