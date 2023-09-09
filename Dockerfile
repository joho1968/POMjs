FROM nginx:1.25.2-alpine


COPY . /usr/share/nginx/html

EXPOSE 80
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
