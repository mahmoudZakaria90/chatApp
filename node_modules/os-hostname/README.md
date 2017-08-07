# os-hostname [![Build Status](https://travis-ci.org/martinheidegger/os-hostname.svg?branch=master)](https://travis-ci.org/martinheidegger/os-hostname)

Simple [node.js](https://nodejs.org/) util that returns the hostname of the current system if evaluable.

On windows this util is aware of the domain using the `COMPUTERNAME` environment variable.

On other systems it uses the `HOSTNAME` environment variable.

If the environment variable is not given or empty on other systems it will fallback to [`hostname`](http://www.linfo.org/hostname_command.html) which is also available on [windows](https://technet.microsoft.com/en-us/library/bb490919.aspx).

# Usage 

Install with:

```
$ npm i os-hostname --save
```

and use it with:

```JavaScript
var hostname = require('os-hostname')
hostname(function (err, hname) {
    console.log(hname)
})
```

cheers.

## Caching & Invalidation

By default the user is cached for 10 minutes it is possible to invalidate the cache using:

```JavaScript
user.invalidate()
```

## License

[ISC](https://en.wikipedia.org/wiki/ISC_license)

first version extracted from [osenv](https://github.com/npm/osenv)