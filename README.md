# ozs-web
The Official OpenZooSim Web App.

## Table of Contents
- [Overview](https://www.github.com/SnowLynxSoftware/vt-api#overview)
- [CI/CD](https://www.github.com/SnowLynxSoftware/vt-api#ci-cd)
- [Tech Stack](https://www.github.com/SnowLynxSoftware/vt-api#tech-stack)
- [Digital Ocean Infrastructure](https://www.github.com/SnowLynxSoftware/vt-api#digital-ocean-infrastructure)
   - [Kubernetes Setup](https://www.github.com/SnowLynxSoftware/vt-api#kubernetes-setup)
   - [Useful K8S CLI Commands](https://www.github.com/SnowLynxSoftware/vt-api#other-useful-commands)

### Overview
The app is a monolithic service that handles all aspects of the Vista Table Application from a data perspective. 
All interactions with the database are funneled through requests to this service including authentication, authorization, and
any CRUD aspects of our data layer. We have tried to follow a [Radically Simple](https://www.radicalsimpli.city/) approach as
much as possible to only use things that we need and to keep the architecture approachable and easily maintainable.

### CI-CD
All builds happen as part of GitHub Actions when merging code to the `develop` branch. Generally, a build is
triggered when code is committed to the `develop` branch. A docker build will create and tag a new docker image, 
and then push that image to the Digital Ocean Container Registry. Finally, the kubernetes deployments are updated 
to reflect the new docker image. This process will cause a rolling update to happen in the `dev` environment and
the services will get updated shortly.

When we are ready to push an update to the live `production` environment, we just need to promote the docker images 
from `dev` to `production`. This automation is triggered when we merge commits into the `master` branches on GitHub. 
We only ever build for the `develop` environment though, so `production` will always use the same artifacts that were 
previously created.

To view more about how the builds work--you can view the `.github/workflows` YAML files.

### Tech-Stack
You should install all of these tools.
- [NodeJS](https://nodejs.org/en) with [Typescript](https://www.typescriptlang.org/)
- [ExpressJS](https://expressjs.com/) Web Framework
- [EJS](https://ejs.co/) Templating Engine
- [TSyringe](https://github.com/microsoft/tsyringe) DI Container
- [JEST](https://jestjs.io/) Unit Testing
- [PostgreSQL](https://www.postgresql.org/) Database
- [Fast JWT](https://nearform.github.io/fast-jwt/) for Auth
- [SendGrid](https://sendgrid.com/en-us) Email Provider
- [Digital Ocean](https://www.digitalocean.com/) Cloud Provider using [Kubernetes](https://kubernetes.io/) & [Docker](https://www.docker.com/)
   - [Digital Ocean CLI Tool](https://docs.digitalocean.com/reference/doctl/)

A few other useful notes about the architecture:
- On the **backend** we are taking advantage of Typescript to provide a more robust and type-safe experience.
- On the **frontend** we are using EJS to provide a more dynamic and flexible templating engine--but writing all the frontend in plain HTML/CSS/JS.
   - I had considered using something like Angular or Vue, but I felt that it was overkill for the simplicity of the app.

### Digital-Ocean-Infrastructure

#### Kubernetes-Setup
In the root of the project, you will find a `k8s` folder that contains a directory of each environment that we support.
In each of these directories, you will find the following YAML files that are used to build the environment:
- `namespace.yaml` - This is used to define the namespace label that this environment will use. Our application uses a single K8S Cluster, and each env is separated by namespaces.
- `deployment.yaml` - This defines the containers that are ran (via Docker) for our application. This can be the API service or the client front end app.
   - All secrets will be referenced in here from the `secrets.yaml` as ENV variables. Note that some values aren't secret, so they are listed in plain text.
- `service.yaml` - Services are how we define our load balancers that will expose our containers to the Internet so users can consume it. This is how we set up SSL and port forwarding rules.
   - We need to use the Digital Ocean CLI tool to create a Let's Encrypt SSL Certificate first:
      - `doctl compute certificate create --type lets_encrypt --name vtcert --dns-names *.vistatable.com` - Create the cert
      - `doctl compute certificate list` - View All Certs to get the UUID to place into the `service.yaml`
- `secrets.yaml` - This is how we define secrets such that Kubernetes itself will handle encrypting and usage of the secrets at runtime when they are needed.
   - All secret values should be `base64`encoded when placed into this file. K8S will automatically decode the values at runtime.
   - So we aren't uploading secrets into GIT, the file has been redacted locally but kept for reference in how to access it.
   - The real values for each environment can be found in Google Drive.

If creating a new env, you will need to CREATE the resources using these files, for example:
- `kubectl create -f deployment.yaml`

When updating one of the files above, you will need to run an update command on the cluster, for example:
- `kubectl replace -f deployment.yaml`

#### Other-Useful-Commands
Get a list of all pods in a namespace:
```shell
kubectl get pods -n dev
```

Show logs from a specific pod:
```shell
kubectl logs POD_ID -n dev
```
