FROM denoland/deno:latest
EXPOSE 8000
WORKDIR /app
COPY . .
CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "src/index.ts"]