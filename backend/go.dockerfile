# syntax=docker/dockerfile:1

FROM golang:1.22.2 AS build-stage

WORKDIR /app

# COPY go.mod .
# COPY go.sum .

# Copy the rest of the application source code
COPY go.mod go.sum ./

# Download and install dependencies
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /api

EXPOSE 8080

CMD ["/api"]