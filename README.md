# MQTT To-Do List Application

A full-stack to-do list application built using **Node.js**, **Redis**, **MongoDB**, **MQTT**, and **React.js**. This app demonstrates how to combine real-time messaging with data caching and persistence.


## Tech Stack

- **Backend**: Node.js, Express.js, MQTT, Redis, MongoDB
- **Frontend**: React.js (with Tailwind CSS or SCSS)
- **Communication**: MQTT over WebSocket
- **Deployment Ready**: Cloud-compatible with RedisLabs and MongoDB Atlas


## Features

- Add tasks using MQTT publish to `/add` topic.
- Tasks are cached in Redis under a single key.
- If tasks > 50, they are offloaded to MongoDB and Redis is flushed.
- Fetch all tasks using an HTTP GET endpoint.
- Fully responsive React frontend.
- MQTT WebSocket support for browser integration.
