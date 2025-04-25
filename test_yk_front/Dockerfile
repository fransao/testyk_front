# Etapa 1: build de Angular
FROM node:18-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx ng build test_yk_front --configuration production

# Etapa 2: imagen de NGINX
FROM nginx:stable-alpine as production-stage

# Copiar archivos del build Angular a NGINX
COPY --from=build-stage /app/dist/test_yk_front /usr/share/nginx/html

# Copiar configuración personalizada de NGINX (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
