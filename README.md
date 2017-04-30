# drsync

Node utility to watch and sync files into a container based on a
[Docker rsync](https://hub.docker.com/r/stefda/rsync/) image. Currently the script
expects the container to be provisioned using a docker-compose file where it looks
for port mapping.

# Installation and usage

Install using yarn (or npm) like so:

```yarn global add git+https://github.com/stefda/drsync.git```

By default, the utility looks for `docker-compose.yml` and a service called `rsync` to resolve your mapped rsync
port. Error results if the file or service don't exist or if you don't have the 873 port mapped. Note that the script
also assumes your docker host is ready on `192.168.99.100`.

You may change the default settings by passing relevant options to the script, run `drsync --help` for details.
