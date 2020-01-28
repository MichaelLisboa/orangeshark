# FROM gcr.io/google-appengine/nodejs
#
# WORKDIR /workspace
#
# COPY package.json /workspace/
# RUN npm install
# COPY . /workspace/
#
# EXPOSE 3000
#
# CMD ["npm", "start"]

FROM gcr.io/google_appengine/nodejs
COPY . /app/
RUN npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)
CMD npm start
