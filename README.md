## Mini group ordering system

### Running app Locally

**Prerequesties**

- Docker- to install databases on the fly and expose out to host
  machine
- Minikube-to spin up all the app inside the single kubernetes
  cluster

Once you cloned the project
You can see the Makefile at the root level of the cloned project folder

To kick start the project then run

    make start

At the end of excution you will see an url to access the app

Then to update after the code changes run

    make update

Then to remove all the resources from both minikube and docker run

    make destroy

Testing

Front end testing
run

    yarn test
