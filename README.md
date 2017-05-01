# drsync

Node utility to watch and sync files into an rsync-enabled Docker container.

[![Build Status](https://travis-ci.org/stefda/drsync.svg?branch=single-file-sync)](https://travis-ci.org/stefda/drsync)

# Installation and usage

Install using yarn (or npm) like so:

```yarn global add git+https://github.com/stefda/drsync.git```

By default, the utility looks for `docker-compose.yml` and a service called `rsync` to resolve your mapped rsync
port. Error results if the file or service don't exist or if you don't have the 873 port mapped. Note that the script
also assumes your docker host is ready on `192.168.99.100`.

You may change the default settings by passing relevant options to the script, run `drsync --help` for details.
