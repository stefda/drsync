# drsync

Node utility to watch files for changes and sync them once changed over the native rsync protocol.

[![Build Status](https://travis-ci.org/stefda/drsync.svg?branch=single-file-sync)](https://travis-ci.org/stefda/drsync)

# Requirements

drsync has a hard dependency on rsync that takes care of the file transfer. Windows
users can get rsync as part of the [cwRsync](https://itefix.net/cwrsync) utility.

# Installation and usage

Install via yarn (or npm) like so:

```yarn global add drsync```

At the bare minimum, the utility needs host and a list of directories to sync. These
could be provided either as options to the cli command or by creating a `drsync.yml`
file with the options defined as shown below:

```yaml
options:
  host: 192.168.99.100
  files:
    - src/
    - test/
```

Other options (and their default values) are:
- port (873)
- volume (volume)
- user (nobody)
- group (nogroup)
- watch (false)

A fully customised yaml config will look like this:

```yaml
options:
  host: 192.168.99.100
  port: 10873
  volume: docker
  user: www-data
  group: www-group
  watch: true
  files:  
    - src/
    - test/
```
