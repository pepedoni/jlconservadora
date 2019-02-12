# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.12.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

RUN ls

# Copy all local files into the image.
COPY ./public ./public

RUN ls

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve -s public

# Tell Docker about the port we'll run on.
EXPOSE 5000