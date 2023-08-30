# Workshop for this step

No workshop for this step. If you would like to write Jest tests in your workshop project,
you must first remove Karma/Jasmine and add Jest.

## Background

The Angular CLI defaults to using Karma and Jasmine for unit testing.
These are older tools that the community has been shifting away from in recent years.
We recommend replacing Karma/Jasmine with Jest.
In fact, all of the unit testing examples in this curriculum are written using Jest.

## Installing Jest

Jest support can be added to the CLI by installing the @angular-builders/jest third-party plugin.
You can follow the instructions here to replace Karma/Jasmine with Jest for unit testing:

https://github.com/just-jeb/angular-builders/tree/master/packages/jest

## Switch to Nx

If using Nx (https://nx.dev), instead of Angular CLI, Jest will be configured by default.
