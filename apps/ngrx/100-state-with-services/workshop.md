# Workshop for this step

Your instructor may have changes to the workshops, as our curriculum
is under continuous improvement.

## Working with an existing Angular app

In this course, we will add ngrx to an existing Angular app that the
instructor has already shown you. In this workshop, we will make sure
that you can run it on your machine.

## Step 0: Node.js

Node.js is a JavaScript runtime environment used by many
Angular-related tools. Please download and install Node.js from [the
Node.js web site](http://nodejs.org/). The Node.js installer also
includes npm.

Angular CLI requires Node.js 12.20 or later. We recommend
**Node.js version 16.13.0 or higher "LTS"**.

## Step 1: Install Angular CLI

To create an Angular application from scratch or update an existing
app, you will need to use the Angular CLI, a command-line tool for
quickly generating an Angular project. The Angular CLI tool is
available on NPM. To install it, issue the following command from your
OS terminal:

```
npm install -g @angular/cli
```

The above command will add the Angular CLI tool to your computer and
make it accessible from the command line.

## Step 2: Run the existing app

1. Download the course curriculum from http://angularbootcamp.com/abc.zip
and extract the file on your machine.
1. Open a console window, and run `npm install` to download the
   dependencies.
1. Run `npm run serve ngrx100`.
1. When you see `Compiled successfully`, open a browser to
   `http://localhost:4300` to see the running app.

The application is an admin page for a small blog. On this page, you
can currently select a user, see information about the user, see the
titles of all of the user's posts, and select a post to read the
content. You can also create, update, or delete posts, but those
changes are not saved to the server and will be lost upon a page
refresh.
